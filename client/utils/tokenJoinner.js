import { AES, enc } from "crypto-js";

export const rfsJoinner = ({ romeo, fanta, hotel }) => {
  const r = !!romeo && AES.decrypt(romeo, process.env.NEXT_PUBLIC_AES_KEY).toString(enc.Utf8);
  const f = !!fanta && AES.decrypt(fanta, process.env.NEXT_PUBLIC_AES_KEY).toString(enc.Utf8);
  const h = !!hotel && AES.decrypt(hotel, process.env.NEXT_PUBLIC_AES_KEY).toString(enc.Utf8);

  const rfh = [r, f, h];
  const rfhToken = rfh.join(".");

  return rfhToken;
};

export const acsJoinner = ({ alpha, charlie, sierra }) => {
  const a = !!alpha && AES.decrypt(alpha, process.env.NEXT_PUBLIC_AES_KEY).toString(enc.Utf8);
  const c = !!charlie && AES.decrypt(charlie, process.env.NEXT_PUBLIC_AES_KEY).toString(enc.Utf8);
  const s = !!sierra && AES.decrypt(sierra, process.env.NEXT_PUBLIC_AES_KEY).toString(enc.Utf8);

  const acs = [a, c, s];
  const acsToken = acs.join(".");

  return acsToken;
};
