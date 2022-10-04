import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Home } from "./Pages/Home"
import { Login } from "./Pages/Login"
import { Register } from "./Pages/Register"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
