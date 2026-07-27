import { verifyToken } from '../utils/auth.js'

const authenticate = (req, res, next) => {
  const token = req.headers.authorization
  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const decoded = verifyToken(token.split(' ')[1])
    req.user = decoded 
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid Token' })
  }
}

export default authenticate