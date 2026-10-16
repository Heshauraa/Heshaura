import type {Metadata} from 'next';import './globals.css';
export const metadata:Metadata={title:'HESHAURA | Store management',description:'Made of Love. Made by Heena.',robots:{index:false,follow:false}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en-IN"><body>{children}</body></html>}
