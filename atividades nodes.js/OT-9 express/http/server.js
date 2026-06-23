import { fileURLToPath } from 'url';
import http from 'http';
import express from 'express';
import path from 'path';

const app = express();
app.use(express.json());
app.use(express.static('express'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// URL padrão do site
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


const server = http.createServer(app);
const port = 3000;
server.listen(port);

console.debug('Server inicializado na porta ' + port);