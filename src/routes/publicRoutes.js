import Home from "./../components/frontend/pages/Home";
import Contact from "./../components/frontend/pages/Contact";
import Trending from "./../components/frontend/pages/Trending";
import Featured from "./../components/frontend/pages/Featured";
import Login from "./../components/frontend/auth/Login";
import Register from "./../components/frontend/auth/Register";
import ViewCategory from "./../components/frontend/collections/ViewCategory";
import ViewProduct from "./../components/frontend/collections/ViewProduct";
import ProductDetail from "./../components/frontend/collections/ProductDetails";
import Cart from "./../components/frontend/pages/Cart";
import WishList from "./../components/frontend/pages/WishList";
import Checkout from "./../components/frontend/pages/Checkout";
import Thankyou from "./../components/frontend/pages/Thankyou";
import Profile from "./../components/frontend/pages/Profile";
import ChangePassword from "./../components/frontend/pages/ChangePassword";
import Order from "./../components/frontend/pages/Order";
import OrderDetails from "./../components/frontend/pages/OrderDetails";
import Search from "./../components/frontend/pages/Search";

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/contact", component: Contact },
  { path: "/trending", component: Trending },
  { path: "/featured", component: Featured },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/collections", component: ViewCategory },
  { path: "/collections/:slug", component: ViewProduct },
  { path: "/collections/:category/:product", component: ProductDetail },
  { path: "/cart", component: Cart },
  { path: "/wishlist", component: WishList },
  { path: "/checkout", component: Checkout },
  { path: "/thank-you", component: Thankyou },
  { path: "/profile", component: Profile },
  { path: "/change-password", component: ChangePassword },
  { path: "/orders", component: Order },
  { path: "/orders/:orderId", component: OrderDetails },
  { path: "/search/:productname", component: Search },

];

export default publicRoutes;
