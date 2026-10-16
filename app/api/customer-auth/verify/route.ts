import {validateLoginRequest,pending} from '@/lib/whatsapp-login';
export async function POST(req:Request){const v=await validateLoginRequest(req);if('error' in v)return Response.json({error:v.error},{status:v.status});if(!/^\d{6}$/.test(String(v.input.code||'')))return Response.json({error:'Enter the 6-digit code.'},{status:400});return pending()}
