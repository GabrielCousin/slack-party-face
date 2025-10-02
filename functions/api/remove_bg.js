import fetch from 'node-fetch'
import FormData from 'form-data'

export async function onRequestPost(context) {
  const { env, request } = context

  try {
    // Get the image data from the request
    const imageData = await request.arrayBuffer()

    const formData = new FormData()
    formData.append('image_file', new Blob([imageData]), 'image.png')
    formData.append('size', 'auto')

    const res = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      body: formData,
      headers: {
        'X-Api-Key': env.REMOVE_BG_API_KEY,
      },
    })

    if (res.ok) {
      const processedImage = await res.arrayBuffer()
      return new Response(processedImage, {
        status: 200,
        headers: {
          'Content-Type': 'image/png',
        },
      })
    }

    const data = await res.json()
    const message = data.errors?.[0]?.title || 'Unknown error occurred'
    return new Response(message, {
      status: res.status,
      headers: {
        'Content-Type': 'text/plain',
      },
    })
  } catch (e) {
    console.error('Error processing image:', e.message)
    return new Response('Something broke!', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    })
  }
}

export const onRequestOptions = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Max-Age': '86400',
    },
  })
}
