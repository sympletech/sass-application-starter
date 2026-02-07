import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import '../theme.css'
import './index.css'

import PublicLayout from './layouts/public/public-layout.jsx'
import Home from './pages/home/home.jsx'
import Login from './pages/login/login.jsx'
import Signup from './pages/signup/signup.jsx'
import Reactivate from './pages/reactivate/reactivate.jsx'
import About from './pages/about/about.jsx'
import Legal from './pages/legal/legal.jsx'

import LoggedInLayout from './layouts/logged-in/logged-in-layout.jsx'
import Dashboard from './pages/dashboard/dashboard.jsx'
import Profile from './pages/profile/profile.jsx'
import AdminUsers from './pages/admin/admin-users.jsx'
import ScrollToTop from './components/scroll-to-top/scroll-to-top.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
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
          <Route path="admin/users" element={<AdminUsers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
