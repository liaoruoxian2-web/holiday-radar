/**
 * 海外重点地区法定节假日数据
 *
 * 数据来源（官方文件）：
 * 中国大陆  国务院办公厅 国办发明电〔2025〕7号（2025-11-04）
 * 台　　湾  行政院人事行政總處 115年（2026）及116年（2027）政府行政機關辦公日曆表
 * 韩　　国  한국 공휴일 (law.go.kr) + visitkorea.or.kr 官方确认
 * 越　　南  越南政府办公厅 公文9859/VPCP-KGVX（2025年发布）
 * 日　　本  内閣府「国民の祝日について」令和8・9年一覧
 *
 * ⚠️  标注 [预估] 的条目表示对应年份官方尚未发布正式公告，
 *     日期依据农历换算及历年规律推算，仅供参考，确认后将更新。
 */

const REGIONS = {
  cn: { name: '中国大陆', flag: '🇨🇳', color: '#e53e3e', light: '#fff5f5' },
  tw: { name: '台湾',     flag: null,   color: '#dd6b20', light: '#fffaf0' },
  kr: { name: '韩国',     flag: '🇰🇷', color: '#38a169', light: '#f0fff4' },
  vn: { name: '越南',     flag: '🇻🇳', color: '#3182ce', light: '#ebf8ff' },
  jp: { name: '日本',     flag: '🇯🇵', color: '#805ad5', light: '#faf5ff' },
};

// Holiday object fields:
//   date        string  'YYYY-MM-DD'  起始日期
//   endDate     string  'YYYY-MM-DD'  结束日期（可选，默认同 date）
//   name        string  中文显示名
//   localName   string  本地语言名称
//   region      string  'cn'|'tw'|'kr'|'vn'|'jp'
//   days        number  法定放假天数（含调休拼出的连续天数）
//   desc        string  节日简介
//   official    bool    true = 官方已公告；false = 预估
//   makeup      string  调休/补班说明（可选）

const HOLIDAYS = {

  // =====================================================================
  // 2026 中国大陆  ——  国务院办公厅 国办发明电〔2025〕7号
  // =====================================================================
  cn_2026: [
    {
      date: '2026-01-01', endDate: '2026-01-03',
      name: '元旦', localName: '元旦',
      region: 'cn', days: 3, official: true,
      desc: '新年第一天，全国法定假日，共3天。',
      makeup: '1月4日（周日）上班补班',
    },
    {
      date: '2026-02-15', endDate: '2026-02-23',
      name: '春节', localName: '春节（农历新年）',
      region: 'cn', days: 9, official: true,
      desc: '中国最重要的传统节日，史上最长春节连休。农历腊月二十八至正月初七。',
      makeup: '2月14日（周六）、2月28日（周六）补班',
    },
    {
      date: '2026-04-04', endDate: '2026-04-06',
      name: '清明节', localName: '清明节',
      region: 'cn', days: 3, official: true,
      desc: '祭祖扫墓、踏青出游。4月4日（周六）至4月6日（周一）。',
      makeup: null,
    },
    {
      date: '2026-05-01', endDate: '2026-05-05',
      name: '劳动节', localName: '劳动节',
      region: 'cn', days: 5, official: true,
      desc: '国际劳动节，5月1日（周五）至5日（周二）。',
      makeup: '5月9日（周六）补班',
    },
    {
      date: '2026-06-19', endDate: '2026-06-21',
      name: '端午节', localName: '端午节',
      region: 'cn', days: 3, official: true,
      desc: '吃粽子、赛龙舟，6月19日（周五）至21日（周日）。',
      makeup: null,
    },
    {
      date: '2026-09-25', endDate: '2026-09-27',
      name: '中秋节', localName: '中秋节',
      region: 'cn', days: 3, official: true,
      desc: '月圆人团圆，吃月饼赏月，9月25日（周五）至27日（周日）。',
      makeup: null,
    },
    {
      date: '2026-10-01', endDate: '2026-10-07',
      name: '国庆节', localName: '国庆节',
      region: 'cn', days: 7, official: true,
      desc: '庆祝中华人民共和国成立77周年，黄金周长假。',
      makeup: '9月20日（周日）、10月10日（周六）补班',
    },
  ],

  // =====================================================================
  // 2027 中国大陆  ——  ⚠️ 官方尚未公告（预计2026年11月发布），以下为预估
  // =====================================================================
  cn_2027: [
    {
      date: '2027-01-01', endDate: '2027-01-03',
      name: '元旦', localName: '元旦',
      region: 'cn', days: 3, official: false,
      desc: '新年，1月1日（周五）至3日（周日）。',
      makeup: null,
    },
    {
      date: '2027-02-06', endDate: '2027-02-13',
      name: '春节', localName: '春节（农历新年）',
      region: 'cn', days: 8, official: false,
      desc: '农历丁未年，2027年除夕为2月12日，春节初一为2月13日。具体安排待官方公告。',
      makeup: '具体补班安排待官方公告',
    },
    {
      date: '2027-04-05',
      name: '清明节', localName: '清明节',
      region: 'cn', days: 3, official: false,
      desc: '清明节，具体放假安排待官方公告。',
      makeup: null,
    },
    {
      date: '2027-05-01', endDate: '2027-05-05',
      name: '劳动节', localName: '劳动节',
      region: 'cn', days: 5, official: false,
      desc: '劳动节，具体放假安排待官方公告。',
      makeup: null,
    },
    {
      date: '2027-06-09',
      name: '端午节', localName: '端午节',
      region: 'cn', days: 3, official: false,
      desc: '端午节（农历五月初五），具体安排待官方公告。',
      makeup: null,
    },
    {
      date: '2027-09-15',
      name: '中秋节', localName: '中秋节',
      region: 'cn', days: 3, official: false,
      desc: '中秋节，具体放假安排待官方公告。',
      makeup: null,
    },
    {
      date: '2027-10-01', endDate: '2027-10-07',
      name: '国庆节', localName: '国庆节',
      region: 'cn', days: 7, official: false,
      desc: '国庆节，具体放假安排待官方公告。',
      makeup: null,
    },
  ],

  // =====================================================================
  // 2026 台湾  ——  行政院人事行政總處 115年行事曆（官方正式公告）
  // =====================================================================
  tw_2026: [
    {
      date: '2026-01-01',
      name: '中华民国开国纪念日', localName: '中華民國開國紀念日',
      region: 'tw', days: 1, official: true,
      desc: '元旦，1月1日（周四）。',
      makeup: null,
    },
    {
      date: '2026-02-14', endDate: '2026-02-22',
      name: '农历春节', localName: '農曆春節',
      region: 'tw', days: 9, official: true,
      desc: '小年夜2/15、除夕2/16、初一至初三2/17-2/19，含前后周末共9天连假（2/14-2/22）。',
      makeup: '2/20（周日）为补假日',
    },
    {
      date: '2026-02-27', endDate: '2026-03-01',
      name: '228和平纪念日', localName: '二二八和平紀念日',
      region: 'tw', days: 3, official: true,
      desc: '纪念1947年二二八事件，228逢周六，前一天（2/27周五）补假，3天连假。',
      makeup: '2/27（周五）为补假日',
    },
    {
      date: '2026-04-03', endDate: '2026-04-06',
      name: '儿童节暨清明节', localName: '兒童節暨清明節',
      region: 'tw', days: 4, official: true,
      desc: '兒童節（4/4）與清明節（4/5）相鄰，4/3（周五）至4/6（周一）共4天假期。',
      makeup: '4/3、4/6为补假日',
    },
    {
      date: '2026-05-01', endDate: '2026-05-03',
      name: '劳动节', localName: '勞動節',
      region: 'tw', days: 3, official: true,
      desc: '5/1（周五）至5/3（周日），3天连假。',
      makeup: null,
    },
    {
      date: '2026-06-19', endDate: '2026-06-21',
      name: '端午节', localName: '端午節',
      region: 'tw', days: 3, official: true,
      desc: '端午节（6/19周五）至6/21（周日），3天连假。',
      makeup: null,
    },
    {
      date: '2026-09-25', endDate: '2026-09-28',
      name: '中秋节暨教师节', localName: '中秋節暨教師節',
      region: 'tw', days: 4, official: true,
      desc: '中秋节（9/25周五）、教师节（9/28周一），9/25-9/28共4天连假。',
      makeup: null,
    },
    {
      date: '2026-10-09', endDate: '2026-10-11',
      name: '国庆日', localName: '國慶日（雙十節）',
      region: 'tw', days: 3, official: true,
      desc: '双十国庆，10/10逢周六，10/9（周五）补假，3天连假。',
      makeup: '10/9（周五）为补假日',
    },
    {
      date: '2026-10-24', endDate: '2026-10-26',
      name: '台湾光复暨古宁头大捷纪念日', localName: '臺灣光復暨金門古寧頭大捷紀念日',
      region: 'tw', days: 3, official: true,
      desc: '10/25（周日）补假10/26（周一），10/24-10/26共3天连假。',
      makeup: '10/26（周一）为补假日',
    },
    {
      date: '2026-12-25', endDate: '2026-12-27',
      name: '行宪纪念日', localName: '行憲紀念日',
      region: 'tw', days: 3, official: true,
      desc: '12/25（周五）至12/27（周日），3天连假。',
      makeup: null,
    },
  ],

  // =====================================================================
  // 2027 台湾  ——  行政院人事行政總處 116年行事曆（2026-05-21 正式公告）
  // =====================================================================
  tw_2027: [
    {
      date: '2027-01-01', endDate: '2027-01-03',
      name: '中华民国开国纪念日', localName: '中華民國開國紀念日',
      region: 'tw', days: 3, official: true,
      desc: '元旦1/1（周五）至1/3（周日），3天连假。',
      makeup: null,
    },
    {
      date: '2027-02-04', endDate: '2027-02-10',
      name: '农历春节', localName: '農曆春節',
      region: 'tw', days: 7, official: true,
      desc: '除夕2/5（周五），初一2/6逢周六、初二2/7逢周日，补假至2/9（周二）、2/10（周三），共7天（2/4-2/10）。',
      makeup: '2/9、2/10为补假日',
    },
    {
      date: '2027-02-27', endDate: '2027-03-01',
      name: '228和平纪念日', localName: '二二八和平紀念日',
      region: 'tw', days: 3, official: true,
      desc: '228逢周日，3/1（周一）补假，2/27-3/1共3天连假。',
      makeup: '3/1（周一）为补假日',
    },
    {
      date: '2027-04-03', endDate: '2027-04-06',
      name: '儿童节暨清明节', localName: '兒童節暨清明節',
      region: 'tw', days: 4, official: true,
      desc: '兒童節（4/4周日）、清明節（4/5周一），4/6（周二）补假，4/3-4/6共4天。',
      makeup: '4/6（周二）为补假日',
    },
    {
      date: '2027-04-30', endDate: '2027-05-02',
      name: '劳动节', localName: '勞動節',
      region: 'tw', days: 3, official: true,
      desc: '5/1逢周六，4/30（周五）补假，4/30-5/2共3天连假。',
      makeup: '4/30（周五）为补假日',
    },
    {
      date: '2027-06-09',
      name: '端午节', localName: '端午節',
      region: 'tw', days: 1, official: true,
      desc: '端午节（6/9周三），单日假期，无法形成连假。',
      makeup: null,
    },
    {
      date: '2027-09-15',
      name: '中秋节', localName: '中秋節',
      region: 'tw', days: 1, official: true,
      desc: '中秋节（9/15周三），单日假期。',
      makeup: null,
    },
    {
      date: '2027-09-28',
      name: '教师节', localName: '教師節',
      region: 'tw', days: 1, official: true,
      desc: '教师节（9/28周二），单日假期。',
      makeup: null,
    },
    {
      date: '2027-10-09', endDate: '2027-10-11',
      name: '国庆日', localName: '國慶日（雙十節）',
      region: 'tw', days: 3, official: true,
      desc: '10/10逢周日，10/11（周一）补假，10/9-10/11共3天连假。',
      makeup: '10/11（周一）为补假日',
    },
    {
      date: '2027-10-23', endDate: '2027-10-25',
      name: '台湾光复暨古宁头大捷纪念日', localName: '臺灣光復暨金門古寧頭大捷紀念日',
      region: 'tw', days: 3, official: true,
      desc: '10/23（周六）至10/25（周一），3天连假。',
      makeup: null,
    },
    {
      date: '2027-12-24', endDate: '2027-12-26',
      name: '行宪纪念日', localName: '行憲紀念日',
      region: 'tw', days: 3, official: true,
      desc: '12/25逢周六，12/24（周五）补假，12/24-12/26共3天连假。',
      makeup: '12/24（周五）为补假日',
    },
    {
      date: '2027-12-31',
      name: '2028年元旦补假', localName: '118年開國紀念日補假',
      region: 'tw', days: 1, official: true,
      desc: '2028年元旦逢周六，提前于2027年12月31日（周五）补假。',
      makeup: null,
    },
  ],

  // =====================================================================
  // 2026 韩国  ——  한국 법정 공휴일（law.go.kr + 官方确认）
  //   ⚠️ 2026年新增：제헌절（宪法纪念日 7/17）恢复为法定假日
  // =====================================================================
  kr_2026: [
    {
      date: '2026-01-01',
      name: '新年', localName: '신정',
      region: 'kr', days: 1, official: true,
      desc: '公历新年，全国法定假日。',
      makeup: null,
    },
    {
      date: '2026-02-16', endDate: '2026-02-18',
      name: '春节', localName: '설날 연휴',
      region: 'kr', days: 3, official: true,
      desc: '春节（설날）主日2月17日（周二），前一天2/16（周一）、后一天2/18（周三）共3天。',
      makeup: null,
    },
    {
      date: '2026-03-01', endDate: '2026-03-02',
      name: '三一节', localName: '삼일절',
      region: 'kr', days: 2, official: true,
      desc: '纪念1919年独立运动。3/1逢周日，3/2（周一）替代假日。',
      makeup: '3/2（周一）为替代假日',
    },
    {
      date: '2026-05-05',
      name: '儿童节', localName: '어린이날',
      region: 'kr', days: 1, official: true,
      desc: '儿童节，5月5日（周二）。',
      makeup: null,
    },
    {
      date: '2026-05-24', endDate: '2026-05-25',
      name: '佛诞节', localName: '부처님오신날',
      region: 'kr', days: 2, official: true,
      desc: '农历四月初八，2026年为5月24日（周日），5/25（周一）替代假日。',
      makeup: '5/25（周一）为替代假日',
    },
    {
      date: '2026-06-06',
      name: '显忠日', localName: '현충일',
      region: 'kr', days: 1, official: true,
      desc: '纪念为国捐躯的战士，6月6日（周六）。',
      makeup: null,
    },
    {
      date: '2026-07-17',
      name: '宪法纪念日', localName: '제헌절',
      region: 'kr', days: 1, official: true,
      desc: '⭐ 2026年起恢复为法定假日。纪念1948年大韩民国宪法颁布，7月17日（周五）。',
      makeup: null,
    },
    {
      date: '2026-08-15', endDate: '2026-08-17',
      name: '光复节', localName: '광복절',
      region: 'kr', days: 2, official: true,
      desc: '纪念1945年从日本殖民统治中解放，8/15（周六），8/17（周一）替代假日。',
      makeup: '8/17（周一）为替代假日',
    },
    {
      date: '2026-09-24', endDate: '2026-09-26',
      name: '秋夕', localName: '추석 연휴',
      region: 'kr', days: 3, official: true,
      desc: '韩国中秋节，主日9/25（周五），前一天9/24（周四）、后一天9/26（周六），共3天。',
      makeup: null,
    },
    {
      date: '2026-10-03', endDate: '2026-10-05',
      name: '开天节', localName: '개천절',
      region: 'kr', days: 2, official: true,
      desc: '纪念古朝鲜建国，10/3（周六），10/5（周一）替代假日。',
      makeup: '10/5（周一）为替代假日',
    },
    {
      date: '2026-10-09',
      name: '韩文日', localName: '한글날',
      region: 'kr', days: 1, official: true,
      desc: '纪念韩文字母创制，10月9日（周五）。',
      makeup: null,
    },
    {
      date: '2026-12-25',
      name: '圣诞节', localName: '크리스마스',
      region: 'kr', days: 1, official: true,
      desc: '圣诞节，12月25日（周五），全国法定假日。',
      makeup: null,
    },
  ],

  // =====================================================================
  // 2027 韩国  ——  농력 기준 확정 날짜（官方法定假日规律推算）
  // =====================================================================
  kr_2027: [
    {
      date: '2027-01-01',
      name: '新年', localName: '신정',
      region: 'kr', days: 1, official: true,
      desc: '公历新年，1月1日（周五）。',
      makeup: null,
    },
    {
      date: '2027-02-06', endDate: '2027-02-08',
      name: '春节', localName: '설날 연휴',
      region: 'kr', days: 3, official: true,
      desc: '春节（설날）主日2月7日（周日），前一天2/6（周六）、后一天2/8（周一）。',
      makeup: null,
    },
    {
      date: '2027-03-01',
      name: '三一节', localName: '삼일절',
      region: 'kr', days: 1, official: true,
      desc: '独立运动纪念日，3月1日（周一）。',
      makeup: null,
    },
    {
      date: '2027-05-05',
      name: '儿童节', localName: '어린이날',
      region: 'kr', days: 1, official: true,
      desc: '儿童节，5月5日（周三）。',
      makeup: null,
    },
    {
      date: '2027-05-13',
      name: '佛诞节', localName: '부처님오신날',
      region: 'kr', days: 1, official: true,
      desc: '农历四月初八，2027年为5月13日（周四）。',
      makeup: null,
    },
    {
      date: '2027-06-06',
      name: '显忠日', localName: '현충일',
      region: 'kr', days: 1, official: true,
      desc: '6月6日（周日）。',
      makeup: null,
    },
    {
      date: '2027-07-17',
      name: '宪法纪念日', localName: '제헌절',
      region: 'kr', days: 1, official: true,
      desc: '7月17日（周六）。',
      makeup: null,
    },
    {
      date: '2027-08-15', endDate: '2027-08-16',
      name: '光复节', localName: '광복절',
      region: 'kr', days: 2, official: true,
      desc: '8/15（周日），8/16（周一）替代假日。',
      makeup: '8/16（周一）为替代假日',
    },
    {
      date: '2027-09-14', endDate: '2027-09-16',
      name: '秋夕', localName: '추석 연휴',
      region: 'kr', days: 3, official: true,
      desc: '秋夕主日9/15（周三），前一天9/14（周二）、后一天9/16（周四），共3天。',
      makeup: null,
    },
    {
      date: '2027-10-03', endDate: '2027-10-04',
      name: '开天节', localName: '개천절',
      region: 'kr', days: 2, official: true,
      desc: '10/3（周日），10/4（周一）替代假日。',
      makeup: '10/4（周一）为替代假日',
    },
    {
      date: '2027-10-09', endDate: '2027-10-11',
      name: '韩文日', localName: '한글날',
      region: 'kr', days: 2, official: true,
      desc: '10/9（周六），10/11（周一）替代假日。',
      makeup: '10/11（周一）为替代假日',
    },
    {
      date: '2027-12-25', endDate: '2027-12-27',
      name: '圣诞节', localName: '크리스마스',
      region: 'kr', days: 2, official: true,
      desc: '12/25（周六），12/27（周一）替代假日。',
      makeup: '12/27（周一）为替代假日',
    },
  ],

  // =====================================================================
  // 2026 越南  ——  越南政府办公厅 公文9859/VPCP-KGVX（官方正式公告）
  // =====================================================================
  vn_2026: [
    {
      date: '2026-01-01', endDate: '2026-01-02',
      name: '新年', localName: 'Tết Dương lịch',
      region: 'vn', days: 2, official: true,
      desc: '公历元旦，2026年1/1（周四），换休1/2（周五），实际连休4天（含周末1/3-1/4）。',
      makeup: '1/2（周五）换休，1/10（周六）补班',
    },
    {
      date: '2026-02-16', endDate: '2026-02-20',
      name: 'Tết（越南春节）', localName: 'Tết Nguyên Đán Bính Ngọ',
      region: 'vn', days: 5, official: true,
      desc: '法定5天（含除夕前一天），含前后周末合计9天连休（2/14-2/22）。农历丙午年。',
      makeup: null,
    },
    {
      date: '2026-04-27',
      name: '雄王纪念日', localName: 'Giỗ Tổ Hùng Vương',
      region: 'vn', days: 1, official: true,
      desc: '农历三月初十，纪念传说中越南祖先雄王。2026年4/26（周日），4/27（周一）换休。',
      makeup: null,
    },
    {
      date: '2026-04-30', endDate: '2026-05-01',
      name: '统一日 & 劳动节', localName: 'Ngày Giải phóng & Quốc tế Lao động',
      region: 'vn', days: 2, official: true,
      desc: '南方解放统一纪念日（4/30）与国际劳动节（5/1），连续2个法定假日，合计4天连休。',
      makeup: null,
    },
    {
      date: '2026-09-01', endDate: '2026-09-02',
      name: '国庆节', localName: 'Quốc khánh',
      region: 'vn', days: 2, official: true,
      desc: '纪念1945年9/2胡志明宣布独立，2026年9/1（周二）+9/2（周三）共2天，实际连休5天（含8/29-8/30、9/3周末）。',
      makeup: null,
    },
    {
      date: '2026-11-24',
      name: '越南文化节', localName: 'Ngày Văn hóa Việt Nam',
      region: 'vn', days: 1, official: true,
      desc: '2026年新增法定假日，11月24日（周二）。',
      makeup: null,
    },
  ],

  // =====================================================================
  // 2027 越南  ——  ⚠️ 官方尚未正式公告（预计2026年底发布），以下为预估
  // =====================================================================
  vn_2027: [
    {
      date: '2027-01-01',
      name: '新年', localName: 'Tết Dương lịch',
      region: 'vn', days: 1, official: false,
      desc: '公历元旦，1月1日（周五）。',
      makeup: null,
    },
    {
      date: '2027-02-05', endDate: '2027-02-11',
      name: 'Tết（越南春节）', localName: 'Tết Nguyên Đán Đinh Mùi',
      region: 'vn', days: 7, official: false,
      desc: '农历丁未年春节，除夕约2/12（周五），初一约2/13（周六）。具体安排待官方公告。',
      makeup: '具体安排待官方公告',
    },
    {
      date: '2027-04-16',
      name: '雄王纪念日', localName: 'Giỗ Tổ Hùng Vương',
      region: 'vn', days: 1, official: false,
      desc: '农历三月初十，2027年约4/16（周五）。',
      makeup: null,
    },
    {
      date: '2027-04-30',
      name: '统一日', localName: 'Ngày Giải phóng miền Nam',
      region: 'vn', days: 1, official: false,
      desc: '4/30（周五）。',
      makeup: null,
    },
    {
      date: '2027-05-01',
      name: '劳动节', localName: 'Quốc tế Lao động',
      region: 'vn', days: 1, official: false,
      desc: '5/1（周六），通常会有换休安排，具体待官方公告。',
      makeup: null,
    },
    {
      date: '2027-09-02', endDate: '2027-09-03',
      name: '国庆节', localName: 'Quốc khánh',
      region: 'vn', days: 2, official: false,
      desc: '9/2（周四），通常连休2天，具体待官方公告。',
      makeup: null,
    },
    {
      date: '2027-11-24',
      name: '越南文化节', localName: 'Ngày Văn hóa Việt Nam',
      region: 'vn', days: 1, official: false,
      desc: '11月24日（周三）。',
      makeup: null,
    },
  ],

  // =====================================================================
  // 2026 日本  ——  内閣府「令和8年（2026年）の国民の祝日」（官方正式公告）
  // =====================================================================
  jp_2026: [
    {
      date: '2026-01-01', endDate: '2026-01-03',
      name: '元旦', localName: '元日',
      region: 'jp', days: 1, official: true,
      desc: '1月1日（周四），参拜神社（初詣），祈求新年平安。',
      makeup: null,
    },
    {
      date: '2026-01-12',
      name: '成人节', localName: '成人の日',
      region: 'jp', days: 1, official: true,
      desc: '1月第二个周一（1月12日），庆祝年满20岁成年人。',
      makeup: null,
    },
    {
      date: '2026-02-11',
      name: '建国纪念日', localName: '建国記念の日',
      region: 'jp', days: 1, official: true,
      desc: '2月11日（周三），纪念日本建国神话。',
      makeup: null,
    },
    {
      date: '2026-02-23',
      name: '天皇诞生日', localName: '天皇誕生日',
      region: 'jp', days: 1, official: true,
      desc: '2月23日（周一），庆祝今上天皇德仁生日。',
      makeup: null,
    },
    {
      date: '2026-03-20',
      name: '春分节', localName: '春分の日',
      region: 'jp', days: 1, official: true,
      desc: '3月20日（周五），扫墓祭祖，踏春出行。',
      makeup: null,
    },
    {
      date: '2026-04-29',
      name: '昭和节', localName: '昭和の日',
      region: 'jp', days: 1, official: true,
      desc: '4月29日（周三），黄金周正式开始，纪念昭和天皇诞辰。',
      makeup: null,
    },
    {
      date: '2026-05-03', endDate: '2026-05-06',
      name: '黄金周（宪法纪念日起）', localName: 'ゴールデンウィーク',
      region: 'jp', days: 4, official: true,
      desc: '宪法纪念日5/3（周日）→绿之日5/4（周一）→儿童节5/5（周二）→振替休日5/6（周三），连续4天。',
      makeup: '5/6为宪法纪念日的振替休日',
    },
    {
      date: '2026-07-20',
      name: '海洋节', localName: '海の日',
      region: 'jp', days: 1, official: true,
      desc: '7月第三个周一（7月20日），感谢海洋的恩惠。',
      makeup: null,
    },
    {
      date: '2026-08-11',
      name: '山之日', localName: '山の日',
      region: 'jp', days: 1, official: true,
      desc: '8月11日（周二），登山亲近自然。',
      makeup: null,
    },
    {
      date: '2026-09-21', endDate: '2026-09-23',
      name: '敬老节 / 银周', localName: '敬老の日・シルバーウィーク',
      region: 'jp', days: 3, official: true,
      desc: '内閣府正式公告：敬老の日9/21（周一）→休日9/22（祝日法第3条第3项）→秋分の日9/23（周三），银周3连休。',
      makeup: '9/22为祝日法振替休日（国民の休日）',
    },
    {
      date: '2026-10-12',
      name: '体育节', localName: 'スポーツの日',
      region: 'jp', days: 1, official: true,
      desc: '10月第二个周一（10月12日），促进体育运动。',
      makeup: null,
    },
    {
      date: '2026-11-03',
      name: '文化节', localName: '文化の日',
      region: 'jp', days: 1, official: true,
      desc: '11月3日（周二），推崇文化与爱国精神。',
      makeup: null,
    },
    {
      date: '2026-11-23',
      name: '勤劳感谢节', localName: '勤労感謝の日',
      region: 'jp', days: 1, official: true,
      desc: '11月23日（周一），感谢劳动、庆祝丰收。',
      makeup: null,
    },
  ],

  // =====================================================================
  // 2027 日本  ——  内閣府「令和9年（2027年）の国民の祝日」（官方正式公告）
  // =====================================================================
  jp_2027: [
    {
      date: '2027-01-01',
      name: '元旦', localName: '元日',
      region: 'jp', days: 1, official: true,
      desc: '1月1日（周五）。',
      makeup: null,
    },
    {
      date: '2027-01-11',
      name: '成人节', localName: '成人の日',
      region: 'jp', days: 1, official: true,
      desc: '1月第二个周一（1月11日）。',
      makeup: null,
    },
    {
      date: '2027-02-11',
      name: '建国纪念日', localName: '建国記念の日',
      region: 'jp', days: 1, official: true,
      desc: '2月11日（周四）。',
      makeup: null,
    },
    {
      date: '2027-02-23',
      name: '天皇诞生日', localName: '天皇誕生日',
      region: 'jp', days: 1, official: true,
      desc: '2月23日（周二）。',
      makeup: null,
    },
    {
      date: '2027-03-21', endDate: '2027-03-22',
      name: '春分节', localName: '春分の日',
      region: 'jp', days: 2, official: true,
      desc: '内閣府正式公告：春分の日3/21（周日）→振替休日3/22（周一）。',
      makeup: '3/22为振替休日',
    },
    {
      date: '2027-04-29',
      name: '昭和节', localName: '昭和の日',
      region: 'jp', days: 1, official: true,
      desc: '4月29日（周四），黄金周开始。',
      makeup: null,
    },
    {
      date: '2027-05-03', endDate: '2027-05-05',
      name: '黄金周', localName: 'ゴールデンウィーク',
      region: 'jp', days: 3, official: true,
      desc: '宪法纪念日5/3（周一）→绿之日5/4（周二）→儿童节5/5（周三），连续3天。',
      makeup: null,
    },
    {
      date: '2027-07-19',
      name: '海洋节', localName: '海の日',
      region: 'jp', days: 1, official: true,
      desc: '7月第三个周一（7月19日）。',
      makeup: null,
    },
    {
      date: '2027-08-11',
      name: '山之日', localName: '山の日',
      region: 'jp', days: 1, official: true,
      desc: '8月11日（周三）。',
      makeup: null,
    },
    {
      date: '2027-09-20',
      name: '敬老节', localName: '敬老の日',
      region: 'jp', days: 1, official: true,
      desc: '9月第三个周一（9月20日）。',
      makeup: null,
    },
    {
      date: '2027-09-23',
      name: '秋分节', localName: '秋分の日',
      region: 'jp', days: 1, official: true,
      desc: '9月23日（周四）。',
      makeup: null,
    },
    {
      date: '2027-10-11',
      name: '体育节', localName: 'スポーツの日',
      region: 'jp', days: 1, official: true,
      desc: '10月第二个周一（10月11日）。',
      makeup: null,
    },
    {
      date: '2027-11-03',
      name: '文化节', localName: '文化の日',
      region: 'jp', days: 1, official: true,
      desc: '11月3日（周三）。',
      makeup: null,
    },
    {
      date: '2027-11-23',
      name: '勤劳感谢节', localName: '勤労感謝の日',
      region: 'jp', days: 1, official: true,
      desc: '11月23日（周二）。',
      makeup: null,
    },
  ],
};

// 按年份 & 地区聚合
function getHolidays(year, regions) {
  const result = [];
  regions.forEach(r => {
    const key = `${r}_${year}`;
    if (HOLIDAYS[key]) result.push(...HOLIDAYS[key]);
  });
  return result.sort((a, b) => a.date.localeCompare(b.date));
}
