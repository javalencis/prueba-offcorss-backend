import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../models/user.model";

const SECRET_KEY = process.env.JWT_SECRET || "supersecreto123"; 
export const resolvers = {
  Mutation: {
    registerUser: async (_: any, { input }: any) => {
      const { username, firstName, lastName, email, password } = input;

      const existingUser = await User.findOne({
        $or: [{ email }, { username }],
      });

      if (existingUser) {
        throw new Error(
          "Ya existe un usuario con ese correo o nombre de usuario."
        );
      }

      const newUser = new User({
        username,
        firstName,
        lastName,
        email,
        password,
      });

      await newUser.save();

      return {
        id: newUser._id,
        username: newUser.username,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      };
    },

    loginUser: async (_: any, { input }: any) => {
      const { email, password } = input;

      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("Usuario no encontrado.");
      }

      const passwordValid = await bcrypt.compare(password, user.password);
      if (!passwordValid) {
        throw new Error("Contraseña incorrecta.");
      }

      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          username: user.username,
        },
        SECRET_KEY,
        { expiresIn: "7d" }
      );

      return {
        token,
        user: {
          id: user._id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          createdAt: user.createdAt,
        },
      };
    },
    updateUser: async (_: any, { input }: any, context: any) => {
      const token = context.req.headers.authorization?.split(" ")[1];
      if (!token) throw new Error("No autenticado.");

      try {
        const decoded: any = jwt.verify(token, SECRET_KEY);
        const userId = decoded.id;

        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { $set: input },
          { new: true } 
        );

        if (!updatedUser) {
          throw new Error("Usuario no encontrado.");
        }

        return {
          id: updatedUser._id,
          username: updatedUser.username,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          email: updatedUser.email,
          createdAt: updatedUser.createdAt,
        };
      } catch (err) {
        console.error(err);
        throw new Error("Error actualizando el usuario.");
      }
    },
  },
};
