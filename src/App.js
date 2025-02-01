import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import { CartProvider } from "./components/ContextReducer.js";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup.js";
function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/loginuser" element={<Login />} />
            <Route exact path="/createuser" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
