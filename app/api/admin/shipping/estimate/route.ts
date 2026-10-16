import {admin,body,response,failure} from '@/lib/admin';
import {shippingPreview} from '@/lib/shipping-preview';
export async function POST(req:Request){try{await admin(req,true);return response(await shippingPreview(await body(req)));}catch(e){return failure(e)}}
