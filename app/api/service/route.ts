import { db,hash,random,config,credential,setPassword,cookie,session,license,makeSession,metric,reply } from "@/lib/service";
import { DEFAULT_CONFIG, type Config } from "@/lib/product-data";
export const dynamic="force-dynamic";
export async function GET(req:Request){try {const cfg=await config();return reply({config:cfg,license:cfg.serviceOpen?await license(req):null});}catch(e){console.error("config unavailable",e);return reply({error:"暂时无法读取产品设置，请稍后重试。"},503);}}
export async function POST(req:Request){try{
 if(req.headers.get("origin")&&req.headers.get("origin")!==new URL(req.url).origin)return reply({error:"请求来源不符，请刷新后重试。"},403);
 if(!req.headers.get("content-type")?.includes("application/json"))return reply({error:"请求格式不正确。"},415);
 const raw=await req.text();if(raw.length>48000)return reply({error:"提交内容过长。"},413);
 let b;try{b=JSON.parse(raw);}catch{return reply({error:"提交内容无法读取。"},400);}
 const action=b.action;
 if(action==="login"){
  const key=await hash("login-"+(req.headers.get("cf-connecting-ip")||"local")),now=Date.now();
  const a=await db().prepare("SELECT count,until FROM attempts WHERE key=?").bind(key).first<{count:number;until:number}>();
  if(a&&a.until>now&&a.count>=6)return reply({error:"尝试次数较多，请 15 分钟后再试。"},429);
  if(typeof b.password!=="string"||b.password.length>128||!await credential(b.password)){
   await db().prepare("INSERT INTO attempts (key,count,until) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET count=CASE WHEN until < ? THEN 1 ELSE count+1 END, until=CASE WHEN until < ? THEN excluded.until ELSE until END").bind(key,now+900000,now,now).run();return reply({error:"管理员密码不正确。"},401);
  }
  await db().batch([db().prepare("DELETE FROM attempts WHERE key=? OR until < ?").bind(key,now),db().prepare("DELETE FROM sessions WHERE expires < ?").bind(now)]);
  return reply({ok:true},200,await makeSession(req,"admin",null));
 }
 if(action==="logout"||action==="reset-access"){
  const name=action==="logout"?"chufa_admin":"chufa_access",t=cookie(req,name);if(t)await db().prepare("DELETE FROM sessions WHERE hash=?").bind(await hash(t)).run();return reply({ok:true},200,`${name}=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0`);
 }
 if(action==="redeem"){
  const cfg=await config();if(!cfg.serviceOpen)return reply({error:cfg.maintenance},403);if(!cfg.redeemOpen)return reply({error:"兑换暂时关闭，请稍后再试。"},403);
  const code=typeof b.code==="string"?b.code.trim().toUpperCase():"";
  if(!/^[A-Z0-9-]{4,40}$/.test(code))return reply({error:"兑换码无效，请检查后重新输入。"},400);
  const c=await db().prepare("SELECT tier FROM codes WHERE code=? AND enabled=1").bind(code).first<{tier:string}>();if(!c)return reply({error:"兑换码无效，请检查后重新输入。"},400);
  const current=await session(req,"user");if(current?.code!==code){await db().prepare("UPDATE codes SET uses=uses+1,last_used=? WHERE code=?").bind(Date.now(),code).run();await metric("activations");}
  return reply({ok:true,license:c},200,await makeSession(req,"user",code));
 }
 if(action==="event"){
  if(!["visits","plans"].includes(b.event))return reply({error:"无效操作。"},400);
  const cfg=await config();if(!cfg.serviceOpen)return reply({ok:true});
  if(b.event==="plans"&&!await license(req))return reply({error:"请先输入兑换码。"},401);
  const name=b.event==="visits"?"chufa_visit":"chufa_plan_event";
  if(cookie(req,name))return reply({ok:true});await metric(b.event);
  return reply({ok:true},200,`${name}=1; HttpOnly; SameSite=Strict; Path=/; Max-Age=${b.event==="visits"?1800:60}${new URL(req.url).protocol==="https:"?"; Secure":""}`);
 }
 if(!await session(req,"admin"))return reply({error:"请先登录管理后台。"},401);
 if(action==="dashboard"){
  const codes=await db().prepare("SELECT * FROM codes ORDER BY created DESC LIMIT 5000").all();
  const metrics=await db().prepare("SELECT key,value FROM metrics").all();
  return reply({config:await config(),codes:codes.results,metrics:Object.fromEntries((metrics.results as {key:string;value:number}[]).map(x=>[x.key,x.value]))});
 }
 if(action==="save-config"){
  const cfg={...await config()} as Config;
  for(const k of Object.keys(DEFAULT_CONFIG) as (keyof Config)[]){if(k in b.config){if(typeof b.config[k]!==typeof DEFAULT_CONFIG[k])return reply({error:"内容格式不正确。"},400);if(typeof b.config[k]==="string"&&b.config[k].length>5000)return reply({error:"文字内容过长。"},400);(cfg as any)[k]=b.config[k];}}
  if(!cfg.name.trim()||cfg.name.length>30||!cfg.subtitle.trim()||!/^\d{1,5}(\.\d{1,2})?$/.test(cfg.price))return reply({error:"请检查产品名称、副标题和价格格式。"},400);
  await db().prepare("INSERT INTO settings (key,value) VALUES ('config',?) ON CONFLICT(key) DO UPDATE SET value=excluded.value").bind(JSON.stringify(cfg)).run();return reply({ok:true,config:cfg});
 }
 if(action==="create-codes"){
  if(!["basic","full"].includes(b.tier))return reply({error:"请选择对应权益。"},400);
  const count=b.code?1:Number(b.count);if(!Number.isInteger(count)||count<1||count>200)return reply({error:"每批请生成 1–200 个兑换码。"},400);
  const custom=typeof b.code==="string"?b.code.trim().toUpperCase():"";if(b.code&&!/^[A-Z0-9-]{4,40}$/.test(custom))return reply({error:"兑换码需为 4–40 位英文字母、数字或短横线。"},400);
  const existing=await db().prepare("SELECT COUNT(*) AS n FROM codes").first<{n:number}>();if((existing?.n||0)+count>5000)return reply({error:"当前最多保留 5000 个兑换码，请导出并清理不再使用的码。"},400);
  if(custom&&await db().prepare("SELECT code FROM codes WHERE code=?").bind(custom).first())return reply({error:"该兑换码已存在，请换一个。"},409);
  const rows=Array.from({length:count},()=>custom||"CF-"+random().slice(0,12).toUpperCase());
  await db().batch(rows.map(code=>db().prepare("INSERT INTO codes (code,tier,enabled,uses,created) VALUES (?,?,1,0,?)").bind(code,b.tier,Date.now())));return reply({ok:true,codes:rows});
 }
 if(action==="toggle-code"){await db().prepare("UPDATE codes SET enabled=? WHERE code=?").bind(b.enabled?1:0,String(b.code)).run();return reply({ok:true});}
 if(action==="delete-code"){await db().batch([db().prepare("DELETE FROM sessions WHERE code=?").bind(String(b.code)),db().prepare("DELETE FROM codes WHERE code=?").bind(String(b.code))]);return reply({ok:true});}
 if(action==="password"){
  if(typeof b.current!=="string"||!await credential(b.current))return reply({error:"原密码不正确。"},400);
  if(typeof b.password!=="string"||b.password.length<12||b.password.length>128)return reply({error:"新密码请使用 12–128 个字符。"},400);
  await setPassword(b.password);await db().prepare("DELETE FROM sessions WHERE kind='admin'").run();return reply({ok:true},200,await makeSession(req,"admin",null));
 }
 return reply({error:"无法识别该操作。"},400);
 }catch(e){console.error("service failed",e);return reply({error:"暂时无法完成操作，输入已保留，请稍后重试。"},503);}}
