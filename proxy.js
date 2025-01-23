import express from 'express';
import request from 'request';

const app = express();
const PORT = 3001;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/proxy', (req, res) => {
  const url = req.query.url;
  request(
    { url, headers: { 'User-Agent': 'request' } },
    (error, response, body) => {
      if (error) {
        return res.status(500).send(error);
      }
      res.send(body);
    }
  );
});

app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});