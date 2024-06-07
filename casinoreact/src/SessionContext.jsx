import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { usersController } from "./controllers";
import delete_cookie from "./functions/deleteCookie";

export const SessionContext = createContext(null);

export const useSession = () => useContext(SessionContext);

const SessionContextProvider = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [userState, setUserState] = useState("loading"); // loading - logged - not-logged

  const protectedPath = ["/poker-holdem", "/rooms", "/wallet", "/points", "/blackjack", "/poker", "/roulette"];

  const getUser = async () => {
    if (!userData) setUserState("loading");
    const result = await usersController.getUserData();
    if (result?.error) {
      setUserState("not-logged");
      setUserData(null);
    } else {
      setUserState("logged");
      setUserData(result);
    }
  };

  const login = async (data) => {
    setUserState("loading");
    const result = await usersController.login(data);
    if (result?.error) {
      console.log({error: result.error})
      setUserData(null);
    } else getUser();
    console.log({inContext: result})
    return result
  };

  const logout = async () => {
    setUserState("loading");
    const result = await usersController.logout();
    delete_cookie("crypgoUser");
    setUserState("not-logged");
    setUserData(null);
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (userState !== "loading") {
      if (!userData && protectedPath.includes(pathname)) {
        console.log("RETURNING");
        navigate("/");
      }
    }
  }, [pathname, userState]);

  return (
    <SessionContext.Provider
      value={{
        userData,
        userState,
        login,
        logout,
        getUser,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
