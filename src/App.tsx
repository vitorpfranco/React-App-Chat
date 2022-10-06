import { useContext } from "react"
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom"
import { AuthContext } from "./context/AuthContext"
import { useTheme } from "./hooks/useTheme"
import { Home } from "./Pages/Home"
import { Login } from "./Pages/Login"
import { Register } from "./Pages/Register"
import { MdDarkMode } from 'react-icons/md'
import { BsFillLightbulbFill } from 'react-icons/bs'


interface protectedProps {
  children: React.ReactNode
}
function App() {
  const themeContext = useTheme()
  const currentUser = useContext(AuthContext)
  const ProtectedRoute = ({ children }: protectedProps) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }
    return <>{children}</>
  }
  return (
    <>    <div className="absolute top-8 right-12 cursor-pointer">
      {themeContext?.theme === 'light' ?
        <MdDarkMode size={30} onClick={() => themeContext.setTheme('dark')} />
        :
        <BsFillLightbulbFill size={30} className="text-white" onClick={() => themeContext?.setTheme('light')} />}
    </div>
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
