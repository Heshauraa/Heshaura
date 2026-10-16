import type {Metadata} from 'next';import Login from './whatsapp-login';
export const metadata:Metadata={title:'WhatsApp Login | HESHAURA',description:'Sign in with your Indian WhatsApp number. No email or password.',robots:{index:false,follow:false}};
export default function Page(){return <Login/>}
