import { Outlet, NavLink } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/footer";

function App() {
  return (
    <div className="relative">
      <Header/>
      <Outlet />
      <Footer/>
    </div>
  );
}

export default App;
