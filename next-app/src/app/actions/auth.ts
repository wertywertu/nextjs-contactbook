"use server";
import { redirect } from "next/navigation";
import axios from "axios";
import bcrypt from "bcryptjs";
import { UserType } from "../_types/user";
import { deleteSession, setSession } from "../_lib/session";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const loginAction = async (formData: FormData) => {
    try {
        const name = formData.get("name") as string;
        const password = formData.get("password") as string;

        const response = await axios.get(`${API_URL}/users`, {
            params: { name },
        });

        const user: UserType = response.data[0];
        if (!user || !user.password) throw new Error("Invalid credentials");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Invalid credentials");


        await setSession({ name: user.name, email: user.email, id: user.id });
    } catch (error) {
        console.error("Login error:", error);
        throw new Error("Failed to login");
    }

    redirect("/contact");
};

export const registerAction = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        const nameCheck = await axios.get(`${API_URL}/users`, { params: { name } });
        if (nameCheck.data.length > 0) throw new Error("User with this name already exists");

        const emailCheck = await axios.get(`${API_URL}/users`, { params: { email } });
        if (emailCheck.data.length > 0) throw new Error("Email already registered");

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password: hashedPassword,
        };

        await axios.post(`${API_URL}/users`, newUser);
    } catch (error) {
        console.error("Registration error:", error);
        throw new Error("Failed to register");
    }

    redirect("/login");
};

export const logoutAction = async () => {
    await deleteSession();
    redirect("/login");
};
