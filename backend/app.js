import express from 'express'
import Users from './routes/users/users'
import Tenants from './routes/tenants'
import { _getTenantDb } from './db/tenantDb'
import bodyParser from 'body-parser'
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use('/users', Users)
app.use('/tenants', Tenants)
app.use(function (err, req, res) {
  console.log({err})
  if (err.code)
  {
    res.status(500).send({
      code: err.code
    })
  }
  else
  {
    res.status(500).send('Something broke!')
  }
})


app.listen(port, async () => {
  // init db to check for tables
  await _getTenantDb()
  console.log("STARTED!")
})