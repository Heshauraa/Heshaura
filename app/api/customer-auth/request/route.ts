import {validateLoginRequest,pending} from '@/lib/whatsapp-login';
export async function POST(req:Request){const v=await validateLoginRequest(req);if('error' in v)return Response.json({error:v.error},{status:v.status});return pending()}
