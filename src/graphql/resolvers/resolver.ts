import bcrypt from "bcryptjs";
import { User } from "../../models/user.model";

export const resolvers = {
  Mutation: {
    registerUser: async (_: any, { input }: any) => {
      const { username, firstName, lastName, email, password } = input;

      // Verifica si el correo o usuario ya existen
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        throw new Error("Ya existe un usuario con ese correo o nombre de usuario.");
      }

      // Encripta la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        firstName,
        lastName,
        email,
        password: hashedPassword,
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
  },
};
