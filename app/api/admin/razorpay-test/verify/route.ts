import {admin,body,response,failure} from '@/lib/admin';
import {verifyTestPayment} from '@/lib/razorpay-test';
export async function POST(req:Request){try{const user=await admin(req,true);return response(await verifyTestPayment(await body(req),user.id));}catch(e){return failure(e)}}
