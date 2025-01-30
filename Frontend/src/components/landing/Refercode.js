// import React, { useState, useEffect } from "react";
// import "./refercode.css";
// import { Col, Row } from "react-bootstrap";
// import Header from "../Layout/Header";
// import Footer from "../Layout/Footer";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// const ReferCode = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [referCode, setReferCode] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [contactNumber, setContactNumber] = useState("");
//   const [email, setEmail] = useState("");
//   const [referType, setReferType] = useState("Loan");
//   const [loanType, setLoanType] = useState("");
//   const [error, setError] = useState('');
//   const [inputValue, setInputValue] = useState('');
//   const { id } = useParams();
//   const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
//   useEffect(() => {
//     if (id) {
//       setReferCode(id);
//     }
//   }, [id]);
//   const handleInputChange = (e) => {
//     const inputValue = e.target.value;
//     const alphanumericValue = inputValue.replace(/[^A-Za-z0-9]/g, "");
//     setReferCode(alphanumericValue.slice(0, 11));
//   };

//   // const handleSubmit = async () => {
//   //   if (referCode.length < 11) {
//   //     alert("Please enter at least a 6-character referral code.");
//   //     return;
//   //   }

//   //   const userId = localStorage.getItem("id");

//   //   try {
//   //     const response = await fetch(`${API_URL}/api/referrals/addCode`, {
//   //       method: "POST",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify({
//   //         category: categoryTitle,
//   //         subCategory: subCategory?.title,
//   //         reward: subCategory?.rewards,
//   //         userId,
//   //         referCode,
//   //         firstName,
//   //         lastName,
//   //         contactNumber,
//   //         email,
//   //         referType,
//   //         loanType,
//   //         insuranceType,
//   //         cibilType,
//   //       }),
//   //     });

//   //     if (response.ok) {
//   //       alert("Referral code submitted successfully!");
//   //       navigate("/user/rewards");
//   //     } else {
//   //       alert("Failed to submit referral code.");
//   //     }
//   //   } catch (error) {
//   //     alert("Error: Unable to submit referral code.");
//   //   }
//   // };
//   const handleSubmit = async (e) => {
//     // Check for referral code length
//     if (referCode.length < 6) {
//       alert("Please enter at least a 6-character referral code.");
//       return;
//     }
//     e.preventDefault();
//       if (!inputValue) {
//         setError('This field is required');
//       } else {
//         setError('');
//         // Continue form submission logic
//         console.log('Form submitted', inputValue);
//       }
    
//     try {
//       const response = await fetch("http://localhost:5000/signup/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           firstName,
//           lastName,
//           contactNumber,
//           email,
//           referType,
//           loanType,
//           referCode,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success("Registration successful!", { autoClose: 2000 });
//         setTimeout(() => {
//           navigate("/user/rewards");
//         }, 2000);
//       } else {
//         console.error("Backend Error:", data);
//         toast.error(data.error || "Failed to register.");
//       }
//     } catch (error) {
//       console.error("Network or Server Error:", error);
//       toast.error("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div>
//       <Header />
//       <ToastContainer />
//       <div className="refer-parent">
//         <div className="refer-containers">
//           <div className="refer-cards">
//             <Row className="refer-firstrow px-5 py-2">
//               <Col
//                 className="refer-firstcol px-1 py-2"
//                 lg={6}
//                 md={12}
//                 sm={12}
//                 xs={12}
//               >
//                 <div className="referral-left animate-slide-in-left">
//                   <h1 className="refer-headings">
//                     Enter Your Referral Code and Login
//                   </h1>

//                   {/* First and Last Name */}
//                   <Row style={{ marginBottom: "15px" }}>
//                     <Col lg={6} md={6} sm={12}>
//                       <label>First Name</label>
//                       <input
//                         type="text"
//                         className="refer-input"
//                         value={firstName}
//                         onChange={(e) => setFirstName(e.target.value)}
//                         placeholder="First Name"
//                         required
//                       />
//                        {error && <span style={{ color: 'red' }}>{error}</span>}
//                     </Col>
//                     <Col lg={6} md={6} sm={12}>
//                       <label>Last Name</label>
//                       <input
//                         type="text"
//                         className="refer-input"
//                         value={lastName}
//                         onChange={(e) => setLastName(e.target.value)}
//                         placeholder="Last Name"
//                         required
//                       />
//                         {error && <span style={{ color: 'red' }}>{error}</span>}
//                     </Col>
//                   </Row>

//                   {/* Contact and Email */}
//                   <Row style={{ marginBottom: "15px" }}>
//                     <Col lg={6} md={6} sm={12}>
//                       <label>Contact Number</label>
//                       <input
//                         type="text"
//                         className="refer-input"
//                         value={contactNumber}
//                         onChange={(e) => setContactNumber(e.target.value)}
//                         placeholder="Contact Number"
//                         required
//                       />
//                       {error && <span style={{ color: 'red' }}>{error}</span>}
//                     </Col>
//                     <Col lg={6} md={6} sm={12}>
//                       <label>Email</label>
//                       <br />
//                       <input
//                         type="email"
//                         className="refer-input"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         placeholder="Email"
//                         required
//                       />{error && <span style={{ color: 'red' }}>{error}</span>}
//                     </Col>
//                   </Row>

//                   {/* Referral Type Based on Refer Type */}
//                   <Row>
//                     <Col lg={6} md={6} sm={12}>
//                       <label>Referral Type</label>
//                       <select
//                         style={{ width: "180px" }}
//                         className="refer-input"
//                         value={referType}
//                         onChange={(e) => setReferType(e.target.value)}
//                         required
//                       >
//                         <option value="Loan">Loan</option>
//                         <option value="Insurance">Insurance</option>
//                         <option value="CIBIL">CIBIL</option>
//                       </select>
//                       {error && <span style={{ color: 'red' }}>{error}</span>}
//                     </Col>

//                     {/* Loan, Insurance, or CIBIL Type Based on Refer Type */}
//                     {referType === "Loan" && (
//                       <Col lg={6} md={6} sm={12}>
//                         <label>Loan Type</label>
//                         <select
//                           style={{ width: "180px" }}
//                           className="refer-input"
//                           value={loanType}
//                           onChange={(e) => setLoanType(e.target.value)}
//                           required
//                         >
//                           <option value="Home Loan">Home Loan</option>
//                           <option value="Business Loan">Business Loan</option>
//                           <option value="Vechile Loan">Vechile Loan</option>
//                         </select>
//                       </Col>
//                     )}

//                     {referType === "Insurance" && (
//                       <Col lg={6} md={6} sm={12}>
//                         <label>Insurance Type</label>
//                         <select
//                           style={{ width: "180px" }}
//                           className="refer-input"
//                           value={loanType}
//                           onChange={(e) => setLoanType(e.target.value)}
//                           required
//                         >
//                           <option value="Health Insurance">
//                             Health Insurance
//                           </option>
//                           <option value="Life Insurance">Life Insurance</option>
//                           <option value="Vehicle Insurance">
//                             Vehicle Insurance
//                           </option>
//                         </select>
//                       </Col>
//                     )}

//                     {referType === "CIBIL" && (
//                       <Col lg={6} md={6} sm={12}>
//                         <label>CIBIL Type</label>
//                         <select
//                           style={{ width: "180px" }}
//                           className="refer-input"
//                           value={loanType}
//                           onChange={(e) => setLoanType(e.target.value)}
//                           required
//                         >
//                           <option value="Monthly Plan">Monthly Plan</option>
//                           <option value="Quarterly Plan">Quarterly Plan</option>
//                           <option value="Half Yearly Plan">
//                             Half Yearly Plan
//                           </option>
//                           <option value="Annual Plan">Annual Plan</option>
//                         </select>
//                         {error && <span style={{ color: 'red' }}>{error}</span>}
//                       </Col>
//                     )}
//                   </Row>

//                   {/* Referral Code Input */}
//                   <Row style={{ marginBottom: "15px" }}>
//                     <Col lg={6} md={6} sm={12}>
//                       <label>Referral Code</label>
//                       <input
//                         type="text"
//                         className="refer-input"
//                         value={referCode}
//                         maxLength={11}
//                         onChange={handleInputChange}
//                         placeholder="Enter code"
//                         required
//                       />
//                      {error && <span style={{ color: 'red' }}>{error}</span>}
//                     </Col>

//                     <Col lg={6} md={6} sm={12}>
//                       <button
//                         className="learn-more-button"
//                         onClick={handleSubmit}
//                       >
//                         Submit
//                       </button>
//                     </Col>
//                   </Row>
//                 </div>
//               </Col>

//               <Col
//                 className="refer-secondcol px-3 py-2"
//                 lg={6}
//                 md={12}
//                 sm={12}
//                 xs={12}
//               >
//                 <img
//                   src="https://cdni.iconscout.com/illustration/premium/thumb/online-file-sharing-illustration-download-in-svg-png-gif-formats--document-business-meeting-activities-pack-people-illustrations-5858310.png"
//                   alt="Refer Code"
//                 />
//               </Col>
//             </Row>

//             <div className="refer-svgpath">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 650 300"
//                 preserveAspectRatio="none"
//                 className="svg-path"
//               >
//                 <defs>
//                   <linearGradient
//                     id="gradient"
//                     x1="0%"
//                     y1="0%"
//                     x2="0%"
//                     y2="100%"
//                   >
//                     <stop offset="0%" stopColor="#1e3a8a" />
//                     <stop offset="50%" stopColor="#2563eb" />
//                     <stop offset="100%" stopColor="#3b82f6" />
//                   </linearGradient>
//                 </defs>
//                 <path
//                   d="M 650 0 L 650 300 L 225 300 Q 450 300 265 300 C 395 130 310 80 445 0 L 650 0 Z"
//                   fill="url(#gradient)"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default ReferCode;
import React, { useState, useEffect } from "react";
import "./refercode.css";
import { Col, Row } from "react-bootstrap";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form"; // Import react-hook-form

const ReferCode = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm(); // Hook Form methods
  const location = useLocation();
  const navigate = useNavigate();
  const [referCode, setReferCode] = useState("");
  const [referType, setReferType] = useState("Loan");
  const [loanType, setLoanType] = useState("");
  const [error, setError] = useState('');
  const { id } = useParams();
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    if (id) {
      setReferCode(id);
    }
  }, [id]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const alphanumericValue = inputValue.replace(/[^A-Za-z0-9]/g, "");
    setReferCode(alphanumericValue.slice(0, 11));
  };

  const onSubmit = async (data) => {
    // Validate referral code length
    if (referCode.length < 6) {
      alert("Please enter at least a 6-character referral code.");
      return;
    }

    try {
      // Construct the body of the API request
      const response = await fetch(`${API_URL}/signup/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,  // Include the form data from react-hook-form
          referCode, // Include the refer code manually
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.success("Registration successful!", { autoClose: 2000 });
        setTimeout(() => {
          navigate("/user/rewards");
        }, 2000);
      } else {
        if (responseData.error === "Email is already in use") {
          toast.error("The email is already in use. Please use a different email.");
        } else {
          toast.error(responseData.error || "Failed to register.");
        }
      }
    } catch (error) {
      console.error("Network or Server Error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <ToastContainer />
      <div className="refer-parent">
        <div className="refer-containers">
          <div className="refer-cards">
            <Row className="refer-firstrow px-5 py-2">
              <Col className="refer-firstcol px-1 py-2" lg={6} md={12} sm={12} xs={12}>
                <div className="referral-left animate-slide-in-left">
                  <h1 className="refer-headings">Enter Your Referral Code and Login</h1>

                  {/* Form */}
                  <form onSubmit={handleSubmit(onSubmit)}>

                    {/* First and Last Name */}
                    <Row style={{ marginBottom: "15px" }}>
                      <Col lg={6} md={6} sm={12}>
                        <label>First Name</label>
                        <input
                          type="text"
                          className="refer-input"
                          {...register("firstName", { required: "First name is required" })}
                          placeholder="First Name"
                        />
                        {errors.firstName && <span style={{ color: 'red' }}>{errors.firstName.message}</span>}
                      </Col>
                      <Col lg={6} md={6} sm={12}>
                        <label>Last Name</label>
                        <input
                          type="text"
                          className="refer-input"
                          {...register("lastName", { required: "Last name is required" })}
                          placeholder="Last Name"
                        />
                        {errors.lastName && <span style={{ color: 'red' }}>{errors.lastName.message}</span>}
                      </Col>
                    </Row>

                    {/* Contact and Email */}
                    <Row style={{ marginBottom: "15px" }}>
                      <Col lg={6} md={6} sm={12}>
                        <label>Contact Number</label>
                        <input
                          type="text"
                          className="refer-input"
                          {...register("contactNumber", { required: "Contact number is required" })}
                          placeholder="Contact Number"
                        />
                        {errors.contactNumber && <span style={{ color: 'red' }}>{errors.contactNumber.message}</span>}
                      </Col>
                      <Col lg={6} md={6} sm={12}>
                        <label>Email</label>
                        <input
                          type="email"
                          className="refer-input"
                          {...register("email", { required: "Email is required" })}
                          placeholder="Email"
                        />
                        {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
                      </Col>
                    </Row>

                    {/* Referral Type Based on Refer Type */}
                    <Row>
                      <Col lg={6} md={6} sm={12}>
                        <label>Referral Type</label>
                        <select
                          className="refer-input"
                          {...register("referType", { required: "Referral type is required" })}
                          onChange={(e) => setReferType(e.target.value)}
                        >
                          <option value="Loan">Loan</option>
                          <option value="Insurance">Insurance</option>
                          <option value="CIBIL">CIBIL</option>
                        </select>
                        {errors.referType && <span style={{ color: 'red' }}>{errors.referType.message}</span>}
                      </Col>

                      {/* Loan, Insurance, or CIBIL Type Based on Refer Type */}
                      {referType === "Loan" && (
                        <Col lg={6} md={6} sm={12}>
                          <label>Loan Type</label>
                          <select
                            className="refer-input"
                            {...register("loanType", { required: "Loan type is required" })}
                          >
                            <option value="Home Loan">Home Loan</option>
                            <option value="Business Loan">Business Loan</option>
                            <option value="Vehicle Loan">Vehicle Loan</option>
                          </select>
                        </Col>
                      )}

                      {referType === "Insurance" && (
                        <Col lg={6} md={6} sm={12}>
                          <label>Insurance Type</label>
                          <select
                            className="refer-input"
                            {...register("loanType", { required: "Insurance type is required" })}
                          >
                            <option value="Health Insurance">Health Insurance</option>
                            <option value="Life Insurance">Life Insurance</option>
                            <option value="Vehicle Insurance">Vehicle Insurance</option>
                          </select>
                        </Col>
                      )}

                      {referType === "CIBIL" && (
                        <Col lg={6} md={6} sm={12}>
                          <label>CIBIL Type</label>
                          <select
                            className="refer-input"
                            {...register("loanType", { required: "CIBIL type is required" })}
                          >
                            <option value="Monthly Plan">Monthly Plan</option>
                            <option value="Quarterly Plan">Quarterly Plan</option>
                            <option value="Half Yearly Plan">Half Yearly Plan</option>
                            <option value="Annual Plan">Annual Plan</option>
                          </select>
                        </Col>
                      )}
                    </Row>

                    {/* Referral Code Input */}
                    <Row style={{ marginBottom: "15px" }}>
                      <Col lg={6} md={6} sm={12}>
                        <label>Referral Code</label>
                        <input
                          type="text"
                          className="refer-input"
                          value={referCode}
                          maxLength={11}
                          onChange={handleInputChange}
                          placeholder="Enter code"
                        />
                      </Col>
                      <Col lg={6} md={6} sm={12}>
                        <button className="learn-more-button" type="submit">
                          Submit
                        </button>
                      </Col>
                    </Row>
                  </form>
                </div>
              </Col>

              <Col className="refer-secondcol px-3 py-2" lg={6} md={12} sm={12} xs={12}>
                <img
                  src="https://cdni.iconscout.com/illustration/premium/thumb/online-file-sharing-illustration-download-in-svg-png-gif-formats--document-business-meeting-activities-pack-people-illustrations-5858310.png"
                  alt="Refer Code"
                />
              </Col>
            </Row>

            <div className="refer-svgpath">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 650 300" preserveAspectRatio="none" className="svg-path">
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1e3a8a" />
                    <stop offset="50%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
                <path
                  d="M 650 0 L 650 300 L 225 300 Q 450 300 265 300 C 395 130 310 80 445 0 L 650 0 Z"
                  fill="url(#gradient)"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReferCode;
