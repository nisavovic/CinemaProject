const express = require('express')
const app = express()
const client = require('./dbConnection.js')
const PORT = 4000;
const bodyParser = require('body-parser')

app.listen(PORT,()=>{
   console.log('App running at the port : ' + PORT);
})


//communication test
app.get('/',(req,res)=>{
    res.status(200).send('Welcome!')
})

//querieng customers to test database connection
app.get('/customers',(req,res)=>{
    client.query(`SELECT * FROM customer ` , (err,result)=>{
        if(err){
            res.status(500).send(err.message)
        }
        else{
            res.status(200).send(result.rows)
        }
    })
})


//sdssdad

app.use(bodyParser.json())

//inserting customers for testing 
app.post('/customers/newCustomer',(req,res)=>{
    const user = req.body;
    const insertNewCustomers = `INSERT INTO customer(id,user_id,firstname,lastname,email,phone_number,customer_password)
                                 VALUES(${user.id},${user.user_id},'${user.firstname}','${user.lastname}','${user.email}','${user.phone_number}','${user.customer_password}')`;

    client.query(insertNewCustomers,(err)=>{
        if(err){
            res.status(500).send(err.message)
        }
        else{
            res.status(200).send('User inserted successfully!')
        }
    })                             
})

//deleting customer with specific id for testing
app.delete('/customers/deleteCustomer/:id',(req,res)=>{
    const deleteCustomer = `DELETE FROM customer WHERE id = ${req.params.id}`;
    client.query(deleteCustomer,(err)=>{
        if(err){
            res.status(500).send(err.message)
        }
        else{
            res.status(200).send('Deletion is succesfull!')
        }
    })
})