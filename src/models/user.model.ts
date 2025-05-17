import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hasheada
},{
    timestamps:true
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Solo si la contraseña fue cambiada
  const salt = await bcrypt.genSalt(10);           // Genera un "salt"
  this.password = await bcrypt.hash(this.password, salt); // Hashea la contraseña
  next(); // Continúa con el guardado
});
export const User = model("User", userSchema);
