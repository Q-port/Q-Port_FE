import { useEffect, useMemo, useState } from "react";
import { Cookies } from "react-cookie";
import { isExpired, decodeToken } from "react-jwt";
import { removeCookieToken } from "../shared/Cookie";
const cookies = new Cookies();
const myToken = cookies.get("user_token");

const UseUser = () => {
  const [user, setUser] = useState();

  // 토큰이 만료되었다면 쿠키를 삭제한다.

  const isMyTokenIsExpired = useMemo(() => isExpired(myToken), []);
  if (isMyTokenIsExpired) removeCookieToken();

  const readUser = async () => {
    //const { data } = await instance.get("users");
    const userInfo = decodeToken(myToken);
    setUser((prev) => userInfo);
    //setUser(decodedToken(myToken));
  };

  useEffect(() => {
    if (myToken) {
      readUser();
    }
  }, []);

  return user;
};

export default UseUser;
