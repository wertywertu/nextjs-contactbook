import axios from "axios";
import { ContactType } from "../_types/contact";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getContacts = async(userId: string) => {
    const response = await axios.get(`${API_URL}/contacts?userId=${userId}`);
    return response.data
};

export const getContactById = async(id: string) => {
    const response = await axios.get(`${API_URL}/contacts/${id}`);
    return response.data
};

export const createContact = async (contact: ContactType) => {
  try {
    await axios.post(`${API_URL}/contacts`, contact);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create contact");
  }
};

export const updateContact = async (id: string, contact: ContactType) => {
  try {
    await axios.put(`${API_URL}/contacts/${id}`, contact);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update contact");
  }
};

export const deleteContact = async (id: string) => {
  try {
    await axios.delete(`${API_URL}/contacts/${id}`);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete contact");
  }
};
