export const genrateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken()
  const cookiName = user.role === 'Admin' ? 'adminToken' : 'patientToken'
  res
    .status(statusCode)
    .cookie(cookiName, token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 1000),
      httpOnly:true
    })
    .json({
      success: true,
      message,
      user,
      token,
    })
}
