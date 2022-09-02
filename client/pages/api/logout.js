import { serialize } from "cookie";

export default async (req, res) => {
  const expired = 0;

  try {
    res.setHeader("Set-Cookie", [
      serialize("r", "", {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: expired,
      }),
      serialize("f", "", {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: expired,
      }),
      serialize("h", "", {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: expired,
      }),
    ]);

    res.status(200).json({
      status: "Success",
      message: "Success logout",
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: error.message,
    });
  }
};
