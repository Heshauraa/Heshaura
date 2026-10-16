import type {Metadata} from 'next';import {notFound} from 'next/navigation';import {policies} from '@/lib/policies';import PolicyPage from '@/components/policy-page';
export async function generateMetadata({params}:any):Promise<Metadata>{const {slug}=await params;return {title:(policies[slug]?.title||'Policy')+' | HESHAURA',description:policies[slug]?.intro,robots:{index:false,follow:true}}}
export default async function Page({params}:any){const {slug}=await params;const policy=policies[slug];if(!policy)notFound();return <PolicyPage policy={policy}/>}
