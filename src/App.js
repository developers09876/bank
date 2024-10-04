import "./App.css";
import React, { Fragment, useState } from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Login from "./components/auths/Login";
import Landing from "./components/landing/Home";

import Register from "./components/auths/Register";

import AdminPage from "./components/dashboard/admin/AdminPage";
import About from "./components/landing/About";
import ContactUs from "./components/landing/ContactUs";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };
  return (
    <Router>
      <div className="App  ">
        {/* <Topbar /> */}
        <div>
          <Fragment>
            <Routes>
              {/* LANDING */}
              <Route exact path="/" element={<Landing />}></Route>
              <Route path="/about" element={<About/>}/>
              <Route path="/contact" element={<ContactUs/>}/>

              {/* REGISTER */}
              <Route
                exact
                path="/register"
                element={
                  
                    <Register />
                 
                }
              ></Route>

              {/* <Route
                exact
                path='/addAdmin'
                element={
                  isAuthenticated ? (
                    <AddAdmin setAuth={setAuth} />
                  ) : (
                    <Navigate to='/admin' />
                  )
                }
              ></Route> */}

              {/* LOGIN */}
              <Route
                exact
                path="/login"
                element={
                  
                    <Login setAuth={setAuth} />
              
                }
                
              ></Route>

              {/* LOGIN */}
              {/* <Route
                exact
                path="/admin"
                element={
                  isAuthenticated ? (
                    <AdminPage setAuth={setAuth} />
                  ) : (
                    <Navigate to="/home" />
                  )
                }
              ></Route> */}
            </Routes>
          </Fragment>
        </div>
      </div>
    </Router>
  );
}

export default App;
