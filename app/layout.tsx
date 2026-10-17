import type {Metadata} from 'next';import './globals.css';
export const metadata:Metadata={title:'HESHAURA | Store management',description:'Made of Love. Made by Heena.',robots:{index:false,follow:false}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en-IN"><head><link rel="stylesheet" href="/assets/type-v4.css"/><link rel="stylesheet" href="/assets/site-motion-v6.css"/><script defer src="/assets/site-motion-v6.js"/></head><body>{children}</body></html>}
