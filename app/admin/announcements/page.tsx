import {headers} from 'next/headers';import {requireChatGPTUser} from '@/app/chatgpt-auth';import {admin} from '@/lib/admin';import Editor from './editor';
export const dynamic='force-dynamic';
export default async function Page(){await requireChatGPTUser('/admin/announcements');try{await admin(new Request('https://store.local/admin/announcements',{headers:await headers()}));return <Editor/>}catch{return <main className="denied"><h1>Offers & updates</h1><p>Reserved for the store administrator.</p></main>}}
