import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing";
import TimeOut from "./pages/TimeOut";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import Layout from "./components/Layout";
import TourDates from "./pages/TourDates";
import About from "./pages/About";
import EPK from "./pages/EPK";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";
import Blog from "./pages/Blog";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Landing />} /> */}
          {/* <Route path="/" element={<TimeOut />} /> */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path="tour-dates" element={<TourDates />} />
            <Route path="about" element={<About />} />
            <Route path="epk" element={<EPK />} />
            <Route path="contact" element={<Contact />} />
            <Route path="shop" element={<Shop />} />
            <Route path="blog" element={<Blog />} />
          </Route>

          {/* Routes that don't use the Layout (no header) */}
          {/* <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
