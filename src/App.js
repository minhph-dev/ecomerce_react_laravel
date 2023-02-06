import { Route, Routes } from "react-router-dom";
import FrontendLayout from "./layouts/frontend/FrontendLayout";
import MasterLayout from "./layouts/admin/MasterLayout";
import axios from "axios";
import publicRoutes from "./routes/publicRoutes";
import privateRoutes from "./routes/privateRoutes";
import Page404 from "./components/errors/Page404";
import Page403 from "./components/errors/Page403";

axios.defaults.baseURL = process.env.REACT_APP_DOMAIN;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";

axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) {
  const token = sessionStorage.getItem("auth_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

function App() {
  return (
    <Routes>
      <Route path="*" element={<Page404 />} />
      <Route path="/403" element={<Page403 />} />
      <Route path="/404" element={<Page404 />} />
      <Route path="/admin" element={<MasterLayout />}>
        {privateRoutes?.map((publicRoute, index) => {
          return (
            <Route
              key={index}
              path={publicRoute.path}
              element={<publicRoute.component />}
            />
          );
        })}
      </Route>
      <Route path="/" element={<FrontendLayout />}>
        {publicRoutes?.map((publicRoute, index) => {
          return (
            <Route
              key={index}
              path={publicRoute.path}
              element={<publicRoute.component />}
            />
          );
        })}
      </Route>
    </Routes>
  );
}

export default App;
