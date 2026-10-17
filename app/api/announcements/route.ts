import {response,failure} from '@/lib/admin';import {readAnnouncement,visibleAnnouncement} from '@/lib/announcements';
export async function GET(){try{const data=await readAnnouncement();return response({announcement:visibleAnnouncement(data),ticker:{enabled:data.tickerEnabled,text:data.tickerText,speed:data.tickerSpeed}})}catch(e){return failure(e)}}
