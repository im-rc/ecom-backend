const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express()
const port = 3000

// Enable all CORS requests
app.use(cors());

// Body parser middleware to parse JSON body
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.post('/order', async (req, res) => {

  const {user,order} = req.body;
  try {
    const userInsertQuery = `INSERT INTO ecom.users (name, email)
    VALUES ('${user.name}', '${user.email}') RETURNING *`;

    const { rows } = await db.query(userInsertQuery);
    console.log(rows)
    const user_id = rows[0].id;
    try{
      const orderInsertQuery = `INSERT INTO ecom.orders (amount,user_id)
      VALUES ('${order.amount}', '${user_id}') RETURNING *`;
      const {rows} = await db.query(orderInsertQuery);
      console.log(rows);
    }catch(err){

    }

    res.send('order placed successfully')
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
    
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})