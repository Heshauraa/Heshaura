import {headers} from 'next/headers';
import type {Metadata} from 'next';
import {requireChatGPTUser} from '@/app/chatgpt-auth';
import {admin} from '@/lib/admin';
import TestCheckout from './test-checkout';
export const dynamic='force-dynamic';
export const metadata:Metadata={title:'Razorpay Test Checkout | HESHAURA',robots:{index:false,follow:false}};
export default async function Page(){await requireChatGPTUser('/checkout/payment-test');try{await admin(new Request('https://store.local/checkout/payment-test',{headers:await headers()}));return <TestCheckout/>}catch{return <main className="denied"><h1>Test payment checkout</h1><p>Reserved for the store administrator.</p><a href="/admin">Admin login →</a></main>}}
