import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [logged, setLogged] = useState(sessionStorage.getItem("auth_token") ?? false);
  const [setting, setSetting] = useState({});

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
    <AuthContext.Provider value={{ logged, setLogged, setting, setSetting }}>
      {children}
    </AuthContext.Provider>
  );
}
