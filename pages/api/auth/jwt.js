import { getToken } from "next-auth/jwt";
import axios from "axios";
import cookie from "cookie";

export default async function jwt(req, res) {
  try {
    const jwt = await getToken({ req, secret: process.env.SECRET });

    const cookies = cookie.parse(req.headers.cookie || "");
    if (!cookies.token && jwt) {
      const resData = await axios.post('http://3.111.148.12:4020/auth/google', { ...jwt }, { withCredentials: true })
      const cookieData = resData.headers['set-cookie'];
      res.setHeader('Set-Cookie', cookieData);
    }

    res.send(jwt);

  } catch (e) {
    console.log('er', e)
    res.send(null);

  }
  // console.log(jwt, "jwt is--------------")
}
