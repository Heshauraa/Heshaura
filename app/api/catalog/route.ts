import {db,response,failure,parseRow} from '@/lib/admin';
export async function GET(){try{const rows=await db().prepare("SELECT * FROM products WHERE status='active' ORDER BY id DESC LIMIT 10000").all();return response({products:rows.results.map(parseRow)})}catch(e){return failure(e)}}
