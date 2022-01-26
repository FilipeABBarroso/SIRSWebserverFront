import { backendClient } from "../../lib/api-client";

export default async function handler(req, res) {
    if(req.method === 'POST') {
        if(!req.body) {
            res.status(400).end();
        }
        try {
            const resBack = await backendClient.post('/createFile',req.body ,{headers: { 'x-access-token': req.body.jwt }});
        }catch(err) {
            console.log(err);
            if(err.response?.status === 400) {
                res.status(400).json(err.response.data);
                return;
            }
        }
        res.status(200).end();
    } else {
        res.status(405).end();
    }
}