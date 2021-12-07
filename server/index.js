import express from 'express';
import cors from 'cors';
import { renderToString } from 'react-dom/server';
import React from 'react';
import App from '../client/src/components/App';

const app = express();
const PORT = 5000;

app.use(cors());

app.use(express.static('public'));

app.get('*', (req, res, next) => {
	const markup = renderToString(<App />);
	res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Server-Side Rendering</title>
        <script src='/bundle.js' defer></script>
      </head>
      <body>
        <div id="app">${markup}</div>
      </body>
    </html>
  `);
});

app.listen(PORT, () => console.log(`server is listening on PORT ${PORT}`));
