import {z} from 'zod';
import {db,HttpError} from './admin';
import {quote} from './orders';
// Matches the illustrative storefront shown only while the managed catalog is empty.
export const previewProducts=[
 {id:0,name:'Aura Pendant',slug:'aura-pendant',price:89900,sizes:['One size']},
 {id:1,name:'Sculpt Ring',slug:'sculpt-ring',price:69900,sizes:['Small','Medium','Large']},
 {id:2,name:'Foundation Bracelet',slug:'foundation-bracelet',price:79900,sizes:['Small','Medium','Large']},
 {id:3,name:'Ember Bracelet',slug:'ember-bracelet',price:59900,sizes:['Small','Medium','Large']},
];
const schema=z.array(z.object({id:z.number().int().min(0).max(3),size:z.string().min(1).max(80),qty:z.number().int().min(1).max(99)})).min(1).max(50);
export function illustrativeQuote(input:unknown){const parsed=schema.safeParse(input);if(!parsed.success)throw new HttpError(400,'Your demo bag has an invalid product or quantity. Remove that item and add it again.');const merged=new Map<string,{id:number;size:string;qty:number}>();for(const x of parsed.data){const key=x.id+'|'+x.size;const current=merged.get(key);if(current)current.qty+=x.qty;else merged.set(key,{...x})}const items=[...merged.values()].map(x=>{const p=previewProducts[x.id];if(!p||!p.sizes.includes(x.size))throw new HttpError(409,'This preview variant is unavailable. Add it again from the store.');if(x.qty>99)throw new HttpError(400,'Maximum demo quantity per variant is 99.');return {productId:p.id,slug:p.slug,name:p.name,sku:'PREVIEW-'+p.id+'-'+x.size,size:x.size,color:'As shown',qty:x.qty,unitPrice:p.price,lineTotal:p.price*x.qty,image:'/assets/products.png#sprite='+p.id,demo:true}});return {items,subtotal:items.reduce((n,x)=>n+x.lineTotal,0),shipping:null,total:null,currency:'INR',mode:'browser_demo',shippingMessage:'Illustrative demo only. No delivery is booked.'}}
export async function demoQuote(input:unknown){const count=await db().prepare('SELECT COUNT(*) as n FROM products').first<{n:number}>();return count?.n===0?illustrativeQuote(input):quote(input)}
