import {db,response,failure,HttpError} from '@/lib/admin';
import {attemptConfig,testConfig,validHmac,reconcilePayment} from '@/lib/razorpay-test';
export async function POST(req:Request){try{
 if(Number(req.headers.get('content-length'))>1000000)throw new HttpError(413,'Payload too large.');
 const raw=await req.text();if(raw.length>1000000)throw new HttpError(413,'Payload too large.');
 let payload:any;try{payload=JSON.parse(raw)}catch{throw new HttpError(400,'Invalid JSON.');}
 const entity=payload?.payload?.payment?.entity,providerOrderId=entity?.order_id;
 const attempt=typeof providerOrderId==='string'&&/^order_[A-Za-z0-9]+$/.test(providerOrderId)?await db().prepare('SELECT * FROM payment_attempts WHERE razorpay_order_id=?').bind(providerOrderId).first<any>():null;
 const config=attempt?await attemptConfig(attempt):await testConfig();if(!await validHmac(config.webhookSecret,raw,req.headers.get('X-Razorpay-Signature')))throw new HttpError(400,'Invalid webhook signature.');
 if(!attempt)return response({ignored:true});
 if(!['payment.captured','payment.authorized','payment.failed'].includes(payload.event))return response({ignored:true});
 const row=await db().prepare("SELECT * FROM orders WHERE id=? AND mode='razorpay_test'").bind(attempt.order_id).first<any>();
 if(!row)return response({ignored:true});
 // API reconciliation verifies the actual amount, currency, order and capture state.
 const result=await reconcilePayment(row,attempt,String(entity.id||''));
 return response({received:true,mode:'test',paid:result.paid});
 }catch(e){return failure(e)}}
