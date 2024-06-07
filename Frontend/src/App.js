import "./App.css";
import React, { useState, useEffect } from "react";
import Home from "./pages/home/Home";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import AuthContainer from "./pages/auth/AuthContainer";
import UseAuthContext from "./hooks/UseAuthContext";
import NavbarComponent from "./components/navbar/NavbarComponent";
import Contact from "./pages/contact/Contact";
import Categories from "./pages/categories/Categories";
import Loading from "./components/loading/Loading";
import SubCategories from "./pages/subCategories/SubCategories";
import { DataProvider } from "./context/DataContext";
function App() {
  const { user, loading } = UseAuthContext();
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    // Wait for the authentication context to be loaded
    if (!loading) {
      setAuthLoaded(true);
    }
  }, [loading]);

  if (!authLoaded) {
    // Render a loading state, or redirect to a loading page
    return <Loading />;
  }
  return (
    <div className="App">
      <DataProvider>
        {user && <NavbarComponent />}
        <Routes>
          <Route
            path="/project"
            element={user ? <Home /> : <Navigate to="/signin" />}
          />
          <Route
            path="/signin"
            element={!user ? <AuthContainer /> : <Navigate to="/" />}
          />
          <Route
            path="/contact"
            element={user ? <Contact /> : <Navigate to="/signin" />}
          />
          <Route
            path="/"
            element={user ? <Categories /> : <Navigate to="/signin" />}
          />
          <Route
            path="/sub-category"
            element={user ? <SubCategories /> : <Navigate to="/signin" />}
          />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </DataProvider>
    </div>
  );
}

export default App;
