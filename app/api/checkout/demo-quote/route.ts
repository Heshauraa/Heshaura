import {body,failure,response,HttpError} from '@/lib/admin';
import {demoQuote} from '@/lib/demo-quote';
// Read-only preview data; does not authenticate, save orders or call payment/shipping providers.
export async function POST(req:Request){try{if(req.headers.get('Origin')!==new URL(req.url).origin)throw new HttpError(403,'Invalid request origin.');const input=await body(req);return response(await demoQuote(input.items))}catch(e){return failure(e)}}
