import {headers} from 'next/headers';import {requireChatGPTUser} from '@/app/chatgpt-auth';import {admin} from '@/lib/admin';import Orders from './orders';
export const dynamic='force-dynamic';
export default async function Page(){await requireChatGPTUser('/admin/orders');try{await admin(new Request('https://store.local/admin/orders',{headers:await headers()}));return <Orders/>}catch{return <main className="denied"><h1>Order management</h1><p>Reserved for administrators.</p><a href="/signout-with-chatgpt?return_to=%2Fadmin%2Forders" target="_top">Switch account</a></main>}}
