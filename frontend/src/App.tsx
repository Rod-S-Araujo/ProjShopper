import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header";
import HomePage from "./Pages/Homepage";
import Footer from "./components/footer";
import Dashboard from "./Pages/Dashboard";
import Estimate from "./Pages/Estimate";
import Confirm from "./Pages/Confirm";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/estimate" Component={Estimate} />
        <Route path="/confirm" Component={Confirm} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
