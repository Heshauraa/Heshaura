import {admin,body,response,failure} from '@/lib/admin';import {readCreatorVideos,saveCreatorVideos} from '@/lib/creator-videos';
export async function GET(req:Request){try{await admin(req);return response({section:await readCreatorVideos()})}catch(e){return failure(e)}}
export async function PUT(req:Request){try{await admin(req,true);return response({section:await saveCreatorVideos(await body(req))})}catch(e){return failure(e)}}
