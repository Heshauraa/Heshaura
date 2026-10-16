import type {Metadata} from 'next';
import DemoAccount from './demo-account';
export const metadata:Metadata={title:'Demo Customer Account | HESHAURA',robots:{index:false,follow:false}};
export default function Page(){return <DemoAccount/>}
