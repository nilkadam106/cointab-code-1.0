const express = require('express')
const db = require('../db')


const router = express.Router()


/////////////add user//////////////////////////////////////

router.post('/add', (request, response) => {
 
  const { name,email,password} = request.body

  const connection = db.openConnection()

  // check if the email sent by user already exists in the table
  const emailStatement = `select email from users where email = '${email}'`
  connection.query(emailStatement, (error, emails) => {
    if (error) {
      // if error is generated while executing the query
      response.send({
          'status':'error',
          'data':error.sqlMessage
      })
    } else {
      if (emails.length == 0) {
        // there is no user registered with this email
        const statement = `
        insert into users (name , email, password) 
        values ('${name}', '${email}','${password}')`
        connection.query(statement, (error, result) => {
          connection.end()
          if(error){
            response.send({
              'status':'error',
              'data':error.sqlMessage
            })
          }
          else{
            response.send(
              {
                'status':'success',
                'data':'Added successfully'
              }
            )
          }

        })
      } else {
        // at least one user exists with this email address
        connection.end()
        response.send(
          {
            'status':'success',
            'data':'Email already exist'
          }
        )
      }
    }
  })
})

////////////////////////////SIGNIN//////////////////////////////////////////

router.post('/login', (request, response) => {


   const { email, password } = request.body

   const connection = db.openConnection()

  const statement = `
  select 
    userId, name ,email, password, count, status from users 
  where 
    email = '${email}'`

  var count = 0

  function incrementCount(count){
               connection.query(`update users set count='${count}' where email = '${email}'`,(error,data) => {
               console.log("count incremented")
               connection.end()
           })

  }

  function setCount(){
            connection.query(`update users set count='${0}' where email = '${email}'`,(error,data) => {
            console.log("count set to zero")
            connection.end()
         })

  } 

  function blockUser(){
    connection.query(`update users set status='${0}' where email = '${email}'`,(error,data) => {
      console.log("user blocked")
      setTimeout(()=>{
        connection.query(`update users set status='${1}' where email = '${email}'`,(error,data) => {
          console.log("unblocked user")
          setCount()
       })
      },86400000)
   })
  }

  connection.query(statement, (error, users) => {
   // connection.end()

    if(users[0].status === 0){
        response.send({
          'status':'error',
          'data': 'user is blocked'
        })
    }
    else{
      if (error) {
        const result = {}
        result['status'] = 'error'
        result['data'] = error.sqlMessage
        response.send(result)
      } else if (users.length == 0) {
        // there is no user matching the criteria
        const result = {}
        result['status'] = 'error'
        result['data'] = 'invalid Email id'
        response.send(result)
      } else {
        if(users[0].password === password){
          setCount()
          const result = {}
          result['status'] = 'success'
          result['data'] = users[0]
          response.send(result)
        }
        else{
          if(users[0].count < 5){
            count = users[0].count + 1
            incrementCount(count)
            response.send({
              'status':'error',
              'data': 'invalid password count = ' + count
            })
          }
          else{
            blockUser()
          }
          
        }
      }

    }
  })
})

////////////////////////////GET All USER DETAILS///////////////////////////////////////////////
router.get('/list', (request, response) => {
  
  const statement = `
  select * from users;
  `
  const connection = db.openConnection()
  connection.query(statement, (error, records) => {
    connection.end()
    if (records.length > 0) {
      const result = {}
      result['status'] = 'success'
      result['data'] = records
      response.send(result)
    } else if (error) {
      const result = {}
      result['status'] = 'error'
      result['data'] = error.sqlMessage
      response.send(result)
    }
  })
})

////////////////////////////GET specific USER DETAILS///////////////////////////////////////////////
router.get('/profile/:id', (request, response) => {
  const { id } = request.params
  const statement = `
  select * from users where userId = '${id}' ;
  `
  const connection = db.openConnection()
  connection.query(statement, (error, records) => {
    connection.end()
    if (records.length === 1) {
      response.send({
        'status':'success',
        'data':records[0]
      })
    } else if(error){
      response.send({
        'status':'error',
        'data':error.sqlMessage
      })
    }
     else {
      response.send({
        'status':'success',
        'data':'user does not exist'
      })
    }
  })
})



//////////////Delete user////////////////
router.delete('/delete/:id', (request, response) => {
  const { id } = request.params
  console.log(id)
  const statement = `
    delete from users    
    where
    userId = ${id}
  `

  const connection = db.openConnection()
  connection.query(statement, (error, result) => {
    connection.end()

    if(error){
      response.send({
        'status':'error',
        'data':error.sqlMessage
      })
    }
    else{
      response.send({
        'status':'success',
        'data':'user deleted successfully'
      })
    }
  })
})

//////////////UPDATE userdetails////////////////
router.put('/updateUser/:id', (request, response) => {
  const {name,email,password } = request.body
  const { id } = request.params


  const statement = `
    update users
    set 
    name = '${name}', 
    email = '${email}',
    password = '${password}'
    where
    userid = ${id}
  `

  const connection = db.openConnection()
  connection.query(statement, (error, result) => {
    connection.end()
    if(error){
      response.send({
        'status':'error',
        'data':error.sqlMessage
      })
    }
    else{
      response.send({
        'status':'success',
        'data':'user updated successfully'
      })
    }

  })
})
 
// used to export the router which has all the apis added
module.exports = router
