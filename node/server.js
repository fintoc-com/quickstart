const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const Fintoc = require('fintoc');

dotenv.config();
let linkToken = null;

const fintoc = new Fintoc(process.env.SECRET_KEY);
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(bodyParser.json());

app.get('/api/movements', (req, res) => {
  const movements = [
    { id: 1, amount: 5000, type: 'inbound' },
    { id: 2, amount: 2000, type: 'outbound' },
  ];
  res.json(movements);
});

app.get('/api/accounts/:linkId', async (req, res) => {
  try {
    // Find link_token with linkId in path params
    // const link = await fintoc.getLink(process.env.LINK_TOKEN); // ordinaria
    const link = await fintoc.getLink(linkToken);
    const accounts = link.findAll({ type_: 'checking_account' });
    res.json(accounts);
  } catch (error) {
    res.json(error);
  }
});

app.post('/api/link_token', (req, res) => {
  console.log(req.body);
  linkToken = req.body.data.link_token;
  console.log(`New link token for ${req.body.data.username} (${req.body.data.holder_type}): ${linkToken}`);
  res.send('Post request to /api/link_token');
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
