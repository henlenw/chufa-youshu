export async function api(action:string,data:Record<string,unknown>={}){const r=await fetch("/api/service",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action,...data})});const j=await r.json() as any;if(!r.ok)throw new Error(j.error||"操作未完成，请稍后重试。");return j;}
export function download(name:string,content:string,type="text/plain;charset=utf-8"){const url=URL.createObjectURL(new Blob([content],{type}));const a=document.createElement("a");a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),10000);}
export async function copy(text:string){try{await navigator.clipboard.writeText(text);}catch{const t=document.createElement("textarea");t.value=text;t.style.position="fixed";t.style.top="-9999px";document.body.appendChild(t);t.select();const ok=document.execCommand("copy");t.remove();if(!ok)throw new Error("复制未成功，请使用下载按钮保存。");}}


