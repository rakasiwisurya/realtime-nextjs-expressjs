import { AES, enc } from "crypto-js";
import { NextResponse } from "next/server";

export function middleware(req) {
  const { url, cookies } = req;
  const rCookie = cookies.get("romeo");
  const fCookie = cookies.get("fanta");
  const hCookie = cookies.get("hotel");

  const r = !!rCookie && AES.decrypt(rCookie, process.env.NEXT_PUBLIC_AES_KEY).toString(enc.Utf8);
  const f = !!fCookie && AES.decrypt(fCookie, process.env.NEXT_PUBLIC_AES_KEY).toString(enc.Utf8);
  const h = !!hCookie && AES.decrypt(hCookie, process.env.NEXT_PUBLIC_AES_KEY).toString(enc.Utf8);

  if (rCookie && fCookie && hCookie && url.includes("/login")) {
    const rfh = [r, f, h];
    const rfhToken = rfh.join(".");
    return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL);
  }

  if ((!rCookie || !fCookie || !hCookie) && url === `${process.env.NEXT_PUBLIC_BASE_URL}/`) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/login`);
  }
}
