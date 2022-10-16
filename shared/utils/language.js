export default ({
  type, /** server or client */
  req
}) => {
  if (!type) throw Error('< MISSING PARAM TYPE : client or server >')

  if (type === 'server' && req) {
    console.log('< Language server side >')
    const { cookies } = req


  }

  if (type === 'client' && typeof document !== 'undefined') {
    console.log('< Language client side >')
  }

  return 'teste'
}