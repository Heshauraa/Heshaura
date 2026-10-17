import {response,failure} from '@/lib/admin';import {readCreatorVideos} from '@/lib/creator-videos';
export async function GET(){try{const data=await readCreatorVideos();return response({section:data.enabled?data:null})}catch(e){return failure(e)}}
