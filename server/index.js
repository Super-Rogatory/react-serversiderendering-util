import express from 'express';
import cors from 'cors';
import { renderToString } from 'react-dom/server';
import React from 'react';
import App from '../client/src/components/App';
import { fetchPopularRepos } from '../utils/utils';
import serialize from 'serialize-javascript';

const app = express();
const PORT = 5000;

app.use(cors());

app.use(express.static('public'));

app.get('*', (req, res, next) => {
	fetchPopularRepos()
		.then((data) => {
			const markup = renderToString(<App data={data} />);
			res.send(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Server-Side Rendering</title>
            <script src='/bundle.js' defer></script>
            <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
          </head>
          <body>
            <div id="app">${markup}</div>
          </body>
        </html>
    `);
		})
		.catch((err) => next(err));
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Something went wrong!');
});
app.listen(PORT, () => console.log(`server is listening on PORT ${PORT}`));
