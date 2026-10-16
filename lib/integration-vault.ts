import {env} from 'cloudflare:workers';import {HttpError} from './admin';
export type Provider='razorpay'|'shiprocket';
export function vaultReady(){return !!env.INTEGRATIONS_MASTER_KEY}
function bytes(b64:string){try{return Uint8Array.from(atob(b64),c=>c.charCodeAt(0))}catch{throw new HttpError(503,'Credential storage is unavailable.')}}
function base64(v:Uint8Array){return btoa(String.fromCharCode(...v))}
async function key(){const raw=env.INTEGRATIONS_MASTER_KEY;if(!raw)throw new HttpError(503,'Credential storage is not configured.');const data=bytes(raw);if(data.byteLength!==32)throw new HttpError(503,'Credential storage is unavailable.');return crypto.subtle.importKey('raw',data,'AES-GCM',false,['encrypt','decrypt'])}
const aad=(provider:string)=>new TextEncoder().encode('heshaura-integrations-v1:'+provider);
export async function seal(provider:Provider|'razorpay_test',value:Record<string,string>){const iv=crypto.getRandomValues(new Uint8Array(12)),k=await key();const encrypted=await crypto.subtle.encrypt({name:'AES-GCM',iv,additionalData:aad(provider)},k,new TextEncoder().encode(JSON.stringify(value)));return {ciphertext:base64(new Uint8Array(encrypted)),iv:base64(iv)}}
export async function unseal(provider:Provider|'razorpay_test',row:{ciphertext:string;iv:string}):Promise<Record<string,string>>{try{const plain=await crypto.subtle.decrypt({name:'AES-GCM',iv:bytes(row.iv),additionalData:aad(provider)},await key(),bytes(row.ciphertext));return JSON.parse(new TextDecoder().decode(plain))}catch{throw new HttpError(503,'Saved credentials could not be unlocked. Please contact the site administrator.')}}
