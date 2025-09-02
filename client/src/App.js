import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./view/Home"
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './view/Header';
import Edit from './view/Edit';
import Create from './view/Create';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/update/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
