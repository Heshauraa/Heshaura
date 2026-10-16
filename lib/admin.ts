import { env } from 'cloudflare:workers';
const OWNER_EMAIL='heshaurastore@gmail.com';
export class HttpError extends Error{constructor(public status:number,message:string){super(message)}}
export function db(){if(!env.DB)throw new HttpError(503,'Database is not configured');return env.DB}
export async function admin(req:Request,write=false){
 const id=req.headers.get('oai-authenticated-user-id'),email=req.headers.get('oai-authenticated-user-email');
 if(!id||!email)throw new HttpError(401,'Sign in with the store owner account.');
 if(write&&req.headers.get('Origin')!==new URL(req.url).origin)throw new HttpError(403,'Invalid request origin.');
 let row=await db().prepare('SELECT user_id FROM admins WHERE user_id=?').bind(id).first();
 if(!row&&email.toLowerCase()===OWNER_EMAIL){const existing=await db().prepare('SELECT user_id FROM admins LIMIT 1').first();if(!existing){await db().prepare('INSERT OR IGNORE INTO admins(user_id,email,created_at) VALUES(?,?,?)').bind(id,email,new Date().toISOString()).run();row=await db().prepare('SELECT user_id FROM admins WHERE user_id=?').bind(id).first()}}
 if(!row)throw new HttpError(403,'Store management is reserved for administrators.');return {id,email};
}
export function response(data:unknown,status=200){return Response.json(data,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}})}
export function failure(e:unknown){if(e instanceof HttpError)return response({error:e.message},e.status);console.error('Store operation failed',e);return response({error:'The operation could not be completed. Please retry.'},500)}
export async function body(req:Request){if(!req.headers.get('content-type')?.includes('application/json'))throw new HttpError(415,'JSON required');const text=await req.text();if(text.length>100000)throw new HttpError(413,'Product is too large');try{return JSON.parse(text)}catch{throw new HttpError(400,'Invalid JSON')}}
export function parseRow(r:any){return {...r,variants:JSON.parse(r.variants)}}
