import http from 'http';
import app from './src/app';
const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
	console.log(`Server listening on port ${port}`);
	console.log(`Docs available at http://localhost:${port}/docs`);
});
