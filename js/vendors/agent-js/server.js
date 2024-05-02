import express from 'express';

const app = express();

const hostname = '0.0.0.0';
const port = 8080;

app.use(express.static('public'));

app.get('/auth', (req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

app.use((req, res) => {
    res.status(404).send('Not Found');
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
