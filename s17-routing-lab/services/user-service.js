import { User } from "../models/User.js";

export const createUser = async ({ username, name, email, password }) => {
    return User.create({
        username,
        name,
        email,
        password,
    });
};

export const findUser = async (username) => {
    const userFound = await User.find({ username }).catch((dbError) => console.error(dbError.message));
    return userFound;
};

export const findUsers = async (name) => {
    return await (await User.find({ name }))
    .sort({ name: 1 })
    .catch((dbError) => console.error(dbError.message));
};
