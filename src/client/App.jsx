import { Outlet, NavLink } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/footer";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div className="relative">
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
