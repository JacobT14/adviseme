import Hapi from '@hapi/hapi'

const BasicAuth = require('hapi-auth-basic')
import { _getTenantDb } from './db/tenantDb'
import { tenantRoutes } from './routes/tenants'
import { userRoutes } from './routes/users/users'
import { getUserById } from './routes/users/get-user-by-id'
import { hashPassword } from './routes/helpers/hash-password'
import Inert from '@hapi/inert'
import Vision from '@hapi/vision'
import HapiSwagger from 'hapi-swagger'

const init = async () => {

  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
  })
  await _getTenantDb()
  await server.register({
    plugin: require('hapi-auth-basic'),
  })

  server.auth.strategy('simple', 'basic', {
    validate: async (request, username, password) => {
      const user = await getUserById({ userId: username })
      const { password: hashed } = user
      const hash = hashPassword(password)
      if (hash == hashed) {
        return {
          isValid: true,
          credentials: {
            userId: 'myId!',
            permissionLevel: 'PRIMARY_ADMIN',
            tenantId: 1,
          },
        }
      } else {
        return {
          isValid: false,

        }
      }
    },
  })

  const convertRoute = (route) => {

    if (route.options) {
      route.options.tags = ['api']
    } else {
      route.options = {
        tags: ['api'],
      }
    }

    server.route(route)
  }

  server.auth.default('simple')
  tenantRoutes.forEach(route => convertRoute(route))
  userRoutes.forEach(route => convertRoute(route))

  const swaggerOptions = {
    info: {
      title: 'API Documentation',
      version: '0.0.0',
    },
  }

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ])

  await server.start()

  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {

  console.log(err)
  process.exit(1)
})

init()