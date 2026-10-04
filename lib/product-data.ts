export const DEFAULT_CONFIG = {
 name:"出发有数",subtitle:"把远行，准备得明明白白。",description:"从第一张清单，到落地的第一天。把行前待办、行李和预算，装进一个小小的计划里。",price:"19.9",purchase:"请返回购买本产品的小红书店铺或原购买渠道，获取兑换码。",contact:"如需帮助，请联系原购买渠道的卖家。",
 instructions:"1. 选择目的地、出发日期和生活场景。\n2. 生成清单，逐项勾选；不适用的项目可以删掉。\n3. 填写预算，并导出备份。换浏览器前，请先保存备份文件。",
 disclaimer:"清单和预算用于信息整理与个人规划，不构成法律、签证、税务或医疗意见。学校、航司和目的地要求请以对应官方信息为准。",
 faq:"兑换后可以用多久？|兑换码解锁相应权益，在本产品服务存续期间使用，不按次收费。\n换手机后怎么办？|用原兑换码重新激活，再导入之前导出的备份。\n数据在哪里？|个人计划只保存在当前浏览器；清除浏览器数据会删除计划，请定期备份。\n清单是官方规定吗？|不是。清单是可编辑的准备提示，具体要求需要自行核对官方来源。",
 serviceOpen:true,redeemOpen:true,announcementOn:false,announcement:"欢迎开始准备下一段旅程。",maintenance:"产品正在整理维护，请稍后再来。",packingOn:true,budgetOn:true,exportOn:true,
};
export type Config=typeof DEFAULT_CONFIG;
export type Profile={destination:string;date:string;purpose:string;climate:string;housing:string;months:number};
export type Item={id:string;title:string;note:string;category:string;stage:string;done:boolean;quantity:number;weight:number;kind:"task"|"pack";custom?:boolean};
export type BudgetRow={id:string;title:string;type:"once"|"monthly";amount:number};
export type Plan={profile:Profile;items:Item[];budget:BudgetRow[];currency:string;rate:number;reserve:number;allowance:number;updatedAt:string};
export const DESTINATIONS=["英国","澳大利亚","美国","加拿大","德国","法国","日本","新加坡","中国香港","其他目的地"];
export const STAGES=["提前 1–3 个月","出发前 2 周","出发前 3 天","出发当天","落地第一周"];
export const CATEGORIES=["文件资料","衣物鞋包","电子设备","生活用品","学习工作","随身小物"];
type Seed=[string,string,string,string?];
const tasks:Seed[]=[
 ["核对证件有效期","根据本次行程查看旅行证件的有效期要求。",STAGES[0]],
 ["整理官方办理入口","收藏学校、机构和目的地官方网页，记录需自行确认的事项。",STAGES[0]],
 ["整理学校报到资料","核对学校发来的报到邮件和材料清单。",STAGES[0],"study"],
 ["确认课程开始日期","记录迎新、选课和正式上课时间。",STAGES[0],"study"],
 ["确认住宿起止日期","核对入住时间、联系人及晚到时的安排。",STAGES[0]],
 ["整理工作入职资料","按雇主清单准备，不在此工具存放证件号码。",STAGES[0],"work"],
 ["确认入职日期和地点","记录报到方式和需要自带的设备。",STAGES[0],"work"],
 ["列出首月支出","把住宿、交通、生活用品等拆开估算。",STAGES[0]],
 ["确认机票信息","核对姓名、机场、日期、转机和航班时间。",STAGES[0]],
 ["核对行李额度","以实际票价包含的托运和随身行李规则为准。",STAGES[0]],
 ["查看官方入境信息","自行核对本次行程适用的材料与申报要求。",STAGES[0]],
 ["确认所需保障安排","整理已有保障的范围及联系方式，自行核对学校或雇主要求。",STAGES[0]],
 ["安排国内事务","整理租住、快递、订阅和钥匙交接事项。",STAGES[1]],
 ["规划机场到住处的路线","保存换乘点和最终地址，准备备选路线。",STAGES[1]],
 ["确认接机或交通时刻","晚间抵达时核对实际运营时间。",STAGES[1]],
 ["准备通信方案","确认落地后可联网，核对现有号码的漫游方式。",STAGES[1]],
 ["整理重要联系方式","保存住宿、学校或雇主联系人。",STAGES[1]],
 ["备份重要文件","使用自己信任的方式备份，不向本工具上传敏感文件。",STAGES[1]],
 ["核对电源与设备兼容性","确认插头形状和设备标注电压，必要时查看制造商说明。",STAGES[1]],
 ["确认住宿提供的物品","先问清床品、厨具和吹风机，减少重复携带。",STAGES[1]],
 ["确认宿舍入住流程","查看接待时间、钥匙领取和床品尺寸。",STAGES[1],"dorm"],
 ["确认租住交接安排","记录钥匙领取、现有物品和负责人。",STAGES[1],"rental"],
 ["整理离线地图","保存机场、住处周边地图和当地语言地址。",STAGES[1]],
 ["核对常用支付方式","自行确认现有支付工具在目的地的使用条件。",STAGES[1]],
 ["确认行李运输限制","核对液体、电池和其他物品的航司规定。",STAGES[2]],
 ["核对随身物品","把当天所需证件、手机和资料放在方便取用处。",STAGES[2]],
 ["分别称量行李","工具重量是手动估算，最终以实物称重与航司要求为准。",STAGES[2]],
 ["保存住宿地址","准备一份离线可见的信息。",STAGES[2]],
 ["确认出发地交通","为到机场和办理手续留出需要的时间。",STAGES[2]],
 ["确认天气与首日衣物","查看临行天气，备好第一天方便取用的衣物。",STAGES[2]],
 ["整理冰箱与居家物品","处理食物、垃圾和需要关闭的家用设备。",STAGES[2]],
 ["给行李加识别标记","避免公开证件号码等敏感信息。",STAGES[2]],
 ["确认航班动态","出门前查看航司或机场发布的信息。",STAGES[3]],
 ["检查证件与手机","最后核对当天必须随身携带的物品。",STAGES[3]],
 ["保留登机和托运信息","按需要保存，方便抵达后查询。",STAGES[3]],
 ["给信任的人留行程","只向愿意分享的亲友提供行程。",STAGES[3]],
 ["确认入住物品状态","需要时拍照记录，并与联系人确认。",STAGES[4]],
 ["熟悉周边生活点位","找到超市、公共交通和日常服务点。",STAGES[4]],
 ["核对首周安排","按学校或雇主的官方通知完成必要事项。",STAGES[4]],
 ["补齐日用品","先购买确定需要的物品，再逐步补充。",STAGES[4]],
 ["回看预算与实际支出","用自己了解的价格替换估算，并留出余量。",STAGES[4]],
 ["留一点适应时间","安排休息和自由时间，按自己的节奏适应。",STAGES[4]],
];
const packing:Seed[]=[
 ["旅行证件","按本次行程要求携带。","文件资料"],["入学材料","以学校清单为准。","文件资料","study"],["入职材料","以雇主清单为准。","文件资料","work"],["行程确认单","准备离线版本。","文件资料"],["住宿确认信息","保存在自己的设备。","文件资料"],["必要文件备份","纸质或电子，自行选择。","文件资料"],["紧急联系信息","不需要上传到本工具。","文件资料"],
 ["日常上衣","结合洗衣频率决定件数。","衣物鞋包"],["长裤或裙装","按穿衣习惯调整。","衣物鞋包"],["内衣袜子","优先选择常穿且舒适的。","衣物鞋包"],["睡衣","方便第一晚取用。","衣物鞋包"],["舒适的鞋","考虑抵达当天步行和通勤。","衣物鞋包"],["拖鞋","根据住宿配套选择。","衣物鞋包"],["轻便外套","方便应对温差。","衣物鞋包"],["厚外套","寒冷场景加入，按当地季节调整。","衣物鞋包","cold"],["保暖内层","按个人需要选择。","衣物鞋包","cold"],["围巾与手套","寒冷场景加入。","衣物鞋包","cold"],["透气短袖","炎热场景加入。","衣物鞋包","warm"],["遮阳帽","按出行习惯选择。","衣物鞋包","warm"],["轻便雨具","结合天气选择。","衣物鞋包"],["正式场合衣物","有迎新、展示或入职需求时保留。","衣物鞋包"],["折叠购物袋","可用于购物或分类。","衣物鞋包"],["日常背包","选择适合通勤的容量。","衣物鞋包"],
 ["手机与充电线","确认可以正常充电。","电子设备"],["电脑与电源","根据学习工作需要携带。","电子设备"],["转换插头","核对插头形状和设备电压。","电子设备"],["耳机","按个人习惯选择。","电子设备"],["移动电源","容量、标识和携带方式请核对航司规定。","电子设备"],["移动存储设备","提前备份资料。","电子设备"],["鼠标","需要长时间使用电脑时考虑。","电子设备"],["设备保护套","保护随身设备。","电子设备"],["备用充电线","常用接口适量准备。","电子设备"],
 ["牙刷与小包装牙膏","核对随身液体限制。","生活用品"],["洗护用品","抵达初期够用即可。","生活用品"],["日常护肤用品","按个人习惯携带，不作功效建议。","生活用品"],["毛巾","确认住宿是否提供。","生活用品"],["纸巾","随身少量。","生活用品"],["梳子","按个人需要选择。","生活用品"],["个人卫生用品","按日常需求准备。","生活用品"],["眼镜与眼镜盒","平时使用时可以保留。","生活用品"],["洗衣袋","方便衣物分类。","生活用品"],["床品安排","确认住处配套与尺寸，再决定携带或当地购买。","生活用品"],["衣架安排","少量携带或落地采购。","生活用品"],["水杯","登机要求以航司为准。","生活用品"],["简单清洁用品","可考虑抵达后购买。","生活用品","rental"],
 ["笔与笔记本","少量够用即可。","学习工作"],["课程资料目录","先整理电子资料链接。","学习工作","study"],["常用学习用品","携带经常使用的。","学习工作","study"],["工作安排备忘","保存首日地点与联系人。","学习工作","work"],["资料文件夹","整理可能需要取出的纸质资料。","学习工作"],
 ["证件收纳袋","放在方便取用处。","随身小物"],["钥匙","安排好两地钥匙。","随身小物"],["行李识别牌","避免公开敏感个人信息。","随身小物"],["收纳袋","方便分类称重。","随身小物"],["颈枕或眼罩","按航程和喜好选择。","随身小物"],["首晚随身包","抵达后立即需要的少量用品。","随身小物"],["空白便签","用于简单标记。","随身小物"],
];
export const TEMPLATE_COUNT=tasks.length+packing.length;
export const defaultProfile=():Profile=>({destination:"英国",date:"",purpose:"study",climate:"mild",housing:"dorm",months:12});
export function generatePlan(p:Profile):Plan{
 const make=(rows:Seed[],kind:"task"|"pack"):Item[]=>rows.flatMap((r,i)=>!r[3]||[p.purpose,p.climate,p.housing].includes(r[3])?[{id:`${kind}-${i}`,title:r[0],note:r[1],category:kind==="pack"?r[2]:"行前待办",stage:kind==="task"?r[2]:"",done:false,quantity:1,weight:0,kind}]:[]);
 return {profile:p,items:[...make(tasks,"task"),...make(packing,"pack")],budget:[["机票与长途交通","once"],["住宿押金与预付款","once"],["初期生活用品","once"],["其他一次性支出","once"],["每月住宿","monthly"],["每月餐饮","monthly"],["每月市内交通","monthly"],["每月通信","monthly"],["其他每月支出","monthly"]].map(([title,type],i)=>({id:`b-${i}`,title,type:type as "once"|"monthly",amount:0})),currency:"CNY",rate:1,reserve:10,allowance:23,updatedAt:new Date().toISOString()};
}
export function budgetTotals(p:Plan){const once=p.budget.filter(x=>x.type==="once").reduce((s,x)=>s+x.amount,0),monthly=p.budget.filter(x=>x.type==="monthly").reduce((s,x)=>s+x.amount,0),base=once+monthly*p.profile.months;return {once,monthly,base,reserve:base*p.reserve/100,total:base*(1+p.reserve/100),cny:base*(1+p.reserve/100)*p.rate};}
export function validPlan(value:unknown):value is Plan{
 const p=value as Plan;
 return !!p&&typeof p==="object"&&!!p.profile&&typeof p.profile.destination==="string"&&p.profile.destination.length<80&&typeof p.profile.date==="string"&&/^\d{4}-\d{2}-\d{2}$/.test(p.profile.date)&&Number.isFinite(Date.parse(p.profile.date+"T00:00:00Z"))&&["study","work","life"].includes(p.profile.purpose)&&["cold","mild","warm"].includes(p.profile.climate)&&["dorm","rental","other"].includes(p.profile.housing)&&Number.isInteger(p.profile.months)&&p.profile.months>=1&&p.profile.months<=60&&Array.isArray(p.items)&&p.items.length<=500&&new Set(p.items.map(x=>x.id)).size===p.items.length&&p.items.every(x=>x&&typeof x.id==="string"&&x.id.length<100&&typeof x.title==="string"&&x.title.length<=150&&typeof x.note==="string"&&x.note.length<=500&&typeof x.category==="string"&&typeof x.stage==="string"&&typeof x.done==="boolean"&&["task","pack"].includes(x.kind)&&Number.isFinite(x.quantity)&&x.quantity>=0&&x.quantity<=999&&Number.isFinite(x.weight)&&x.weight>=0&&x.weight<=100)&&Array.isArray(p.budget)&&p.budget.length<=50&&p.budget.every(x=>x&&typeof x.id==="string"&&typeof x.title==="string"&&x.title.length<100&&["once","monthly"].includes(x.type)&&Number.isFinite(x.amount)&&x.amount>=0&&x.amount<=1e8)&&["CNY","GBP","USD","EUR","AUD","CAD","JPY","SGD","HKD"].includes(p.currency)&&Number.isFinite(p.rate)&&p.rate>0&&p.rate<=10000&&Number.isFinite(p.reserve)&&p.reserve>=0&&p.reserve<=100&&Number.isFinite(p.allowance)&&p.allowance>0&&p.allowance<=100;
}

