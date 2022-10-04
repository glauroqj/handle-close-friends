import fetch from 'node-fetch'

export default async function handler(req, res) {
  const { body } = req
  const { token } = JSON.parse(body)
  console.log('< BODY > ', token)
  /** check headers */
  if (!req.headers['x-whoiam'] || req.headers['x-whoiam'] !== 'arch') {
    res.status(401).send({
      code: 401,
      error: true,
      message: 'You shall not pass!',
      location: 'instagram-token'
    })
    return false
  }

  if (!token) {
    res.status(400).send({
      error: true,
      code: 400,
      message: 'Missing something!!',
      location: 'instagram-token'
    })
    return false
  }


  try {
    const payload = new FormData()
    payload.append('client_id', '3217961178471425')
    payload.append('client_secret', 'd14a930dc50462ab077a9b6e1024a446')
    payload.append('code', token)
    payload.append('grant_type', 'authorization_code')
    payload.append('redirect_uri', 'https://handle-close-friends.com.br:5000/auth/instagram')

    // {
    //   'client_id': '3217961178471425',
    //   'client_secret': 'd14a930dc50462ab077a9b6e1024a446',
    //   'code': String(token),
    //   'grant_type': 'authorization_code',
    //   'redirect_uri': 'https://handle-close-friends.com.br:5000/'
    // },

    const responseRaw = await fetch('https://api.instagram.com/oauth/access_token', {
      method: 'post',
      body: payload
    });

    const response = await responseRaw.json()

    console.log('< RESPONSE INSTAGRAM > ', responseRaw?.status)

    console.log('< RESPONSE > ', response)
    if (responseRaw.status === 200) {
      res.status(200).json({
        ...response
      })
    } else {
      res.status(400).json({ ...response, error: true })
    }
  } catch (e) {
    res.status(400).send({
      code: 400,
      error: true,
      message: 'error',
      location: 'instagram-token'
    })
    return false
  }
  // res.status(200).json({ name: 'John Doe' })
}
