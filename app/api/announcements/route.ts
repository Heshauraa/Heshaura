import {response,failure} from '@/lib/admin';import {readAnnouncement,visibleAnnouncement} from '@/lib/announcements';
export async function GET(){try{return response({announcement:visibleAnnouncement(await readAnnouncement())})}catch(e){return failure(e)}}
