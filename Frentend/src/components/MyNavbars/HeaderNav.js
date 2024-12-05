// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import { Link } from 'react-router-dom';
// import { NavDropdown } from 'react-bootstrap';

// function HeaderNav() {
//   return (

//     <Navbar expand="lg" className=" mb-4 fs-5 fw-bold">
//       <Container fluid >
//         <Navbar.Toggle aria-controls="basic-navbar-nav" className='ms-auto' />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//             <Nav.Link as={Link} to="/" className='text-primary'>Home</Nav.Link>
//             <Nav.Link as={Link} to="/" className='text-primary'>Contact us</Nav.Link>
//             <NavDropdown title="Product" id="basic-nav-dropdown">
//               <NavDropdown.Item href as={Link} to="/addProduct">Add Product</NavDropdown.Item>
//               <NavDropdown.Item href as={Link} to="/allProduct">All Product</NavDropdown.Item>
//               <NavDropdown.Item href as = {Link} to = "/updateProduct">Update Product</NavDropdown.Item>
//             </NavDropdown>
//           </Nav>
//           <Nav className="ms-auto">
//             <Nav.Link as={Link} to="/registration" className='text-primary'>Registration</Nav.Link>
//             <Nav.Link as={Link} to="/singIn" className='text-primary'>Login</Nav.Link>
//           </Nav>
//         </Navbar.Collapse>

//       </Container>
//     </Navbar>

//   );
// }

// export default HeaderNav;


// import React from 'react';
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import { Link } from 'react-router-dom';
// import { NavDropdown } from 'react-bootstrap';

// function HeaderNav({ isAuthenticated, handleLogout }) {
//   return (
//     <Navbar expand="lg" className="mb-4 fs-5 fw-bold">
//       <Container fluid>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-auto" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//             <Nav.Link as={Link} to="/" className="text-primary">Home</Nav.Link>
//             <Nav.Link as={Link} to="/" className="text-primary">Contact us</Nav.Link>
//             <NavDropdown title="Product" id="basic-nav-dropdown">
//               <NavDropdown.Item as={Link} to="/addProduct">Add Product</NavDropdown.Item>
//               <NavDropdown.Item as={Link} to="/allProduct">All Product</NavDropdown.Item>
//               <NavDropdown.Item as={Link} to="/updateProduct">Update Product</NavDropdown.Item>
//             </NavDropdown>
//           </Nav>
//           <Nav className="ms-auto">
//             {!isAuthenticated && (
//               <>
//                 <Nav.Link as={Link} to="/registration" className="text-primary">Registration</Nav.Link>
//                 <Nav.Link as={Link} to="/singIn" className="text-primary">Login</Nav.Link>
//               </>
//             )}
//             {isAuthenticated && (
//               <Nav.Link as="button" onClick={handleLogout} className="text-primary">Logout</Nav.Link>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default HeaderNav;



import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import  "./headerStyle.css"
import { Link } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "../../Redux/Fetures/Authslice";

function HeaderNav() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = useSelector((state)=>state.auth.token);
  const dispatch = useDispatch();

  
  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [token]);
  const handleLogout = () => {
    const confirm = window.confirm("logout");
    if(!confirm) return;
    dispatch(clearToken());
    setIsAuthenticated(false);
  };

  return (
    <Navbar expand="lg" className="mb-4 fs-5 fw-bold">
      <Container fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-auto" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAuthenticated ? 
         (   <>
            <Nav.Link as={Link} to="/" className="text-primary">Home</Nav.Link>
            <Nav.Link as={Link} to="/" className="text-primary">Contact us</Nav.Link>
            <NavDropdown title="Product" id="basic-nav-dropdown" className="custom-dropdown">
              <NavDropdown.Item as={Link} to="/addProduct">Add Product</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/listProduct">List Product</NavDropdown.Item>
              {/* <NavDropdown.Item as="button" onClick={ProductList}>List Product</NavDropdown.Item> */}

              <NavDropdown.Item as={Link} to="/updateProduct">Update Product</NavDropdown.Item>
            </NavDropdown>
            </>)
            :("")
            }
          </Nav>
          
          <Nav className="ms-auto">
            {!isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/registration" className="text-primary">Registration</Nav.Link>
                <Nav.Link as={Link} to="/singIn" className="text-primary">Login</Nav.Link>
              </>
            ) : (
              <Nav.Link as="button" onClick={handleLogout} className="text-primary">Logout</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderNav;
