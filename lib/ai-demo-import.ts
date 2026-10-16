import products from '@/site-content/ai-demo-products.json';
import {db,HttpError} from './admin';
import {productSchema} from './product-validation';
export async function importAiDemo(){
 const catalog=products.map(p=>productSchema.parse(p));
 if(catalog.length!==32)throw new HttpError(500,'Invalid demo dataset.');
 const existing=await db().prepare('SELECT id,slug FROM products').all<{id:number;slug:string}>();
 const slugs=new Set(existing.results.map(p=>p.slug));const pending=catalog.filter(p=>!slugs.has(p.slug));
 const now=new Date().toISOString();const statements=[];
 for(const p of pending){
  statements.push(db().prepare('INSERT INTO products(name,slug,description,category,audience,status,price,mrp,image,variants,seo_title,seo_description,demo,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,1,?,?)').bind(p.name,p.slug,p.description,p.category,p.audience,p.status,p.price,p.mrp,p.image,JSON.stringify(p.variants),p.seo_title,p.seo_description,now,now));
  for(const v of p.variants)statements.push(db().prepare('INSERT INTO product_skus(sku,product_id) SELECT ?,id FROM products WHERE slug=?').bind(v.sku.toLowerCase(),p.slug));
  statements.push(db().prepare("INSERT INTO audit(user_id,action,product_id,created_at) SELECT 'service:ai-demo-import','create-ai-demo',id,? FROM products WHERE slug=?").bind(now,p.slug));
 }
 if(statements.length)await db().batch(statements);
 return {created:pending.length,alreadyPresent:catalog.length-pending.length,totalRequested:catalog.length};
}
