import {env} from 'cloudflare:workers';
import {response,failure} from '@/lib/admin';
import {importAiDemo} from '@/lib/ai-demo-import';
// A dedicated short-lived service key permits only this fixed, idempotent demo dataset.
export async function POST(req:Request){try{
 const expected=env.AI_DEMO_IMPORT_TOKEN,actual=req.headers.get('X-Heshaura-Demo-Token');
 if(!expected||!actual||actual.length>256||Date.now()>Number(expected.split('.')[0])||!/^\d+\./.test(expected))return response({error:'Unauthorized or expired'},401);
 const enc=new TextEncoder();const hashes=await Promise.all([expected,actual].map(x=>crypto.subtle.digest('SHA-256',enc.encode(x))));const a=new Uint8Array(hashes[0]),b=new Uint8Array(hashes[1]);let diff=0;for(let i=0;i<a.length;i++)diff|=a[i]^b[i];if(diff)return response({error:'Unauthorized'},401);
 return response({...await importAiDemo(),mode:'demo',paymentsEnabled:false,shippingEnabled:false});
 }catch(e){return failure(e)}}
