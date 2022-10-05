import { useContext } from "react"
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom"
import { AuthContext } from "./context/AuthContext"
import { Home } from "./Pages/Home"
import { Login } from "./Pages/Login"
import { Register } from "./Pages/Register"
interface protectedProps {
  children: React.ReactNode
}
function App() {
  const currentUser = useContext(AuthContext)
  const ProtectedRoute = ({ children }: protectedProps) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }
    return <>{children}</>
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
