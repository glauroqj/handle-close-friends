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


  // try {
  //   const responseRaw = await fetch('https://api.instagram.com/oauth/access_token', {
  //     headers: {
  //       client_id: '',
  //       client_secret: ''
  //     }
  //   });
  // } catch (e) {
  //   res.status(400).send({
  //     code: 400,
  //     error: true,
  //     message: 'error',
  //     location: 'instagram-token'
  //   })
  //   return false
  // }
  res.status(200).json({ name: 'John Doe' })
}
