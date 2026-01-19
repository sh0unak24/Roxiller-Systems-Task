import axios from "axios";
import type { Role, UserSignupBody } from "../types/types";


const BASE_URL = "http://localhost:3000/api/v1";

export async function signup(
  body: UserSignupBody,
  role: Role
) {
    let newRole = ""
    if(role === "USER"){
       newRole = "user" 
    } else if(role === "OWNER"){
        newRole = "storeOwner"
    } else{
        newRole = "systemAdministrator"
    }
  try {
    const res = await axios.post(
      `${BASE_URL}/${newRole}/signup`,
      body
    );
    return res.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Signup failed"
    );
  }
}

type LoginBody = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
  message: string;
};

export async function login(
  body: LoginBody,
  role: Role
): Promise<LoginResponse> {
  try {
    let newRole1 = ""
    if(role === "USER"){
       newRole1 = "user" 
    } else if(role === "OWNER"){
        newRole1 = "storeOwner"
    } else{
        newRole1 = "systemAdministrator"
    }
    const res = await axios.post<LoginResponse>(
      `${BASE_URL}/${newRole1}/login`,
      body
    );

    return res.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Login failed"
    );
  }
}