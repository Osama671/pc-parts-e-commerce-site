export const authMiddleware = (req, resp, next) => {
  const token = req.headers.authorization
  if (token && token.split(' ')[0] === 'Basic') {
    var base64 = token.split(' ')[1]
    var username = atob(base64).split(':')[0]
    req.userId = username
  }

  next()
}
