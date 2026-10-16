// Browser-only demo data. Never used as authentication by a server route.
export const DEMO_KEY='ha-customer-demo-v1';
export type DemoOrder={id:string;number:string;createdAt:string;subtotal:number;items:{name:string;size:string;color:string;qty:number;lineTotal:number}[]};
export type DemoCustomer={version:1;name:string;orders:DemoOrder[]};
export function readDemo():DemoCustomer|null{try{const x=JSON.parse(sessionStorage.getItem(DEMO_KEY)||'null');return x?.version===1&&typeof x.name==='string'&&Array.isArray(x.orders)?x:null}catch{return null}}
export function startDemo(){const x:DemoCustomer={version:1,name:'Demo Customer',orders:[]};sessionStorage.setItem(DEMO_KEY,JSON.stringify(x));return x}
export function endDemo(){sessionStorage.removeItem(DEMO_KEY)}
export function saveDemoOrder(order:DemoOrder){const x=readDemo();if(!x)throw Error('Your demo session ended. Open Demo login again.');const existing=x.orders.find(o=>o.id===order.id);if(existing)return existing;x.orders=[order,...x.orders].slice(0,20);sessionStorage.setItem(DEMO_KEY,JSON.stringify(x));return order}
