import { HashRouter as Router, NavLink, Routes, Route } from "react-router-dom";
import './App.css';
import PizzaCreatePage from "./Components/PizzaCreatePage";
import { PizzaListPage } from "./Components/PizzaListPage";
import { PizzaSinglePage } from "./Components/PizzaSinglePage";
import { PizzaModPage } from "./Components/PizzaModPage";
import { PizzaDeletePage } from "./Components/PizzaDeletePage";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to={`/`} className="nav-link">
                <span className="nav-link">Pizzák</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/uj-pizza`} className="nav-link">
                <span className="nav-link">Új pizza</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<PizzaListPage />} />
        <Route path="/Pizza/:pizzaid" element={<PizzaSinglePage />} />
        <Route path="uj-pizza" element={<PizzaCreatePage />} />
        <Route path="mod-pizza/:pizzaid" element={<PizzaModPage />} />
        <Route path="del-pizza/:pizzaid" element={<PizzaDeletePage />} />
      </Routes>
    </Router>
  );
}

export default App;
