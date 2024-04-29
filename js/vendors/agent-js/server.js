import http from 'http';
import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent, Actor } from "@dfinity/agent";

const hostname = '0.0.0.0';
const port = '8080';

const server = http.createServer((req, res) => {
    if (req.url === '/executeFunction') {
        yourFunction(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

async function yourFunction(req, res) {
    try {
	 /*        
		let authClient = await AuthClient.create();

        await new Promise((resolve) => {
            authClient.login({
                identityProvider: 'https://identity.ic0.app',
                onSuccess: resolve,
            });
        });
       const identity = authClient.getIdentity();
        const agent = new HttpAgent({ identity });
        const actor = createActor(process.env.CANISTER_ID_II_INTEGRATION_BACKEND, {
            agent,
        });
	*/
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Authentication and actor creation successful');
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('An error occurred: ' + error.message);
    }
}
