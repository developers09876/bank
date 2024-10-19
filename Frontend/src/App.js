import './App.css';
import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from 'react-router-dom';

import Home from './components/dashboard/pages/home/Home';
import Login from './components/auths/Login';
import Landing from './components/landing/Home';
import Register from './components/auths/Register';
import GetAllLoans from './components/dashboard/pages/loans/ClientLoans';
import AddLoan from './components/dashboard/pages/loans/AddLoan';
import AddBorrower from './components/dashboard/pages/borrowers/AddBorrower';
import Borrower from './components/dashboard/pages/borrowers/Borrower';
import Borrowers from './components/dashboard/pages/borrowers/Borrowers';
import EditLoan from './components/dashboard/pages/loans/EditLoan';
import EditBorrower from './components/dashboard/pages/borrowers/EditBorrower';
import AddLoans from './components/dashboard/pages/loans/AddLoans';
import AddPayments from './components/dashboard/pages/payments/AddPayments';
import Payments from './components/dashboard/pages/payments/AllPayments';
import Message from './components/dashboard/pages/messages/Message';
import EmailPage from './components/dashboard/pages/messages/EmailPage';
import PaymentLoansInfo from './components/dashboard/pages/payments/PaymentLoanInfo';
import AdminPage from './components/dashboard/admin/AdminPage';
import AddAdmin from './components/dashboard/admin/AddAdmin';
import UserDetails from './components/dashboard/user/UserDetails';
import About from './components/landing/About';
import ContactUs from './components/landing/ContactUs';
import Dashboard from './components/dashboard/user/Dahboard';
import Credit from './components/landing/CreditScore';
import Insurance from './components/landing/InsuranceFrom';
import Carrier from './components/landing/Carrier';

const ProtectedRoute = ({ Component, redirectTo = "/login" }) => {
  const isAuthenticated = localStorage.getItem("token");
  // const isAuthenticated = true;
  const location = useLocation();

  return isAuthenticated ? (
    <Component />
  ) : (
    <Navigate to={redirectTo} replace state={{ from: location }} />
  );
};

function App() {
  return (
    <Router>
      <div className='App'>
        <Fragment>
          <Routes>
            {/* LANDING */}
            <Route exact path='/' element={<Landing />} />
            <Route exact path='/about' element={<About />} />
            <Route exact path='/contact' element={<ContactUs />} />
            <Route
          path="/insurance"
          element={
            <ProtectedRoute Component={Insurance} redirectTo="/login" />
          }
        />

            {/* REGISTER */}
            <Route exact path='/register' element={<Register />} />

            <Route exact path='/addAdmin' element={<AddAdmin />} />

            {/* LOGIN */}
            <Route exact path='/login' element={<Login />} />

            {/* ADMIN */}
            <Route exact path='/admin' element={<AdminPage />} />
            <Route path ='/admindashboard' element={<AdminDashboard/>}/>
            <Route path = '/userlist' element={<UserList/>}/>
            <Route exact path='/userProfile' element={<UserDetails />} />

            {/* HOME */}
            <Route exact path='/home' element={<Home />} />
            <Route exact path='/user' element={<Dashboard />} />

            <Route exact path='/borrowers' element={<Borrowers />} />

            {/* BORROWER */}
            <Route exact path='/borrower/:id' element={<Borrower />} />

            {/* EDIT BORROWER */}
            <Route exact path='/editBorrower/:id' element={<EditBorrower />} />

            {/* ADD BORROWER */}
            <Route exact path='/addBorrower' element={<AddBorrower />} />

            {/* LOANS */}
            <Route exact path='/loans' element={<GetAllLoans />} />

            {/* ADD LOAN (BORROWER PAGE) */}
            <Route exact path='/addLoan/:id' element={<AddLoan />} />

            {/* ADD LOANS (LOANS PAGE) */}
            <Route exact path='/addLoan' element={<AddLoans />} />

            {/* EDIT LOANS */}
            <Route exact path='/editLoan/:id' element={<EditLoan />} />

            {/* PAYMENTS */}
            <Route exact path='/payments' element={<Payments />} />

            {/* ADD PAYMENT (BORROWER PAGE) */}
            <Route exact path='/addPayments/:id' element={<PaymentLoansInfo />} />

            <Route exact path='/payment/:client_id/:loan_id' element={<PaymentLoansInfo />} />

            {/* MESSAGES */}
            <Route exact path='/emailClient' element={<EmailPage />} />
            <Route
          path="/credit"
          element={
            <ProtectedRoute Component={Credit} redirectTo="/login" />
          }
        />
         <Route path='/carrier' element={<Carrier/>}/>
          </Routes>
        </Fragment>
      </div>
    </Router>
  );
}

export default App;
