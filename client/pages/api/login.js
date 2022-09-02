import { serialize } from "cookie";
import { AES } from "crypto-js";
import jwtDecode from "jwt-decode";
import { api } from "../../utils/api";

export default async (req, res) => {
  try {
    const { data } = await api().post("/auth/login", req.body);

    const tokenExpired = new Date(jwtDecode(data.data.token).exp * 1000);
    const expired = Math.round((tokenExpired - new Date().getTime()) / 1000);

    const tokens = data.data.token.split(".");

    const r = AES.encrypt(tokens[0], process.env.NEXT_PUBLIC_AES_KEY).toString();
    const f = AES.encrypt(tokens[1], process.env.NEXT_PUBLIC_AES_KEY).toString();
    const h = AES.encrypt(tokens[2], process.env.NEXT_PUBLIC_AES_KEY).toString();

    res.setHeader("Set-Cookie", [
      serialize("romeo", r, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: expired,
      }),
      serialize("fanta", f, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: expired,
      }),
      serialize("hotel", h, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: expired,
      }),
    ]);

    delete data.data.token;
    res.status(200).json(data);
  } catch (error) {
    const { response } = error;
    return response
      ? res.status(response.status).json(response.data)
      : res.status(400).json({ message: error.message });
  }
};
