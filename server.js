const express = require('express')
const routes = require('./routes')
const bodyParser = require('body-parser')
const { Product } = require('./models')

const PORT = process.env.PORT || 3000
const app = express()

app.use(bodyParser.json())

app.use('/api', routes)

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`)
})

// app.get('/', (req, res) => {
//   res.send('This is root!')
// })

// app.get('/products', async (req, res) => {
//   const result = await Product.findAll()
//   res.json(result)
// })

// app.get('/products/:id', async (req, res) => {
//   try {
//     const { id } = req.params
//     const result = await Product.findByPk(id)
//     res.json(result)
//   } catch (error) {
//     console.log(error)
//     res.send('Product not found')
//   }
// })
