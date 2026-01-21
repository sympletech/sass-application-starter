import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import PublicLayout from './layouts/public/PublicLayout.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/login/Login.jsx'
import Signup from './pages/signup/Signup.jsx'
import Reactivate from './pages/reactivate/Reactivate.jsx'
import About from './pages/About.jsx'
import Legal from './pages/Legal.jsx'

import LoggedInLayout from './layouts/logged-in/LoggedInLayout.jsx'
import Dashboard from './pages/dashboard/Dashboard.jsx'
import Profile from './pages/profile/Profile.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="reactivate" element={<Reactivate />} />
          <Route path="about" element={<About />} />
          <Route path="legal" element={<Legal />} />
        </Route>
        <Route path="/@" element={<LoggedInLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
