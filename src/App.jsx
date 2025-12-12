import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import Layout from "./components/Layout/Layout.jsx";
import About from "./components/About/About.jsx";
import Services from "./components/Services/Services.jsx";
import Contact from "./components/Contact/Contact.jsx";
import Vacancies from "./components/Vacancies/Vacancies.jsx";
import Projects from "./components/Projects/Projects.jsx";

import SingleProject from "./components/SingleProject/SingleProject.jsx";

let routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <About /> },
      { path: "/projects/:id", element: <SingleProject /> },
      { path: "/services", element: <Services /> },
      { path: "/contact", element: <Contact /> },
      { path: "/vacancies", element: <Vacancies /> },
      { path: "/projects", element: <Projects /> },
    ],
  },
]);

const App = () => {
  return (
    <I18nextProvider>
      <RouterProvider router={routers} />
    </I18nextProvider>
  );
};

export default App;
