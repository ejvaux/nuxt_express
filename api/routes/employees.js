const { Router } = require('express')

const router = Router()

const tools = require('../tools');

const oracledb = require('oracledb')
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTIONSTRING
}

const users = [
  { name: 'Alexandre' },
  { name: 'Pooya' },
  { name: 'Sébastien' }
]

async function getallEmployee() {
  let conn

  try {
    conn = await oracledb.getConnection(config)

    const result = await conn.execute(
      'select * from EJ_TEST order by id asc',
    )
    console.log(result)
    console.log('Tools return: ',tools.jsonConvert(result))
    
    return result
  } catch (err) {
    console.log('Ouch!', err)
  } finally {
    if (conn) { // conn assignment worked, need to close
      await conn.close()
      /* console.log('Disconnected') */
    }
  }
}

async function getEmployee(id) {
  let conn

  try {
    conn = await oracledb.getConnection(config)

    const result = await conn.execute(
      'select * from EJ_TEST where ID = :id',
      [id]
    )
    return result.rows[0]
  } catch (err) {
    console.log('Ouch!', err)
  } finally {
    if (conn) { // conn assignment worked, need to close
      await conn.close()
      /* console.log('Disconnected') */
    }
  }
}

router.get('/employees', function (req, res, next) {  
    tools.test()
    let emps = getallEmployee();
    emps.then(function(result) {
      console.log('This is the result',result) // "Some User token"
      res.send(tools.jsonConvert(result))
    }) 
})

router.get('/employees/:id', function (req, res, next) {
    const id = parseInt(req.params.id)
    let emp = getEmployee(id)
    emp.then(function(result) {
      console.log('This is the result',result) // "Some User token"
      res.send(result)
    })
  })

  module.exports = router