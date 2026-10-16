import plan from '@/site-content/seo-keywords.json';
import {escapeHtml as esc} from './storefront';
const pages=plan.pages as Record<string,{title:string;description:string;h1?:string;heading:string;intro:string}>;
export function applyStoreSeo(html:string,path:string,origin:string,product?:any){
 const config=pages[path];if(!config&&!product)return html;
 const title=product?(product.seo_title||`${product.name} | HESHAURA`)+(product.demo?' · Demo preview':''):config.title;
 const description=product?(product.seo_description||product.description||'Explore the HESHAURA jewellery collection.').slice(0,300):config.description;
 const url=origin+path;
 html=html.replace(/<title>[\s\S]*?<\/title>/,`<title>${esc(title)}</title>`);
 function meta(key:string,value:string,property=false){const pattern=new RegExp('<meta (?:name|property)="'+key.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'"[^>]*>','g');const tag=`<meta ${property?'property':'name'}="${key}" content="${esc(value)}">`;html=pattern.test(html)?html.replace(pattern,()=>tag):html.replace('</head>',tag+'</head>')}
 meta('description',description);meta('og:title',title,true);meta('og:description',description,true);meta('og:url',url,true);meta('twitter:title',title);meta('twitter:description',description);
 html=html.replace(/<link rel="canonical"[^>]*>/g,`<link rel="canonical" href="${esc(url)}">`);
 if(config&&!product){if(config.h1){html=html.replace(/(<section class="hero">[\s\S]*?<h1>)[\s\S]*?(<\/h1>)/,(_,a,b)=>a+esc(config.h1)+b);html=html.replace('Handmade bracelets & fashion jewellery for women and men in India.</p>',esc(config.description)+'</p>')}
 html=html.replace(/<section class="seoIntro"><h2>[\s\S]*?<\/h2><p>[\s\S]*?<\/p>/,`<section class="seoIntro"><h2>${esc(config.heading)}</h2><p>${esc(config.intro)}</p>`);
 html=html.replace('<a href="/collections/necklaces/">Necklaces</a></div></section>','<a href="/collections/necklaces/">Necklaces</a><a href="/collections/earrings/">Earrings</a></div></section>');}
 // Keep preview noindex and access controls; do not publish demo prices as rich-result offers.
 const graph={'@context':'https://schema.org','@graph':[{'@type':'Organization','@id':origin+'/#brand',name:'HESHAURA',url:origin+'/',slogan:'Made of Love. Made by Heena.',email:'heshaurastore@gmail.com',telephone:'+919923334311',areaServed:{'@type':'Country',name:'India'}},{'@type':'WebSite','@id':origin+'/#website',name:'HESHAURA',url:origin+'/',inLanguage:'en-IN'},{'@type':path.startsWith('/collections/')?'CollectionPage':'WebPage','@id':url+'#page',name:title,description,url,inLanguage:'en-IN',isPartOf:{'@id':origin+'/#website'},about:{'@id':origin+'/#brand'}}]};
 html=html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g,'');
 html=html.replace('</head>','<script type="application/ld+json">'+JSON.stringify(graph).replace(/</g,'\\u003c')+'</script></head>');return html;
}
