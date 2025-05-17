import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../models/user.model";

const SECRET_KEY = process.env.JWT_SECRET || "supersecreto123"; // mejor usa env

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
  },
};
