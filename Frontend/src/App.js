import "./App.css";
import React, { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Route, Routes, Navigate } from "react-router-dom";

import Home from "./components/dashboard/pages/home/Home";
import Login from "./components/auths/Login";
import Landing from "./components/landing/Home";
import Register from "./components/auths/Register";
import GetAllLoans from "./components/dashboard/pages/loans/ClientLoans";
import AddLoan from "./components/dashboard/pages/loans/AddLoan";
import AddBorrower from "./components/dashboard/pages/borrowers/AddBorrower";
import Borrower from "./components/dashboard/pages/borrowers/Borrower";
import Borrowers from "./components/dashboard/pages/borrowers/Borrowers";
import EditLoan from "./components/dashboard/pages/loans/EditLoan";
import EditBorrower from "./components/dashboard/pages/borrowers/EditBorrower";
import AddLoans from "./components/dashboard/pages/loans/AddLoans";
import AddPayments from "./components/dashboard/pages/payments/AddPayments";
import Payments from "./components/dashboard/pages/payments/AllPayments";
import Message from "./components/dashboard/pages/messages/Message";
import EmailPage from "./components/dashboard/pages/messages/EmailPage";
import PaymentLoansInfo from "./components/dashboard/pages/payments/PaymentLoanInfo";
import AdminPage from "./components/dashboard/admin/AdminPage";
import AddAdmin from "./components/dashboard/admin/AddAdmin";
import UserDetails from "./components/dashboard/user/UserDetails";
import About from "./components/landing/About";
import ContactUs from "./components/landing/ContactUs";
import Dashboard from "./components/dashboard/user/Dahboard";
import Credit from "./components/landing/CreditScore";
import Insurance from "./components/landing/InsuranceFrom";
import Carrier from "./components/landing/Carrier";
import AdminDashboard from "./components/dashboard/admin/dashboard";
import UserList from "./components/dashboard/admin/UserList";
import TaxForm from "./components/landing/TaxForm";
import LoanPage from "./components/landing/LoanPage";
import InsuranceCards from "./components/landing/InsurancePage";
// import InsuranceFormProfileTab from "./components/landing/InsuranceForm/InsuranceFormProfileTab"
import TaxCards from "./components/landing/TaxPage";
import LoanForm from "./components/landing/LoanForm/LoanFormProfileTab";
import InsuranceForm from "./components/landing/InsuranceForm/InsuranceFormProfileTab";

import LoanDashboard from "./components/dashboard/Employee/LoanReview";
import EmployeeDashboard from "./components/dashboard/Employee";
import { EmployeeRoutes } from "./components/dashboard/Employee/EmployeeRoutes";
import Admin from "./components/dashboard/admin";
import { AdminRoutes } from "./components/dashboard/admin/AdminRoutes";
import { LoanAdminRoutes } from "./components/dashboard/admin/LoanAdmin/LoanAdminRoutes";

import User from "./components/dashboard/user/Index";
import { UserRoutes } from "./components/dashboard/user/UserRoutes";
import AdminLogin from "./components/dashboard/admin/AdminLogin";
import ErrorMessage from "./components/Layout/ErrorMessage";
import LoanAdmin from "./components/dashboard/admin/LoanAdmin/LoanAdmin";
import TaxAdmin from "./components/dashboard/admin/TaxAdmin/TaxAdmin";
import { TaxAdminRoutes } from "./components/dashboard/admin/TaxAdmin/TaxAdminRoutes";
import InsuranceAdmin from "./components/dashboard/admin/InsuranceAdmin/InsuranceAdmin";
import { InsuranceAdminRoutes } from "./components/dashboard/admin/InsuranceAdmin/InsuranceAdminRoutes";
import StockMarketAdmin from "./components/dashboard/admin/StockMarket/StockMarketAdmin";
import { StockMarketRoutes } from "./components/dashboard/admin/StockMarket/StockMarketRoutes";

import PersonalPlan from "./components/landing/PersonalPlan";
import Refer from "./components/landing/Refer";

const ProtectedRoute = ({ Component, allowedUserTypes }) => {
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!allowedUserTypes.includes(userType || role)) {
    return <Navigate to="/" />;
  }

  return <Component />;
};

const ProtectedRoutes = ({ Component }) => {
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");

  console.log("userType", token);
  if (token) {
    return <Component />;
  } else {
    return <Navigate to="/login" />;
  }
};

function App() {
  return (
    <div className="App">
      <Fragment>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<ContactUs />} />
          <Route path="/refer" element={<Refer />} />
          <Route path="*" element={<ErrorMessage />} />
          <Route path="/insuranceform" element={<Insurance />} />
          {/* <Route path="/insurance" element={<InsuranceFormProfileTab />} /> */}
          <Route path="/personalplan" element={<PersonalPlan />} />
          <Route path="/taxform" element={<TaxForm />} />
          <Route
            path="/loan"
            element={<ProtectedRoutes Component={LoanPage} />}
          />

          <Route
            path="/insurancepage"
            element={<ProtectedRoutes Component={InsuranceCards} />}
          />

          <Route
            path="/taxpage"
            element={<ProtectedRoutes Component={TaxCards} />}
          />
          <Route
            path="/loanform"
            element={<ProtectedRoutes Component={LoanForm} />}
          />
          <Route
            path="/insurancepolicy"
            // element={<ProtectedRoute Component={InsuranceForm} />}
            element={<InsuranceForm />}
          />

          {/* REGISTER */}
          <Route exact path="/register" element={<Register />} />

          <Route exact path="/addAdmin" element={<AddAdmin />} />

          {/* LOGIN */}
          <Route exact path="/login" element={<Login />} />

          <Route exact path="/userProfile" element={<UserDetails />} />

          {/* HOME */}
          <Route exact path="/home" element={<Home />} />
          {/* <Route exact path="/user" element={<Dashboard />} /> */}

          <Route exact path="/borrowers" element={<Borrowers />} />

          {/* BORROWER */}
          <Route exact path="/borrower/:id" element={<Borrower />} />

          {/* EDIT BORROWER */}
          <Route exact path="/editBorrower/:id" element={<EditBorrower />} />

          {/* ADD BORROWER */}
          <Route exact path="/addBorrower" element={<AddBorrower />} />

          {/* LOANS */}
          <Route exact path="/loans" element={<GetAllLoans />} />

          {/* ADD LOAN (BORROWER PAGE) */}
          <Route exact path="/addLoan/:id" element={<AddLoan />} />

          {/* ADD LOANS (LOANS PAGE) */}
          <Route exact path="/addLoan" element={<AddLoans />} />

          {/* EDIT LOANS */}
          <Route exact path="/editLoan/:id" element={<EditLoan />} />

          {/* PAYMENTS */}
          <Route exact path="/payments" element={<Payments />} />

          {/* ADD PAYMENT (BORROWER PAGE) */}
          <Route exact path="/addPayments/:id" element={<PaymentLoansInfo />} />

          <Route
            exact
            path="/payment/:client_id/:loan_id"
            element={<PaymentLoansInfo />}
          />

          {/* MESSAGES */}
          <Route exact path="/emailClient" element={<EmailPage />} />
          <Route
            path="/credit"
            element={<ProtectedRoutes Component={Credit} />}
          />
          <Route path="/loanreview" element={<LoanDashboard />} />
          <Route path="/carrier" element={<Carrier />} />

          <Route
            path="/employee"
            element={
              <ProtectedRoute
                Component={EmployeeDashboard}
                allowedUserTypes={["employee"]}
              />
            }
          >
            {EmployeeRoutes.map(({ path, element: Ele }, index) => (
              <Route key={index} path={path} element={Ele} />
            ))}
          </Route>
          {/* <Route path="/employee" element={<EmployeeDashboard />}>
            {EmployeeRoutes.map(({ path, element: Ele }, index) => (
              <Route key={index} path={path} element={Ele} />
            ))}
          </Route> */}

          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute Component={Admin} allowedUserTypes={["admin"]} />
            }
          >
            {AdminRoutes.map(({ path, element: Ele }, index) => (
              <Route key={index} path={path} element={Ele} />
            ))}
          </Route>

          <Route
            path="/adminLoan"
            element={
              <ProtectedRoute
                Component={LoanAdmin}
                allowedUserTypes={["LoanEmployee"]}
              />
            }
          >
            {LoanAdminRoutes.map(({ path, element: Ele }, index) => (
              <Route key={index} path={path} element={Ele} />
            ))}
          </Route>
          {/* <Route path="/adminLoan" element={<LoanAdmin />}>
            {LoanAdminRoutes.map(({ path, element: Ele }, index) => (
              <Route key={index} path={path} element={Ele} />
            ))}
          </Route> */}

          <Route
            path="/employeeTax"
            element={
              <ProtectedRoute
                Component={TaxAdmin}
                allowedUserTypes={["TaxEmployee"]}
              />
            }
          >
            {TaxAdminRoutes.map(({ path, element: Ele }, index) => (
              <Route key={index} path={path} element={Ele} />
            ))}
          </Route>
          {/* <Route path="/employeeTax" element={<TaxAdmin />}>
            {TaxAdminRoutes.map(({ path, element: Ele }, index) => (
              <Route key={index} path={path} element={Ele} />
            ))}
          </Route> */}

          <Route
            path="/employeeInsurance"
            element={
              <ProtectedRoute
                Component={InsuranceAdmin}
                allowedUserTypes={["InsuranceEmployee"]}
              />
            }
          >
            {InsuranceAdminRoutes.map(({ path, element: Ele }, index) => (
              <Route key={index} path={path} element={Ele} />
            ))}
          </Route>
          {/* <Route path="/employeeInsurance" element={<InsuranceAdmin />}>
            {InsuranceAdminRoutes.map(({ path, element: Ele }, index) => (
              <Route key={index} path={path} element={Ele} />
            ))}
          </Route> */}

          <Route
            path="/employeeStockMarket"
            element={
              <ProtectedRoute
                Component={StockMarketAdmin}
                allowedUserTypes={["stockMarket"]}
              />
            }
          >
            {StockMarketRoutes.map(({ path, element: Ele }, index) => (
              <Route key={index} path={path} element={Ele} />
            ))}
          </Route>
          {/* <Route path="/employeeStockMarket" element={<StockMarketAdmin />}>
            {StockMarketRoutes.map(({ path, element: Ele }, index) => (
              <Route key={index} path={path} element={Ele} />
            ))}
          </Route> */}

          <Route
            path="/user"
            element={
              <ProtectedRoute Component={User} allowedUserTypes={["user"]} />
            }
          >
            {UserRoutes.map(({ path, element: Ele }, index) => (
              <Route key={index} path={path} element={Ele} />
            ))}
          </Route>
          {/* <Route path="/user" element={<User />}>
            {UserRoutes.map(({ path, element: Ele }, index) => (
              <Route key={index} path={path} element={Ele} />
            ))}
          </Route> */}
        </Routes>
      </Fragment>
    </div>
  );
}

export default App;
