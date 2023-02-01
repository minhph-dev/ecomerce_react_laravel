import Dashboard from "./../components/admin/dashboard/Dashboad";
import AddCategory from "./../components/admin/category/AddCategory";
import EditCategory from "./../components/admin/category/EditCategory";
import ViewCategory from "./../components/admin/category/ViewCategory";
import AddBrand from "./../components/admin/brand/AddBrand";
import ViewBrand from "./../components/admin/brand/ViewBrand";
import EditBrand from "./../components/admin/brand/EditBrand";
import AddColor from "./../components/admin/color/AddColor";
import ViewColor from "./../components/admin/color/ViewColor";
import AddBanner from "./../components/admin/banner/AddBanner";
import ViewBanner from "./../components/admin/banner/ViewBanner";
import EditBanner from "./../components/admin/banner/EditBanner";
import AddUser from "./../components/admin/user/AddUser";
import ViewUser from "./../components/admin/user/ViewUser";
import EditUser from "./../components/admin/user/EditUser";
import AddProduct from "./../components/admin/product/AddProduct";
import EditProduct from "./../components/admin/product/EditProduct";
import ViewProduct from "./../components/admin/product/ViewProduct";
import Order from "./../components/admin/order/Order";
import OrderDetails from "./../components/admin/order/OrderDetails";
import Setting from "./../components/admin/setting/Setting";

const privateRoutes = [
  { path: "/admin/dashboard", component: Dashboard },
  { path: "/admin/add-category", component: AddCategory },
  { path: "/admin/view-category", component: ViewCategory },
  { path: "/admin/edit-category/:id", component: EditCategory },
  { path: "/admin/add-brand", component: AddBrand },
  { path: "/admin/view-brand", component: ViewBrand },
  { path: "/admin/edit-brand/:id", component: EditBrand },
  { path: "/admin/add-color", component: AddColor },
  { path: "/admin/view-color", component: ViewColor },
  { path: "/admin/add-banner", component: AddBanner },
  { path: "/admin/view-banner", component: ViewBanner },
  { path: "/admin/edit-banner/:id", component: EditBanner },
  { path: "/admin/add-user", component: AddUser },
  { path: "/admin/view-user", component: ViewUser },
  { path: "/admin/edit-user/:id", component: EditUser },
  { path: "/admin/add-product", component: AddProduct },
  { path: "/admin/view-product", component: ViewProduct },
  { path: "/admin/edit-product/:id", component: EditProduct },
  { path: "/admin/orders", component: Order },
  { path: "/admin/orders/:id", component: OrderDetails },
  { path: "/admin/settings", component: Setting },
];

export default privateRoutes;
