import { backendClient } from "../../lib/api-client";

export default async function handler(req, res) {
    if(req.method === 'POST') {
        if(!req.body) {
            res.status(400).end();
        }
        try {
            console.log();
            const resBack = await backendClient.post('/delegatedFiles', req.body,
            { headers: { "x-access-token": req.body.token }});
            
            res.status(200).end();
        }catch(err) {
            if(err.response?.status === 400) {
                console.log(err);
                res.status(400).json(err.response.data);
                return;
            }
        }
    } else {
        res.status(405).end();
    }
}