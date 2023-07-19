import { Admin } from "@/models/admin.model";
import apiBase from "./base";

const login = async (mEmail: string, mPassword: string): Promise<any> => {
  const res = await apiBase.post(`${process.env.NEXT_PUBLIC_API}/auth/admin/login`, {
    mEmail,
    mPassword,
  });
  return res.data;
};

const SignUp = async (adminInfo: Admin): Promise<any> => {
  const res = await apiBase.post(`${process.env.NEXT_PUBLIC_API}/admins`, adminInfo);
  return res.data;
};

const loginApi = {
  login,
  SignUp,
};

export default loginApi;
