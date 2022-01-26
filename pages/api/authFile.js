import { backendClient } from "../../lib/api-client";

export default async function handler(req, res) {
    if(req.method === 'POST') {
        if(!req.body) {
            res.status(400).end();
        }
        try {
            const resBack = await backendClient.post('/fileAuthentication', req.body, { headers: { "x-access-token": req.body.token }});
            res.status(200).end();
        }catch(err) {
            if(err.response?.status === 400) {
                res.status(401).json(err.response.data);
                return;
            }
            if (err.response?.status === 401) {
              res.status(400).end();
            }
        }
    } else {
        res.status(405).end();
    }
}