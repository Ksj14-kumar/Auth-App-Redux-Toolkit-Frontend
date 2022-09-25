import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import About from './Pages/About';
import Login from './Components/Login';
import Registration from './Components/Registration';
import Home from './Pages/Home';
import ProtectedRoutes from './Pages/ProtectedRoutes';
import Contact from './Pages/Contact';
import Error from './Pages/Error';
function App() {
  const Access_Token = localStorage.getItem("access_token")
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Registration />} />
          <Route element={<ProtectedRoutes user={Access_Token} />}>
            <Route path='/about' element={<About />} />
            <Route path='/news' element={<Contact />} />
          </Route>
          <Route path='*' element={< Error />} />
          <Route path='*/*/**' element={< Error />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
