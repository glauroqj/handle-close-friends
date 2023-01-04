const isDevelopment = (process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'development')

const storeLog = (config) => (set, get, api) => (
  config(
    (...args) => {
      isDevelopment && console.log('\x1b[34m  < APPLYING : STORE >', args)
      set(...args)
      isDevelopment && console.log('\x1b[35m  < NEW STATE : STORE >', get())
    },
    get,
    api
  )
)

export default storeLog