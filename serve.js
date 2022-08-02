/* eslint-env node */

const port = process.env.PORT || '8081'
const REMOVE_BG_API_KEY = process.env.REMOVE_BG_API_KEY

const express = require('express')
const http = require('http')
const path = require('path')
const fetch = require('node-fetch')
const multer = require('multer')
const cors = require('cors')
const FormData = require('form-data')

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const app = express()

app.use(cors())
app.use(express.static(path.join(__dirname, 'dist')))
app.set('port', port)

const server = http.createServer(app)
server.listen(port, () => console.log(`Running on localhost: ${port}`))

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.post('/remove_bg', upload.single('image'), async (req, res) => {
  const formData = new FormData()
  formData.append('image_file', req.file.buffer)
  formData.append('size', 'auto')

  try {
    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'post',
      body: formData,
      headers: {
        'X-Api-Key': REMOVE_BG_API_KEY,
      },
    })

    if (response.ok) {
      const blob = await response.blob()
      const ab = await blob.arrayBuffer()
      res.send(Buffer.from(ab))
      return
    }

    const data = await response.json()
    const message = data.errors[0].title
    res.status(response.status).send(message)
  } catch (e) {
    console.log('err', e.message)
    res.status(500).send('Something broke!')
  }
})
