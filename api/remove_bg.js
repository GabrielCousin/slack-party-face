import fetch from 'node-fetch'
import FormData from 'form-data'

const REMOVE_BG_API_KEY = process.env.REMOVE_BG_API_KEY

export default async function handler(request, response) {
  const formData = new FormData()
  formData.append('image_file', request.body)
  formData.append('size', 'auto')

  try {
    const res = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'post',
      body: formData,
      headers: {
        'X-Api-Key': REMOVE_BG_API_KEY,
      },
    })

    if (res.ok) {
      const blob = await res.blob()
      const ab = await blob.arrayBuffer()
      response.status(200).send(Buffer.from(ab))
      return
    }

    const data = await res.json()
    const message = data.errors[0].title
    response.status(res.status).send(message)
  } catch (e) {
    console.log('err', e.message)
    response.status(500).send('Something broke!')
  }
}
