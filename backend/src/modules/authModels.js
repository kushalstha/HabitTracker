import User from "../../data/user.js";
import bcrypt from "bcrypt";

export async function register(userDetails) {
  const hashedPassword = await bcrypt.hash(userDetails.password, 10);

  return await User.create({
    name: userDetails.name,
    email: userDetails.email,
    password: hashedPassword,
    isAdmin: userDetails.isAdmin,
  });
}

export async function login(email, password) {
  const user = await User.findOne({ email });

  if (!user) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user.password);

  return isValid ? user : null;
}