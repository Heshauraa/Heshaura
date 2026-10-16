import {body,failure,response,HttpError} from '@/lib/admin';import {quote} from '@/lib/orders';
export async function POST(req:Request){try{if(req.headers.get('Origin')!==new URL(req.url).origin)throw new HttpError(403,'Invalid request origin.');const input=await body(req);return response(await quote(input.items))}catch(e){return failure(e)}}
