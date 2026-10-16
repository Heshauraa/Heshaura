import {admin,body,response,failure} from '@/lib/admin';import {readAnnouncement,saveAnnouncement} from '@/lib/announcements';
export async function GET(req:Request){try{await admin(req);return response({announcement:await readAnnouncement()})}catch(e){return failure(e)}}
export async function PUT(req:Request){try{await admin(req,true);return response({announcement:await saveAnnouncement(await body(req))})}catch(e){return failure(e)}}
