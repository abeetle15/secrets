export function validateSignupInput(req, res, next) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password.length < 7) {
    return res
      .status(400)
      .json({ message: "Password has to be at least 7 characters long" });
  }

  next();
}
