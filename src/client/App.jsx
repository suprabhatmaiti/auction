import { Outlet, NavLink } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { ToastContainer } from "react-toastify";
import useAuth from "./hooks/useAuth";
function App() {
  const { isAdmin } = useAuth();
  return (
    <div className="relative">
      <ToastContainer />
      <ScrollToTop />
      {!isAdmin && <Header />}
      <Outlet />
      {!isAdmin && <Footer />}
    </div>
  );
}

export default App;
