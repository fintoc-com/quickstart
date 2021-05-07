const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const Fintoc = require('fintoc');
const moment = require('moment');

dotenv.config();
let linkToken = '';

const fintoc = new Fintoc(process.env.SECRET_KEY);
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(bodyParser.json());

app.get('/api/accounts', async (req, res) => {
  try {
    const link = await fintoc.getLink(linkToken);
    const accounts = link.findAll({ type_: 'checking_account' });
    res.json(accounts);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
});

app.get('/api/accounts/:accountId/movements', async (req, res) => {
  try {
    const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
    const link = await fintoc.getLink(linkToken);
    const account = link.find({ id_: req.params.accountId });
    const lastMonthMovements = await account.getMovements({ since: startOfMonth });
    res.json(lastMonthMovements);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
});

app.post('/api/link_token', (req, res) => {
  linkToken = req.body.data.link_token;
  res.send('Post request to /api/link_token');
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
