import React from "react";
import MyForm from "./components/MyForms/MyForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Singin from "./components/MyForms/Singin";
import PageNoteFound from "./components/PageNoteFound";
// import Header from "./components/Header";
import HeaderNav from "./components/MyNavbars/HeaderNav";
// import { useSelector } from "react-redux";
// import Spiner from "./components/Spiner";
import { PublicRoute } from "./components/PublicRoute";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Home } from "./components/Home";
import AddProduct from "./components/Products/AddProduct";
import { ProductList } from "./components/Products/ProductList";
import Logout from "./components/Logout";
import CreateUser from "./components/UserComponets/CreateUser";

function App() {
  // const { loading } = useSelector(state => state.alert);
  return (
    <Router future={{ v7_relativeSplatPath: true }}>
      <HeaderNav/>
      {/* {!token ? <HeaderNav /> : <HeaderNav2 />} */}
      {
        <Routes>
          <Route path="/registration" element={
            <PublicRoute>
              <MyForm />
            </PublicRoute>

          } />
          <Route path="/singIn" element={
            <PublicRoute>
              <Singin />
            </PublicRoute>

          } />

          <Route path="/logout" element={
            <PublicRoute>
              <Logout/>
            </PublicRoute>

          } />

          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>

          } />
          <Route path="/addProduct" element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          } />

          <Route path="/listProduct" element = {
            <ProtectedRoute>
              <ProductList/>
            </ProtectedRoute>
          } />
          <Route path="*" element={<PageNoteFound />} />
          <Route path="/createuser" element = {<CreateUser/>}/>
        </Routes>
        
      }
    </Router>
  );
}

export default App;
