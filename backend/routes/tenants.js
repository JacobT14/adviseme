import express from 'express'
const router = express.Router();
import Tenant from '../db/models/tenant'
import Boom from '@hapi/boom'
export const tenantRoutes = [
  {
    method: "GET",
    path: "/tenants/{tenantId}",
    handler: async (request, h) => {
      const tenantId = request.params.tenantId
      const tenant = await Tenant.findByPk(tenantId)
      return tenant
    }
  }
]


router.get('/:tenantId', async function(req, res) {
  const tenantId = req.params.tenantId
  const tenant = await Tenant.findByPk(tenantId)
  res.send(tenant);
})

router.post('/create-tenant', function(req, res, next) {
  console.log({req})
  const {adminEmail, companyName} = req.body

  const tenant = {
    tenantId: "newTenantId",
    name: companyName,
    primaryAdmin: {
      tenantId: "testId",
      userId: adminEmail,
      permissionLevel: "PRIMARY_ADMIN",
    }
  }
  res.send(tenant);
})

export default router
