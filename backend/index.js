import Hapi from '@hapi/hapi'
const BasicAuth = require('hapi-auth-basic')
import { _getTenantDb } from './db/tenantDb'
import { tenantRoutes } from './routes/tenants'
import { userRoutes } from './routes/users/users'
import { getUserById } from './routes/users/get-user-by-id'
import { hashPassword } from './routes/helpers/hash-password'

const init = async () => {

  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  });
  await _getTenantDb();
  await server.register({
    plugin: require('hapi-auth-basic')
  })

  server.auth.strategy('simple', 'basic', {
    validate: async (request, username, password) => {
      // TODO
      const user = await getUserById({userId: username})
      const {password: hashed} = user
      const hash = hashPassword(password)
      if(hash == hashed) {
        return {
          isValid: true,
          credentials: {
            userId: "myId!",
            permissionLevel: "PRIMARY_ADMIN",
            tenantId: 1
          }
        }
      }
        else return {
          isValid: false

      }
    }
  })
  server.auth.default('simple');
  tenantRoutes.forEach(route => server.route(route))
  userRoutes.forEach(route => server.route(route))

  await server.start();


  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

  console.log(err);
  process.exit(1);
});

init();