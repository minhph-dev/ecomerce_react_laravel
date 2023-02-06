import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const auth = getAuth();
  const [user, setUser] = useState({});
  const [setting, setSetting] = useState({});
  const [logged, setLogged] = useState(
    sessionStorage.getItem("auth_token") ?? false
  );

  useEffect(() => {
    const unsubcribed = auth.onIdTokenChanged((user) => {
      console.log("[From AuthProvider]", { user });
      if (user?.uid) {
        const data = {
          name: user.displayName,
          email: user.email,
          googleId: user.uid,
          password: "",
        };
        axios.get("/sanctum/csrf-cookie").then((response) => {
          axios.post(`/api/login-google`, data).then((res) => {
            if (res.data.status === 200) {
              sessionStorage.setItem("auth_token", res.data.token);
              sessionStorage.setItem("auth_name", res.data.username);
              setUser(user);
              setLogged(true);
              swal("Success", res.data.message, "success");
              navigate("/");
            }
          });
        });
      }
    });

    return () => {
      unsubcribed();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let isMounted = true;
    axios.get(`/api/settings`).then((res) => {
      if (isMounted) {
        if (res.data.status === 200) {
          setSetting(res.data.setting);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [setSetting]);

  return (
    <AuthContext.Provider
      value={{ logged, setLogged, setting, setSetting, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
