import type {Metadata} from 'next';import Checkout from './checkout';import {headers} from 'next/headers';import {admin} from '@/lib/admin';
export const dynamic='force-dynamic';export const metadata:Metadata={title:'Checkout Preview | HESHAURA',robots:{index:false,follow:false}};
export default async function Page(){let canTest=false;try{await admin(new Request('https://store.local/checkout',{headers:await headers()}));canTest=true}catch{}return <Checkout canTest={canTest}/>}
