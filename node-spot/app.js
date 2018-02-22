const express = require('express')
var cors = require('cors')

const app = express();
const port = process.env.PORT || 1337;

app.use(cors())

app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
  });

app.get('/api/response', (req, res) => {
    res.send({data: 'You pressed the button!'});
});

 app.listen(port, () => console.log(`Listening on port ${port}`));

