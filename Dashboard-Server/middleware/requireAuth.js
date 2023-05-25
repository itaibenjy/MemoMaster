const jwt = require('jsonwebtoken')
const  User = require('../models/User')

// middleware function to check if user is authenticated and pass user id to req.user
async function requireAuth(req, res, next) {

  const { authorization } = req.headers

  // authorization does not exist
  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' })
  }

  // authorization format is "Bearer <token>"
  const token = authorization.replace('Bearer ', '')

  try{
    const {_id} = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(_id).select('_id')
    next()

  } catch (error) {
    console.log(error)
    res.status(401).json({ error: 'Authorization token invalid' })
  }

}

module.exports = requireAuth

// How to use this middleware in a route:
// const requireAuth = require('../middleware/requireAuth')
// router.use(requireAuth)
// this will require authentication for all routes below this line
// to require authentication for a specific route, add requireAuth as a second argument to the route
// router.get('/api/protected', requireAuth, (req, res) => {})