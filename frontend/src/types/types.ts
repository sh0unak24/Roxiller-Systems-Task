/* ========= ROLES ========= */
export type Role = "USER" | "OWNER" | "ADMIN";

/* ========= BASE ========= */
export interface BaseAuthBody {
  email: string;
  password: string;

}

/* ========= SIGNUP ========= */
export interface UserSignupBody extends BaseAuthBody {
  name : string,
  address: string;
}

export interface OwnerSignupBody extends BaseAuthBody {
  name: string;
}

export interface AdminSignupBody extends BaseAuthBody {
  name: string;
}

/* ========= LOGIN ========= */
export interface LoginBody extends BaseAuthBody {}

/* ========= UNION (ADVANCED) ========= */
export type SignupBody =
  | UserSignupBody
  | OwnerSignupBody
  | AdminSignupBody;