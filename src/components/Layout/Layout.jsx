import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <main className="overflow-x-hidden">
        <Navbar />
        <Outlet />
        <Footer />
      </main>
    </>
  );
};

export default Layout;
