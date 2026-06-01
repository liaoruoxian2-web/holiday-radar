// ── utils ──────────────────────────────────────────────────────────────
const WD = ['日','一','二','三','四','五','六'];
const MO = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];

function pd(s){ const p=s.split('-'); return new Date(+p[0],+p[1]-1,+p[2]); }
function fd(d){ return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
function todayStr(){ return fd(new Date()); }
function ddiff(s){ const t=new Date(todayStr());t.setHours(0,0,0,0);const d=pd(s);d.setHours(0,0,0,0);return Math.round((d-t)/86400000); }

function buildDateMap(hols){
  const m={};
  hols.forEach(h=>{
    let d=pd(h.date), end=h.endDate?pd(h.endDate):pd(h.date);
    while(d<=end){ const k=fd(d); if(!m[k])m[k]=[]; m[k].push(h); d=new Date(d); d.setDate(d.getDate()+1); }
  });
  return m;
}

function rflag(r){
  if(r==='tw') return '<span class="tw-flag">台</span>';
  return REGIONS[r].flag||'';
}

function eH(h){ return encodeURIComponent(JSON.stringify(h)); }
function dH(s){ return JSON.parse(decodeURIComponent(s)); }

// ── state ──────────────────────────────────────────────────────────────
const _now = new Date();
let year = 2026;
let view = 'calendar';
let calMonth = (_now.getFullYear()===2026) ? _now.getMonth() : 0;
let calDir = null;       // 'next'|'prev'|null — drives slide animation
let wheelLock = false;
let selectedDate = null;
const active = new Set(['cn','tw','kr','vn','jp']);

function currentHols(){ return getHolidays(year,[...active]); }

// ── month navigation (with animation direction) ────────────────────────
// 支持跨年：2026-12 → 下一月 = 2027-01；2027-01 → 上一月 = 2026-12
const YEAR_MIN = 2026, YEAR_MAX = 2027;
function setYearTab(){
  document.querySelectorAll('.year-btn').forEach(b=>b.classList.toggle('active',+b.dataset.y===year));
}
function navCal(dir){
  if(dir==='next'){
    if(calMonth<11){ calDir='next'; calMonth++; selectedDate=null; render(); }
    else if(year<YEAR_MAX){ calDir='next'; year++; calMonth=0; selectedDate=null; setYearTab(); render(); }
    // 已是 2027-12，到达边界，不动
  }else if(dir==='prev'){
    if(calMonth>0){ calDir='prev'; calMonth--; selectedDate=null; render(); }
    else if(year>YEAR_MIN){ calDir='prev'; year--; calMonth=11; selectedDate=null; setYearTab(); render(); }
    // 已是 2026-01，到达边界，不动
  }
}

// ── jump to a specific year+month+date (from sidebar click) ────────────
function jumpToDate(h){
  const hYear=+h.date.substring(0,4);
  const hMonth=+h.date.substring(5,7)-1;
  if(year!==hYear){
    year=hYear;
    document.querySelectorAll('.year-btn').forEach(b=>b.classList.toggle('active',+b.dataset.y===year));
  }
  if(view!=='calendar'){
    view='calendar';
    document.querySelectorAll('.view-btn').forEach(b=>b.classList.toggle('active',b.dataset.v==='calendar'));
    document.querySelectorAll('.view').forEach(v2=>v2.classList.toggle('active',v2.id==='view-calendar'));
  }
  calDir = (hMonth>calMonth||(hYear>year)) ? 'next' : (hMonth<calMonth ? 'prev' : null);
  calMonth=hMonth;
  selectedDate=h.date;
  render();
}

// ── region toggle ──────────────────────────────────────────────────────
document.getElementById('regionWrap').addEventListener('click',e=>{
  const chip=e.target.closest('.chip');
  if(!chip)return;
  const r=chip.dataset.r;
  if(active.has(r)){
    if(active.size===1)return;
    active.delete(r); chip.classList.add('off');
  }else{
    active.add(r); chip.classList.remove('off');
  }
  render();
});

// ── year ──────────────────────────────────────────────────────────────
document.querySelectorAll('.year-btn').forEach(b=>b.addEventListener('click',()=>{
  year=+b.dataset.y;
  document.querySelectorAll('.year-btn').forEach(x=>x.classList.toggle('active',x===b));
  calMonth=(year===_now.getFullYear())?_now.getMonth():0;
  calDir=null; selectedDate=null;
  render();
}));

// ── view ──────────────────────────────────────────────────────────────
document.querySelectorAll('.view-btn').forEach(b=>b.addEventListener('click',()=>{
  view=b.dataset.v;
  document.querySelectorAll('.view-btn').forEach(x=>x.classList.toggle('active',x===b));
  document.querySelectorAll('.view').forEach(v2=>v2.classList.toggle('active',v2.id==='view-'+view));
  render();
}));

// ── wheel scroll on calendar ──────────────────────────────────────────
// 滚轮"会话/吸附"模型：一次连续滑动只翻一个月，无论你滚多快/多远。
// 必须停止滚动 SESSION_END_MS 才能开启下一次翻页（类似吸附 / scroll-snap）。
let wheelInSession = false;   // 是否在一次连续滚动会话中（已经触发过翻页）
let wheelEndTimer = null;     // 检测"用户停止滚动"的定时器
const SESSION_END_MS = 320;   // 静止多少 ms 后视为本次会话结束
const MIN_DELTA = 4;          // 忽略极小的抖动
const WHEEL_LOCK_MS = 380;    // 动画锁：翻页后这段时间内禁止再翻

document.getElementById('calView').addEventListener('wheel',e=>{
  e.preventDefault();

  // 重置"停止滚动"判定
  if(wheelEndTimer) clearTimeout(wheelEndTimer);
  wheelEndTimer = setTimeout(()=>{ wheelInSession=false; pendingDir=null; }, SESSION_END_MS);

  // 已在会话内（或在动画锁中）→ 不触发新翻页，吃掉滚动
  if(wheelInSession || wheelLock) return;

  if(Math.abs(e.deltaY) < MIN_DELTA) return;

  // 触发本次会话内的"唯一一次"翻页
  wheelInSession = true;
  wheelLock = true;
  setTimeout(()=>{ wheelLock=false; }, WHEEL_LOCK_MS);

  if(e.deltaY > 0) navCal('next');
  else navCal('prev');
},{passive:false});

// ── keyboard arrows ───────────────────────────────────────────────────
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){ closeModal(); selectedDate=null; render(); return; }
  if(view!=='calendar') return;
  if(e.key==='ArrowRight'||e.key==='ArrowDown') navCal('next');
  if(e.key==='ArrowLeft'||e.key==='ArrowUp') navCal('prev');
});

// ── RENDER DISPATCH ───────────────────────────────────────────────────
function render(){
  if(view==='calendar') renderCalendar();
  else renderTimeline();
  renderSidebar();
}

// ── DATA SOURCE HTML ──────────────────────────────────────────────────
const SOURCE_HTML=`<div class="cal-footer">
  <strong>数据来源：</strong>
  中国大陆 · 国务院办公厅 国办发明电〔2025〕7号 &nbsp;|&nbsp;
  台湾 · 行政院人事行政總處 115/116年行事曆 &nbsp;|&nbsp;
  韩国 · law.go.kr &nbsp;|&nbsp;
  越南 · 政府办公厅 公文9859/VPCP-KGVX &nbsp;|&nbsp;
  日本 · 内閣府「国民の祝日」令和8・9年
  &nbsp;&nbsp;<span style="color:#b7791f">⚠ 2027年中国大陆/越南数据为预估，以官方公告为准</span>
</div>`;

// ── CALENDAR ─────────────────────────────────────────────────────────
function renderCalendar(){
  const hols=currentHols(), dm=buildDateMap(hols), td=todayStr();
  const daysInMonth=new Date(year,calMonth+1,0).getDate();
  const startWd=new Date(year,calMonth,1).getDay();
  const isCurrentYear=(year===_now.getFullYear());
  const isCurrentMonth=(isCurrentYear && calMonth===_now.getMonth());
  // 跨年导航：仅在边界（2026-01 / 2027-12）禁用
  const canPrev = !(year===YEAR_MIN && calMonth===0);
  const canNext = !(year===YEAR_MAX && calMonth===11);

  // nav
  const navHtml=`
    <div class="cal-nav">
      <div style="display:flex;gap:6px">
        <button class="cal-nav-btn" id="calPrev" ${canPrev?'':'disabled'}>‹</button>
      </div>
      <div class="cal-nav-center">
        <span class="cal-nav-title">${year}年 ${MO[calMonth]}</span>
        ${isCurrentMonth?'<span class="cal-cur-badge">本月</span>':''}
      </div>
      <div style="display:flex;gap:6px;align-items:center">
        ${!isCurrentMonth?'<button class="cal-today-btn" id="calToday">回到今天</button>':''}
        <button class="cal-nav-btn" id="calNext" ${canNext?'':'disabled'}>›</button>
      </div>
    </div>`;

  // legend
  let legHtml='<div class="cal-legend">';
  [...active].forEach(r=>{ legHtml+=`<div class="leg"><span class="leg-dot" style="background:var(--${r})"></span>${rflag(r)} ${REGIONS[r].name}</div>`; });
  legHtml+=`<span class="leg-est" style="margin-left:4px">斜纹 = 预估</span></div>`;

  // day cells
  let daysHtml='<div class="cal-days">';
  for(let i=0;i<startWd;i++) daysHtml+='<div class="cal-cell empty"></div>';
  for(let d=1;d<=daysInMonth;d++){
    const ds=`${year}-${String(calMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const wd=new Date(year,calMonth,d).getDay();
    const isWE=wd===0||wd===6, isToday=ds===td, isSel=ds===selectedDate;
    const dayHols=dm[ds]||[];
    let cls='cal-cell';
    if(isWE) cls+=' we'; if(isToday) cls+=' today'; if(isSel) cls+=' selected';

    daysHtml+=`<div class="${cls}" data-date="${ds}">`;
    daysHtml+=`<div class="cal-dnum-wrap">${isToday?`<div class="cal-dnum-inner">${d}</div>`:`<div class="cal-dnum">${d}</div>`}</div>`;
    if(dayHols.length){
      const seen=new Set();
      daysHtml+='<div class="cal-dots">';
      dayHols.forEach(h=>{ if(!seen.has(h.region)){ seen.add(h.region); daysHtml+=`<span class="cal-dot ${h.region}${h.official?'':' est'}"></span>`; }});
      daysHtml+='</div><div class="cal-hols-text">';
      const uniq=[]; const us=new Set();
      dayHols.forEach(h=>{ if(!us.has(h.region)){us.add(h.region);uniq.push(h);}});
      uniq.slice(0,2).forEach(h=>{ daysHtml+=`<span class="cal-hol-tag" style="color:var(--${h.region})">${h.name.length>5?h.name.substring(0,4)+'…':h.name}</span>`; });
      if(uniq.length>2) daysHtml+=`<span class="cal-hol-tag" style="color:var(--muted)">+${uniq.length-2}</span>`;
      daysHtml+='</div>';
    }
    daysHtml+='</div>';
  }
  daysHtml+='</div>'; // .cal-days

  document.getElementById('calView').innerHTML=`
    ${navHtml}
    ${legHtml}
    <div class="cal-grid" id="calGrid">
      <div class="cal-wd-row">${['日','一','二','三','四','五','六'].map((w,i)=>`<div class="cal-wd${i===0||i===6?' we':''}">${w}</div>`).join('')}</div>
      ${daysHtml}
    </div>
    ${SOURCE_HTML}`;

  // apply slide animation
  const grid=document.getElementById('calGrid');
  if(calDir){
    const cls=calDir==='next'?'anim-next':'anim-prev';
    grid.classList.add(cls);
    setTimeout(()=>grid.classList.remove(cls),250);
    calDir=null;
  }

  // bind nav buttons
  document.getElementById('calPrev')?.addEventListener('click',()=>navCal('prev'));
  document.getElementById('calNext')?.addEventListener('click',()=>navCal('next'));
  document.getElementById('calToday')?.addEventListener('click',()=>{
    const ty=_now.getFullYear(), tm=_now.getMonth();
    // 跨年时给一个方向感的滑入动画
    calDir = (year>ty || (year===ty && calMonth>tm)) ? 'prev'
           : (year<ty || (year===ty && calMonth<tm)) ? 'next' : null;
    if(year!==ty){ year=ty; setYearTab(); }
    calMonth=tm;
    selectedDate=todayStr();
    render();
  });

  // bind day clicks
  document.querySelectorAll('.cal-cell:not(.empty)').forEach(el=>{
    el.addEventListener('click',()=>{
      const d=el.dataset.date;
      selectedDate=(selectedDate===d)?null:d;
      renderCalendar(); renderSidebar(); // re-render without animation
    });
  });
}

// ── TIMELINE ─────────────────────────────────────────────────────────
function renderTimeline(){
  const hols=currentHols();
  const total=((year%4===0&&year%100!==0)||(year%400===0))?366:365;
  const doy=s=>{ const d=pd(s),start=new Date(year,0,1);return Math.floor((d-start)/86400000)+1; };

  let html=`<div class="notice">横轴为全年12个月，每条色块代表一段节假日。<span style="color:#b7791f">斜纹色块</span>为预估数据，点击色块查看详情。</div>
    <div class="tl-wrap"><div class="tl-inner">
    <div class="tl-header"><div class="tl-label-col"></div><div class="tl-months">`;
  MO.forEach(m=>html+=`<div class="tl-m">${m}</div>`);
  html+=`</div></div><div class="tl-rows">`;

  [...active].forEach(r=>{
    const rh=hols.filter(h=>h.region===r);
    html+=`<div class="tl-row"><div class="tl-rlabel">${rflag(r)} ${REGIONS[r].name}</div>
      <div class="tl-track"><div class="tl-grid">${Array.from({length:12},()=>'<div class="tl-gl"></div>').join('')}</div>`;
    rh.forEach(h=>{
      const s=doy(h.date), e=h.endDate?doy(h.endDate):s, dur=e-s+1;
      const l=((s-1)/total*100).toFixed(2), w=Math.max(dur/total*100,.25).toFixed(2);
      html+=`<div class="tl-bar ${r}${h.official?'':' est'}" style="left:${l}%;width:${w}%" data-h='${eH(h)}'>${dur>=3?h.name.substring(0,5):''}</div>`;
    });
    html+=`</div></div>`;
  });
  html+=`</div></div></div>`;

  // data source footer for timeline
  html+=`<div class="cal-footer" style="margin-top:12px;border-radius:var(--radius);border:1px solid var(--border)">
    <strong>数据来源：</strong>
    中国大陆 · 国务院办公厅 国办发明电〔2025〕7号 &nbsp;|&nbsp;
    台湾 · 行政院人事行政總處 115/116年行事曆 &nbsp;|&nbsp;
    韩国 · law.go.kr &nbsp;|&nbsp;
    越南 · 政府办公厅 公文9859/VPCP-KGVX &nbsp;|&nbsp;
    日本 · 内閣府「国民の祝日」令和8・9年
  </div>`;

  document.getElementById('tlView').innerHTML=html;
  document.getElementById('tlView').querySelectorAll('.tl-bar').forEach(el=>{
    el.addEventListener('click',()=>showModal(dH(el.dataset.h)));
  });
}

// ── SIDEBAR ──────────────────────────────────────────────────────────
function renderSidebar(){
  if(selectedDate && view==='calendar') renderDayDetail(selectedDate);
  else renderUpcoming();
}

function renderUpcoming(){
  document.getElementById('sbHead').innerHTML=`
    <span class="sb-title">近期节假日</span>
    <span class="sb-sub">未来 90 天</span>`;

  const hols=currentHols();
  const upcoming=hols.filter(h=>ddiff(h.date)>=-3&&ddiff(h.date)<=90).sort((a,b)=>a.date.localeCompare(b.date));

  if(!upcoming.length){
    document.getElementById('sbBody').innerHTML='<div class="sb-empty">当前筛选条件下<br>未来90天内无节假日</div>';
    return;
  }

  let html='';
  upcoming.forEach(h=>{
    const dff=ddiff(h.date);
    let dc='future', dtxt=`${dff}天后`;
    if(dff<0){dc='past';dtxt=`${Math.abs(dff)}天前`;}
    else if(dff===0){dc='tod';dtxt='今天';}
    else if(dff<=7) dc='soon';

    html+=`<div class="sb-item" data-h='${eH(h)}'>
      <div class="sb-dot ${h.region}"></div>
      <div class="sb-info">
        <div class="sb-name">${h.name}${h.official?'':'<span class="est-badge">预</span>'}</div>
        <div class="sb-meta">${rflag(h.region)} ${REGIONS[h.region].name} · ${h.date.substring(5).replace('-','/')}</div>
      </div>
      <div class="sb-days ${dc}">${dtxt}</div>
    </div>`;
  });
  document.getElementById('sbBody').innerHTML=html;

  // ★ click → jump to that date in calendar
  document.getElementById('sbBody').querySelectorAll('.sb-item').forEach(el=>{
    el.addEventListener('click',()=>jumpToDate(dH(el.dataset.h)));
  });
}

function renderDayDetail(ds){
  const hols=currentHols(), dm=buildDateMap(hols);
  const dayHols=dm[ds]||[];
  const d=pd(ds);
  const dateLabel=`${d.getMonth()+1}月${d.getDate()}日`;
  const isToday=ds===todayStr();

  document.getElementById('sbHead').innerHTML=`
    <button class="sb-back" id="sbBack">← 近期节假日</button>`;
  document.getElementById('sbBack').addEventListener('click',()=>{ selectedDate=null; render(); });

  if(!dayHols.length){
    document.getElementById('sbBody').innerHTML=`
      <div class="sb-day-header">
        <div class="sb-day-date">${dateLabel}${isToday?' <span style="font-size:11px;color:#4f46e5;background:#eef2ff;padding:1px 6px;border-radius:8px;font-weight:700">今天</span>':''}</div>
        <div class="sb-day-wd">周${WD[d.getDay()]} · ${year}年</div>
      </div>
      <div class="sb-noday">
        <div class="sb-noday-date" style="font-size:28px">🗓</div>
        <div class="sb-noday-msg">当日无法定节假日<br><span style="color:var(--muted)">（当前筛选地区）</span></div>
      </div>`;
    return;
  }

  const byRegion={};
  [...active].forEach(r=>{ byRegion[r]=[]; });
  dayHols.forEach(h=>{ if(byRegion[h.region]) byRegion[h.region].push(h); });

  let html=`<div class="sb-day-header">
    <div class="sb-day-date">${dateLabel}${isToday?' <span style="font-size:11px;color:#4f46e5;background:#eef2ff;padding:1px 6px;border-radius:8px;font-weight:700">今天</span>':''}</div>
    <div class="sb-day-wd">周${WD[d.getDay()]} · ${year}年 · ${[...new Set(dayHols.map(h=>h.region))].length}个地区节假日</div>
  </div>`;

  [...active].forEach(r=>{
    const rh=byRegion[r]; if(!rh||!rh.length) return;
    const seen=new Set();
    const dedup=rh.filter(h=>{ if(seen.has(h.name+h.date))return false; seen.add(h.name+h.date);return true;});
    html+=`<div class="sb-region-block">
      <div class="sb-region-label"><span class="sb-dot ${r}"></span><span class="sb-region-name">${rflag(r)} ${REGIONS[r].name}</span></div>`;
    dedup.forEach(h=>{
      const endStr=h.endDate&&h.endDate!==h.date?` → ${h.endDate.substring(5).replace('-','/')}` :'';
      html+=`<div class="sb-hol-card" data-h='${eH(h)}'>
        <div class="sb-hol-name">${h.name}${h.official?'':'<span class="est-badge">预估</span>'}</div>
        <div class="sb-hol-meta">${h.date.substring(5).replace('-','/')}${endStr} · ${h.days}天 · ${h.localName}</div>
        ${h.makeup?`<div class="sb-hol-makeup">📅 ${h.makeup}</div>`:''}
      </div>`;
    });
    html+='</div>';
  });

  document.getElementById('sbBody').innerHTML=html;
  document.getElementById('sbBody').querySelectorAll('.sb-hol-card').forEach(el=>{
    el.addEventListener('click',()=>showModal(dH(el.dataset.h)));
  });
}

// ── MODAL ─────────────────────────────────────────────────────────────
function showModal(h){
  const r=REGIONS[h.region], dff=ddiff(h.date);
  const dtxt=dff>0?`距今 ${dff} 天`:dff<0?`已过 ${Math.abs(dff)} 天`:'今天';
  document.getElementById('mContent').innerHTML=`
    <div class="m-rbar" style="background:${r.color}"></div>
    <div class="m-title">${h.name}</div>
    <div class="m-local">${rflag(h.region)} ${r.name} · ${h.localName}
      <span class="m-official ${h.official?'yes':'no'}">${h.official?'✓ 官方已公告':'⚠ 预估数据'}</span>
    </div>
    <div class="m-grid">
      <div class="m-cell"><div class="m-cell-label">起始日期</div><div class="m-cell-val">${h.date}</div></div>
      <div class="m-cell"><div class="m-cell-label">结束日期</div><div class="m-cell-val">${h.endDate||h.date}</div></div>
      <div class="m-cell"><div class="m-cell-label">连续假期</div><div class="m-cell-val">${h.days} 天</div></div>
      <div class="m-cell"><div class="m-cell-label">距今</div><div class="m-cell-val">${dtxt}</div></div>
    </div>
    ${h.desc?`<div class="m-desc">${h.desc}</div>`:''}
    ${h.makeup?`<div class="m-makeup"><strong>📅 调休 / 补班安排</strong>${h.makeup}</div>`:''}
    ${!h.official?`<div class="m-makeup" style="background:#fef9c3;border-color:#fde047;color:#92400e"><strong>⚠️ 数据说明</strong>该节假日官方公告尚未发布，日期为预估，以官方最终公告为准。</div>`:''}
    <button class="m-close" id="mClose">关闭</button>`;
  document.getElementById('mClose').addEventListener('click',closeModal);
  document.getElementById('overlay').classList.add('show');
}
function closeModal(){ document.getElementById('overlay').classList.remove('show'); }
document.getElementById('overlay').addEventListener('click',e=>{ if(e.target.id==='overlay')closeModal(); });

// ── INIT ──────────────────────────────────────────────────────────────
render();
