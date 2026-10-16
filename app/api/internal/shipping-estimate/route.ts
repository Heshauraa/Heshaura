import {env} from 'cloudflare:workers';
import {body,response,failure} from '@/lib/admin';
import {shippingPreview} from '@/lib/shipping-preview';
// Read-only service verification. This route cannot create orders, AWBs or pickups.
export async function POST(req:Request){try{const expected=env.INTEGRATIONS_CHECK_TOKEN,actual=req.headers.get('X-Heshaura-Check-Token');if(!expected||!actual||actual.length>256)return response({error:'Unauthorized'},401);const enc=new TextEncoder(),hashes=await Promise.all([expected,actual].map(x=>crypto.subtle.digest('SHA-256',enc.encode(x))));const a=new Uint8Array(hashes[0]),b=new Uint8Array(hashes[1]);let diff=0;for(let i=0;i<a.length;i++)diff|=a[i]^b[i];if(diff)return response({error:'Unauthorized'},401);return response(await shippingPreview(await body(req)));}catch(e){return failure(e)}}
