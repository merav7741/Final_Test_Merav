const isViewer = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  if (req.user.role !== 'viewer') {
    return res.status(403).json({
      message: 'Access denied: Viewers only'
    })
  }

  next()
}

module.exports = { isViewer }