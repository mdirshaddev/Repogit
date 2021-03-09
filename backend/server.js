require('dotenv').config({ path: '../.env' })
const path = require('path')
const express = require('express')

const app = express()

if(process.env.NODE_ENV !== 'production'){
  app.use(express.static('../build'))
}

app.listen(process.env.PORT, () => {
  console.log(`Server is running at PORT ${process.env.PORT}`)
})