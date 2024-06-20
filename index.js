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

//order API
app.post('/order', async (req, res) => {
  const {user,order} = req.body;
  try {
    const userInsertQuery = `INSERT INTO ecom.users (name, email)
    VALUES ('${user.name}', '${user.email}') RETURNING *`;

    const { rows } = await db.query(userInsertQuery);
   
    const user_id = rows[0].id;
    try{
      const orderInsertQuery = `INSERT INTO ecom.orders (amount,user_id)
      VALUES ('${order.amount}', '${user_id}') RETURNING *`;
      const {rows} = await db.query(orderInsertQuery);
      const order_id = rows[0].id
      insertOrderItems(order_id, order.items);
    }catch(err){
      console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal Server Error' });
    }

    res.send('order placed successfully')
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

// Insert order items  into respective tables
const insertOrderItems = async (order_id,items) => {
  try{
    await Promise.all(items.map(async (item) => {
      if(item.category == 'Chairs'){
        const orderChairsInsertQuery = `INSERT INTO ecom.order_chairs (order_id,chair_id) 
        VALUES('${order_id}', '${item.id}')`;
        await db.query(orderChairsInsertQuery);
      }else if(item.category == 'Table'){
          const orderTablesInsertQuery = `INSERT INTO ecom.order_tables (order_id,table_id) 
        VALUES('${order_id}', '${item.id}')`
        await db.query(orderTablesInsertQuery);
      }else if(item.category == 'Top'){
        const orderTopsInsertQuery = `INSERT INTO ecom.order_tops (order_id,top_id) 
        VALUES('${order_id}', '${item.id}')`
        await db.query(orderTopsInsertQuery);
      }else{
        console.log('cannot find category');
      }
    }));
  
  }catch(err){
    console.error('Error inserting data', err);
  }
};

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})