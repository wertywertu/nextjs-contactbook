"use server";
import { redirect } from "next/navigation";
import axios from "axios";
import { UserType } from "../_types/user";
import { deleteSession, setSession } from "../_lib/session";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const loginAction = async (formData: FormData) => {
    try {
        const response = await axios.get(
            `${API_URL}/users`,
            {
                params: {
                    name: formData.get("name"),
                    password: formData.get("password"),
                },
            }
        );
        const user: UserType = response.data[0];
        if (!user) throw new Error("Invalid Credentials");
        await setSession({ name: user.name, email: user.email, id: user.id });
    } catch (error) {
        console.error(error);
        throw new Error("Failed to login");
    }
    redirect("/contact");
};

export const registerAction = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        const checkResponse = await axios.get(`${API_URL}/users`, { params: { name } });
        if (checkResponse.data.length > 0) throw new Error("User with this name already exists");

        const emailCheck = await axios.get(`${API_URL}/users`, { params: { email } });
        if (emailCheck.data.length > 0) throw new Error("Email already registered");

        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password,
        };

        await axios.post(`${API_URL}/users`, newUser);

    } catch (error) {
        console.error(error);
        throw new Error("Failed to register");
    }
    redirect("/login");
};

export const logoutAction = async() => {
    await deleteSession();
    redirect("/login");
};
