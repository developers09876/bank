import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./RoleForm.css";
import AOS from "aos";
import "aos/dist/aos.css";
// import HeaderNavbar from "../../Components/Navbar";
import { Button, Form, Modal, Container, Row, Col } from "react-bootstrap";

const RoleForm = () => {
  const roles = [
    "Entrepreneurs and Startup Founders",
    "SME Owners",
    "Consultants and Advisors",
    "Investors",
    "Mentors",
    "Freelancers and Service Providers",
    "Students and Young Professionals",
  ];

  const roletwo = [
    "Startups",
    "Small and Medium Enterprises",
    "Large Corporations",
    "Consulting Firms",
    "Investment Companies",
    "Educational Institutions",
    "Government Bodies",
    "Industry Associations",
    "Incubation Centre",
  ];

  const mainroles = ["Individual", "Organization"];
  const [showAnimation, setShowAnimation] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Individual");
  const [selectedSubRole, setSelectedSubRole] = useState("");
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [isChecked, setIsChecked] = useState(false); // Checkbox state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setSelectedSubRole("");
    setShowModal(false); // Close the modal if role changes
  };

  const handleSubRoleChange = (subRole) => {
    setSelectedSubRole(subRole);
    setShowForm(false);
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isChecked) {
      alert("Form submitted successfully!");
      // Additional submission logic can go here
      setShowModal(false); // Close modal after submission
    } else {
      alert("You must agree to the terms and conditions to proceed.");
    }
  };

  // Function to handle showing the modal
  const handleNext = () => {
    if (isChecked) {
      // setShowModal(true);
      setShowForm(true); // Show the modal only if checkbox is checked
    } else {
      alert("You must agree to the terms and conditions to proceed.");
    }
  };

  return (
    <div className="container-fluid ">
      {/* <HeaderNavbar /> */}

      <div className="row">
        <div className="col-md-6 right-role-cont">
          <div style={{ margin: "80px 0px 50px 10px" }}>
            <div className="welcome-cnt">Welcome, All!</div>
            <h1 className="first-cnt">
              Sign up for PrimeClustro — Free Forever
            </h1>
            <p className="second-cnt">
              Select the job title you most identify with
            </p>
          </div>

          <div className="row">
            {mainroles.map((role, index) => (
              <div className="col-md-6 role-content" key={index}>
                <div
                  className={`d-flex align-items-center border rounded p-2 mb-3 
                  ${selectedRole === role ? "bg-primary text-white" : ""}`}
                  style={{
                    height: "60px",
                    position: "relative",
                    cursor: "pointer",
                  }}
                  onClick={() => handleRoleChange(role)}
                >
                  <input
                    type="radio"
                    className="form-check-input position-absolute"
                    name="role"
                    value={role}
                    checked={selectedRole === role}
                    onChange={() => handleRoleChange(role)}
                    style={{
                      left: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      zIndex: 1,
                    }}
                  />
                  <span className="ms-4 roles">
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </span>
                </div>
              </div>
            ))}
            <span className="border-signup"></span>
          </div>

          <div>
            <div className="row">
              <span className="border-signup"></span>
            </div>
            <Container>
              {selectedRole === "Individual" && (
                <div className="professional-cards mt-4">
                  <div className="row">
                    {roles.map((role, index) => (
                      <div className="col-md-4 role-content" key={index}>
                        <div
                          className={`d-flex align-items-center border rounded p-2 mb-3 
                          ${
                            selectedSubRole === role
                              ? "bg-primary text-white"
                              : ""
                          }`}
                          style={{
                            height: "60px",
                            position: "relative",
                            cursor: "pointer",
                            backgroundColor: "rgb(25 201 206)",
                            color: "white",
                          }}
                          onClick={() => handleSubRoleChange(role)}
                        >
                          <input
                            type="radio"
                            className="form-check-input position-absolute"
                            name="subrole"
                            value={role}
                            checked={selectedSubRole === role}
                            onChange={() => handleSubRoleChange(role)}
                            style={{
                              left: "20px",
                              top: "47%",
                              transform: "translateY(-50%)",
                              zIndex: 1,
                            }}
                          />
                          <span className="ms-4 roles indivitual-card">
                            {role.charAt(0).toUpperCase() + role.slice(1)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedRole === "Organization" && (
                <div className="professional-cards mt-4">
                  <div className="row">
                    {roletwo.map((role, index) => (
                      <div className="col-md-4 role-content" key={index}>
                        <div
                          className={`d-flex align-items-center border rounded p-2 mb-3 
                          ${
                            selectedSubRole === role
                              ? "bg-primary text-white"
                              : ""
                          }`}
                          style={{
                            height: "60px",
                            position: "relative",
                            cursor: "pointer",
                            backgroundColor: "rgb(25 201 206)",
                            color: "white",
                          }}
                          onClick={() => handleSubRoleChange(role)}
                        >
                          <input
                            type="radio"
                            className="form-check-input position-absolute"
                            name="subrole"
                            value={role}
                            checked={selectedSubRole === role}
                            onChange={() => handleSubRoleChange(role)}
                            style={{
                              left: "20px",
                              top: "47%",
                              transform: "translateY(-50%)",
                              zIndex: 1,
                            }}
                          />
                          <span className="ms-4 roles indivitual-card">
                            {role.charAt(0).toUpperCase() + role.slice(1)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Container>
          </div>

          <Row className="mb-5">
            <Col lg={12}>
              <div style={{ display: "flex", justifyContent: "end" }}>
                <Button
                  variant="outline-danger"
                  type="button"
                  className="btn-below"
                >
                  Skip
                </Button>
                <Button
                  variant="outline-primary"
                  type="submit"
                  className="btn-below"
                >
                  Continue
                </Button>
              </div>
            </Col>
          </Row>
        </div>

        <div
          className="col-md-6 role-content left pt-5"
          style={{ backgroundColor: "antiquewhite" }}
        >
          <>
            {selectedSubRole ? (
              <>
                {showForm ? (
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </Form>
      ) : (
        selectedSubRole === "Entrepreneurs and Startup Founders" && (
          <div className="role-cont">
            <ul
              className="list-unstyled"
              style={{
                width: "90%",
                padding: 0,
                marginTop: "60px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <li
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <span className="number-circle">1</span>
                <span className="line-connector line-connector-long-1"></span>
                <div className="feature-content">
                  <h4 className="mb-3 feature-title">Individual</h4>
                  <p className="feature-sub-content">
                    This platform empowers entrepreneurs, freelancers,
                    investors, and young professionals with resources, tools,
                    and mentorship to thrive.
                  </p>
                </div>
              </li>

              <li
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <span className="number-circle">2</span>
                <span className="line-connector line-connector-long-2"></span>
                <div className="feature-content">
                  <h4 className="feature-title">Entrepreneurs</h4>
                  <p className="feature-sub-content">
                    "Turn visionary ideas into thriving businesses. Navigate
                    challenges with innovation, drive growth, and lead your
                    industry to new heights."
                  </p>
                </div>
              </li>

              <li
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
                data-aos="fade-up"
                data-aos-delay="1200"
              >
                <span className="number-circle">3</span>
                <div className="feature-content">
                  <h4 className="feature-title">Startup Founders</h4>
                  <p className="feature-sub-content">
                    "Transform bold ideas into impactful solutions. Embrace
                    challenges with resilience and creativity. Drive innovation,
                    foster growth, and shape industries. Lead your vision to
                    success and inspire others."
                  </p>
                </div>
              </li>
            </ul>

            <Form>
              <Form.Group controlId="termsCheckbox">
                <Form.Check
                  type="checkbox"
                  label="I agree to the terms and conditions"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
              </Form.Group>
              <br />
            </Form>

            <Button
              variant="primary"
              onClick={handleNext}
              disabled={!isChecked}
            >
              Next
            </Button>
          </div>
        )
      )}
                {selectedSubRole === "SME Owners" && (
                  <div className="role-cont">
                    <ul
                      className="list-unstyled"
                      style={{
                        width: "90%",
                        padding: 0,
                        marginTop: "60px",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    >
                      <li
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                        data-aos="fade-up"
                        data-aos-delay="300"
                      >
                        <span className="number-circle">1</span>
                        <span className="line-connector line-connector-long-1"></span>
                        <div className="feature-content">
                          <h4 className="mb-3 feature-title">Individual</h4>
                          <p className="feature-sub-content">
                            This platform empowers entrepreneurs, freelancers,
                            investors, and young professionals with resources,
                            tools, and mentorship to thrive.
                          </p>
                        </div>
                      </li>

                      <li
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                        data-aos="fade-up"
                        data-aos-delay="1200"
                      >
                        <span className="number-circle">2</span>
                        <div className="feature-content">
                          <h4 className="feature-title">SME Owners</h4>
                          <p className="feature-sub-content">
                            "Transform bold ideas into impactful solutions.
                            Embrace challenges with resilience and creativity.
                            Drive innovation, foster growth, and shape
                            industries. Lead your vision to success and inspire
                            others."
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
                {selectedSubRole === "Consultants and Advisors" && (
                  <div className="role-cont">
                    <ul
                      className="list-unstyled"
                      style={{
                        width: "90%",
                        padding: 0,
                        marginTop: "60px",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    >
                      <li
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                        data-aos="fade-up"
                        data-aos-delay="300"
                      >
                        <span className="number-circle">1</span>
                        <span className="line-connector line-connector-long-1"></span>
                        <div className="feature-content">
                          <h4 className="mb-3 feature-title">Individual</h4>
                          <p className="feature-sub-content">
                            This platform empowers entrepreneurs, freelancers,
                            investors, and young professionals with resources,
                            tools, and mentorship to thrive.
                          </p>
                        </div>
                      </li>

                      <li
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                        data-aos="fade-up"
                        data-aos-delay="600"
                      >
                        <span className="number-circle">2</span>
                        <span className="line-connector line-connector-long-2"></span>
                        <div className="feature-content">
                          <h4 className="feature-title">Consultants</h4>
                          <p className="feature-sub-content">
                            "Turn visionary ideas into thriving businesses.
                            Navigate challenges with innovation, drive growth,
                            and lead your industry to new heights."
                          </p>
                        </div>
                      </li>

                      <li
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                        data-aos="fade-up"
                        data-aos-delay="1200"
                      >
                        <span className="number-circle">3</span>
                        <div className="feature-content">
                          <h4 className="feature-title">Advisors</h4>
                          <p className="feature-sub-content">
                            "Transform bold ideas into impactful solutions.
                            Embrace challenges with resilience and creativity.
                            Drive innovation, foster growth, and shape
                            industries. Lead your vision to success and inspire
                            others."
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
                {selectedSubRole === "Investors" && (
                  <div className="role-cont">
                    <ul
                      className="list-unstyled"
                      style={{
                        width: "90%",
                        padding: 0,
                        marginTop: "60px",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    >
                      <li
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                        data-aos="fade-up"
                        data-aos-delay="300"
                      >
                        <span className="number-circle">1</span>
                        <span className="line-connector line-connector-long-1"></span>
                        <div className="feature-content">
                          <h4 className="mb-3 feature-title">Individual</h4>
                          <p className="feature-sub-content">
                            This platform empowers entrepreneurs, freelancers,
                            investors, and young professionals with resources,
                            tools, and mentorship to thrive.
                          </p>
                        </div>
                      </li>

                      <li
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                        data-aos="fade-up"
                        data-aos-delay="1200"
                      >
                        <span className="number-circle">2</span>
                        <div className="feature-content">
                          <h4 className="feature-title">Investors</h4>
                          <p className="feature-sub-content">
                            "Transform bold ideas into impactful solutions.
                            Embrace challenges with resilience and creativity.
                            Drive innovation, foster growth, and shape
                            industries. Lead your vision to success and inspire
                            others."
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
                {selectedSubRole === "Mentors" && (
                  <div className="role-cont">
                    <ul
                      className="list-unstyled"
                      style={{
                        width: "90%",
                        padding: 0,
                        marginTop: "60px",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    >
                      <li
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                        data-aos="fade-up"
                        data-aos-delay="300"
                      >
                        <span className="number-circle">1</span>
                        <span className="line-connector line-connector-long-1"></span>
                        <div className="feature-content">
                          <h4 className="mb-3 feature-title">Individual</h4>
                          <p className="feature-sub-content">
                            This platform empowers entrepreneurs, freelancers,
                            investors, and young professionals with resources,
                            tools, and mentorship to thrive.
                          </p>
                        </div>
                      </li>

                      <li
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                        data-aos="fade-up"
                        data-aos-delay="1200"
                      >
                        <span className="number-circle">2</span>
                        <div className="feature-content">
                          <h4 className="feature-title">Mentors</h4>
                          <p className="feature-sub-content">
                            "Transform bold ideas into impactful solutions.
                            Embrace challenges with resilience and creativity.
                            Drive innovation, foster growth, and shape
                            industries. Lead your vision to success and inspire
                            others."
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
                {selectedSubRole === "Freelancers and Service Providers" && (
                  <div className="role-cont">
                    <ul
                      className="list-unstyled"
                      style={{
                        width: "90%",
                        padding: 0,
                        marginTop: "60px",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    >
                      <li
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                        data-aos="fade-up"
                        data-aos-delay="300"
                      >
                        <span className="number-circle">1</span>
                        <span className="line-connector line-connector-long-1"></span>
                        <div className="feature-content">
                          <h4 className="mb-3 feature-title">Individual</h4>
                          <p className="feature-sub-content">
                            This platform empowers entrepreneurs, freelancers,
                            investors, and young professionals with resources,
                            tools, and mentorship to thrive.
                          </p>
                        </div>
                      </li>

                      <li
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                        data-aos="fade-up"
                        data-aos-delay="600"
                      >
                        <span className="number-circle">2</span>
                        <span className="line-connector line-connector-long-2"></span>
                        <div className="feature-content">
                          <h4 className="feature-title">Freelancers </h4>
                          <p className="feature-sub-content">
                            "Turn visionary ideas into thriving businesses.
                            Navigate challenges with innovation, drive growth,
                            and lead your industry to new heights."
                          </p>
                        </div>
                      </li>

                      <li
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                        data-aos="fade-up"
                        data-aos-delay="1200"
                      >
                        <span className="number-circle">3</span>
                        <div className="feature-content">
                          <h4 className="feature-title">Service Providers</h4>
                          <p className="feature-sub-content">
                            "Transform bold ideas into impactful solutions.
                            Embrace challenges with resilience and creativity.
                            Drive innovation, foster growth, and shape
                            industries. Lead your vision to success and inspire
                            others."
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
                {selectedSubRole === "Students and Young Professionals" && (
                  <div className="role-cont">
                    <ul
                      className="list-unstyled"
                      style={{
                        width: "90%",
                        padding: 0,
                        marginTop: "60px",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    >
                      <li
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                        data-aos="fade-up"
                        data-aos-delay="300"
                      >
                        <span className="number-circle">1</span>
                        <span className="line-connector line-connector-long-1"></span>
                        <div className="feature-content">
                          <h4 className="mb-3 feature-title">Individual</h4>
                          <p className="feature-sub-content">
                            This platform empowers entrepreneurs, freelancers,
                            investors, and young professionals with resources,
                            tools, and mentorship to thrive.
                          </p>
                        </div>
                      </li>

                      <li
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                        data-aos="fade-up"
                        data-aos-delay="600"
                      >
                        <span className="number-circle">2</span>
                        <span className="line-connector line-connector-long-2"></span>
                        <div className="feature-content">
                          <h4 className="feature-title"> Students</h4>
                          <p className="feature-sub-content">
                            "Turn visionary ideas into thriving businesses.
                            Navigate challenges with innovation, drive growth,
                            and lead your industry to new heights."
                          </p>
                        </div>
                      </li>

                      <li
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                        data-aos="fade-up"
                        data-aos-delay="1200"
                      >
                        <span className="number-circle">3</span>
                        <div className="feature-content">
                          <h4 className="feature-title">
                            {" "}
                            Young Professionals
                          </h4>
                          <p className="feature-sub-content">
                            "Transform bold ideas into impactful solutions.
                            Embrace challenges with resilience and creativity.
                            Drive innovation, foster growth, and shape
                            industries. Lead your vision to success and inspire
                            others."
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
                {selectedSubRole === "Startups" && (
                  <div className="role-cont">
                    <ul
                      className="list-unstyled"
                      style={{
                        width: "90%",
                        padding: 0,
                        marginTop: "60px",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    >
                      <li
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                        data-aos="fade-up"
                        data-aos-delay="300"
                      >
                        <span className="number-circle">1</span>
                        <span className="line-connector line-connector-long-1"></span>
                        <div className="feature-content">
                          <h4 className="mb-3 feature-title">Individual</h4>
                          <p className="feature-sub-content">
                            This platform empowers entrepreneurs, freelancers,
                            investors, and young professionals with resources,
                            tools, and mentorship to thrive.
                          </p>
                        </div>
                      </li>

                      <li
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                        data-aos="fade-up"
                        data-aos-delay="1200"
                      >
                        <span className="number-circle">2</span>
                        <div className="feature-content">
                          <h4 className="feature-title"> Startups</h4>
                          <p className="feature-sub-content">
                            "Transform bold ideas into impactful solutions.
                            Embrace challenges with resilience and creativity.
                            Drive innovation, foster growth, and shape
                            industries. Lead your vision to success and inspire
                            others."
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
                {selectedSubRole === "Small and Medium Enterprises" && (
                  <div className="role-cont">
                    <ul
                      className="list-unstyled"
                      style={{
                        width: "90%",
                        padding: 0,
                        marginTop: "60px",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    >
                      <li
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                        data-aos="fade-up"
                        data-aos-delay="300"
                      >
                        <span className="number-circle">1</span>
                        <span className="line-connector line-connector-long-1"></span>
                        <div className="feature-content">
                          <h4 className="mb-3 feature-title">Individual</h4>
                          <p className="feature-sub-content">
                            This platform empowers entrepreneurs, freelancers,
                            investors, and young professionals with resources,
                            tools, and mentorship to thrive.
                          </p>
                        </div>
                      </li>

                      <li
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                        data-aos="fade-up"
                        data-aos-delay="600"
                      >
                        <span className="number-circle">2</span>
                        <span className="line-connector line-connector-long-2"></span>
                        <div className="feature-content">
                          <h4 className="feature-title"> Small Enterprices</h4>
                          <p className="feature-sub-content">
                            "Turn visionary ideas into thriving businesses.
                            Navigate challenges with innovation, drive growth,
                            and lead your industry to new heights."
                          </p>
                        </div>
                      </li>

                      <li
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                        data-aos="fade-up"
                        data-aos-delay="1200"
                      >
                        <span className="number-circle">3</span>
                        <div className="feature-content">
                          <h4 className="feature-title"> Medium Enterprices</h4>
                          <p className="feature-sub-content">
                            "Transform bold ideas into impactful solutions.
                            Embrace challenges with resilience and creativity.
                            Drive innovation, foster growth, and shape
                            industries. Lead your vision to success and inspire
                            others."
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
                {selectedSubRole === "Large Corporations" && (
                  <div className="role-cont">
                    <ul
                      className="list-unstyled"
                      style={{
                        width: "90%",
                        padding: 0,
                        marginTop: "60px",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    >
                      <li
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                        data-aos="fade-up"
                        data-aos-delay="300"
                      >
                        <span className="number-circle">1</span>
                        <span className="line-connector line-connector-long-1"></span>
                        <div className="feature-content">
                          <h4 className="mb-3 feature-title">Individual</h4>
                          <p className="feature-sub-content">
                            This platform empowers entrepreneurs, freelancers,
                            investors, and young professionals with resources,
                            tools, and mentorship to thrive.
                          </p>
                        </div>
                      </li>

                      <li
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                        data-aos="fade-up"
                        data-aos-delay="1200"
                      >
                        <span className="number-circle">2</span>
                        <div className="feature-content">
                          <h4 className="feature-title">
                            {" "}
                            Large Corporations Young Professionals
                          </h4>
                          <p className="feature-sub-content">
                            "Transform bold ideas into impactful solutions.
                            Embrace challenges with resilience and creativity.
                            Drive innovation, foster growth, and shape
                            industries. Lead your vision to success and inspire
                            others."
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
                {selectedSubRole === "Consulting Firms" && (
                  <div className="role-cont">
                    <ul
                      className="list-unstyled"
                      style={{
                        width: "90%",
                        padding: 0,
                        marginTop: "60px",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    >
                      <li
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                        data-aos="fade-up"
                        data-aos-delay="300"
                      >
                        <span className="number-circle">1</span>
                        <span className="line-connector line-connector-long-1"></span>
                        <div className="feature-content">
                          <h4 className="mb-3 feature-title">Individual</h4>
                          <p className="feature-sub-content">
                            This platform empowers entrepreneurs, freelancers,
                            investors, and young professionals with resources,
                            tools, and mentorship to thrive.
                          </p>
                        </div>
                      </li>

                      <li
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                        data-aos="fade-up"
                        data-aos-delay="1200"
                      >
                        <span className="number-circle">2</span>
                        <div className="feature-content">
                          <h4 className="feature-title"> Consulting Firms</h4>
                          <p className="feature-sub-content">
                            "Transform bold ideas into impactful solutions.
                            Embrace challenges with resilience and creativity.
                            Drive innovation, foster growth, and shape
                            industries. Lead your vision to success and inspire
                            others."
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}

                {selectedSubRole === "Investment Companies" && (
                  <div className="role-cont">
                    <ul
                      className="list-unstyled"
                      style={{
                        width: "90%",
                        padding: 0,
                        marginTop: "60px",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    >
                      <li
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                        data-aos="fade-up"
                        data-aos-delay="300"
                      >
                        <span className="number-circle">1</span>
                        <span className="line-connector line-connector-long-1"></span>
                        <div className="feature-content">
                          <h4 className="mb-3 feature-title">Individual</h4>
                          <p className="feature-sub-content">
                            This platform empowers entrepreneurs, freelancers,
                            investors, and young professionals with resources,
                            tools, and mentorship to thrive.
                          </p>
                        </div>
                      </li>

                      <li
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                        data-aos="fade-up"
                        data-aos-delay="1200"
                      >
                        <span className="number-circle">2</span>
                        <div className="feature-content">
                          <h4 className="feature-title">
                            Investment Companies
                          </h4>
                          <p className="feature-sub-content">
                            "Transform bold ideas into impactful solutions.
                            Embrace challenges with resilience and creativity.
                            Drive innovation, foster growth, and shape
                            industries. Lead your vision to success and inspire
                            others."
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
                {selectedSubRole === "Educational Institutions" && (
                  <div className="role-cont">
                    <ul
                      className="list-unstyled"
                      style={{
                        width: "90%",
                        padding: 0,
                        marginTop: "60px",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    >
                      <li
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                        data-aos="fade-up"
                        data-aos-delay="300"
                      >
                        <span className="number-circle">1</span>
                        <span className="line-connector line-connector-long-1"></span>
                        <div className="feature-content">
                          <h4 className="mb-3 feature-title">Individual</h4>
                          <p className="feature-sub-content">
                            This platform empowers entrepreneurs, freelancers,
                            investors, and young professionals with resources,
                            tools, and mentorship to thrive.
                          </p>
                        </div>
                      </li>

                      <li
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                        data-aos="fade-up"
                        data-aos-delay="1200"
                      >
                        <span className="number-circle">2</span>
                        <div className="feature-content">
                          <h4 className="feature-title">
                            Educational Institutions
                          </h4>
                          <p className="feature-sub-content">
                            "Transform bold ideas into impactful solutions.
                            Embrace challenges with resilience and creativity.
                            Drive innovation, foster growth, and shape
                            industries. Lead your vision to success and inspire
                            others."
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
                {selectedSubRole === "Government Bodies" && (
                  <div className="role-cont">
                    <ul
                      className="list-unstyled"
                      style={{
                        width: "90%",
                        padding: 0,
                        marginTop: "60px",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    >
                      <li
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                        data-aos="fade-up"
                        data-aos-delay="300"
                      >
                        <span className="number-circle">1</span>
                        <span className="line-connector line-connector-long-1"></span>
                        <div className="feature-content">
                          <h4 className="mb-3 feature-title">Individual</h4>
                          <p className="feature-sub-content">
                            This platform empowers entrepreneurs, freelancers,
                            investors, and young professionals with resources,
                            tools, and mentorship to thrive.
                          </p>
                        </div>
                      </li>

                      <li
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                        data-aos="fade-up"
                        data-aos-delay="1200"
                      >
                        <span className="number-circle">2</span>
                        <div className="feature-content">
                          <h4 className="feature-title">Government Bodies</h4>
                          <p className="feature-sub-content">
                            "Transform bold ideas into impactful solutions.
                            Embrace challenges with resilience and creativity.
                            Drive innovation, foster growth, and shape
                            industries. Lead your vision to success and inspire
                            others."
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
                {selectedSubRole === "Industry Associations" && (
                  <div className="role-cont">
                    <ul
                      className="list-unstyled"
                      style={{
                        width: "90%",
                        padding: 0,
                        marginTop: "60px",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    >
                      <li
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                        data-aos="fade-up"
                        data-aos-delay="300"
                      >
                        <span className="number-circle">1</span>
                        <span className="line-connector line-connector-long-1"></span>
                        <div className="feature-content">
                          <h4 className="mb-3 feature-title">Individual</h4>
                          <p className="feature-sub-content">
                            This platform empowers entrepreneurs, freelancers,
                            investors, and young professionals with resources,
                            tools, and mentorship to thrive.
                          </p>
                        </div>
                      </li>

                      <li
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                        data-aos="fade-up"
                        data-aos-delay="1200"
                      >
                        <span className="number-circle">2</span>
                        <div className="feature-content">
                          <h4 className="feature-title">
                            Industry Associations
                          </h4>
                          <p className="feature-sub-content">
                            "Transform bold ideas into impactful solutions.
                            Embrace challenges with resilience and creativity.
                            Drive innovation, foster growth, and shape
                            industries. Lead your vision to success and inspire
                            others."
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
                {selectedSubRole === "Incubation Centre" && (
                  <div className="role-cont">
                    <ul
                      className="list-unstyled"
                      style={{
                        width: "90%",
                        padding: 0,
                        marginTop: "60px",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    >
                      <li
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                        data-aos="fade-up"
                        data-aos-delay="300"
                      >
                        <span className="number-circle">1</span>
                        <span className="line-connector line-connector-long-1"></span>
                        <div className="feature-content">
                          <h4 className="mb-3 feature-title">Individual</h4>
                          <p className="feature-sub-content">
                            This platform empowers entrepreneurs, freelancers,
                            investors, and young professionals with resources,
                            tools, and mentorship to thrive.
                          </p>
                        </div>
                      </li>

                      <li
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                        data-aos="fade-up"
                        data-aos-delay="1200"
                      >
                        <span className="number-circle">2</span>
                        <div className="feature-content">
                          <h4 className="feature-title">Incubation Centre</h4>
                          <p className="feature-sub-content">
                            "Transform bold ideas into impactful solutions.
                            Embrace challenges with resilience and creativity.
                            Drive innovation, foster growth, and shape
                            industries. Lead your vision to success and inspire
                            others."
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <>
                {selectedRole === "Individual" && (
                  <div className="role-cont">
                    <ul
                      className="list-unstyled"
                      style={{ width: "90%", padding: 0 }}
                    >
                      {/* <li
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                        data-aos="fade-up"
                        data-aos-delay="300"
                      >
                        <span className="number-circle">1</span>
                        <span className="line-connector line-connector-long-1"></span>
                        <div className="feature-content">
                          <h4 className="mb-3 feature-title">Individual</h4>
                          <p className="feature-sub-content">
                            This platform supports a diverse range of
                            individuals, including entrepreneurs, SME owners,
                            consultants, mentors, and investors, all focused on
                            growth and success. Freelancers and service
                            providers are equipped with tools to build their
                            brand, while students and young professionals gain
                            skills and networking opportunities. Each group is
                            empowered with resources and mentorship to overcome
                            challenges and seize opportunities. Together, they
                            achieve sustainable success.
                          </p>
                        </div>
                      </li> */}
                      {/* 
                      <li
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                        data-aos="fade-up"
                        data-aos-delay="600"
                      >
                        <span className="number-circle">2</span>
                        <span className="line-connector line-connector-long-2"></span>
                        <div className="feature-content">
                          <h4 className="feature-title">
                            Engage Students with Blogs
                          </h4>
                          <p className="feature-sub-content">
                            Keep your student body informed and engaged by
                            posting blogs about campus events, educational
                            content, and institutional news. This builds a
                            stronger connection with your students and attracts
                            new applicants.
                          </p>
                        </div>
                      </li>

                      <li
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                        data-aos="fade-up"
                        data-aos-delay="900"
                      >
                        <span className="number-circle">3</span>
                        <span className="line-connector line-connector-long-3"></span>
                        <div className="feature-content">
                          <h4 className="feature-title">
                            Advertise Jobs and Internships
                          </h4>
                          <p className="feature-sub-content">
                            Easily post job openings for faculty, staff, and
                            internships. Reach potential candidates directly and
                            streamline your recruitment process by managing
                            applications through your portal.
                          </p>
                        </div>
                      </li>

                      <li
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                        data-aos="fade-up"
                        data-aos-delay="1200"
                      >
                        <span className="number-circle">4</span>
                        <div className="feature-content">
                          <h4 className="feature-title">
                            Organize Seminars and Webinars
                          </h4>
                          <p className="feature-sub-content">
                            Host and promote educational seminars, webinars, and
                            workshops. Our platform allows easy registration for
                            students and visitors, helping you build a thriving
                            academic community.
                          </p>
                        </div>
                      </li> */}
                    </ul>

                    <Col
                      md={12}
                      className={`right-design d-flex align-items-center justify-content-center ${
                        showAnimation ? "circle-motion" : ""
                      }`}
                    >
                      <div className="first-cnt">Individual</div>
                    </Col>
                  </div>
                )}
                {selectedRole === "Organization" && (
                  <div className="role-cont">
                    <ul
                      className="list-unstyled"
                      style={{ width: "90%", padding: 0 }}
                    >
                      {/* <li
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                        data-aos="fade-up"
                        data-aos-delay="300"
                      >
                        <span className="number-circle">1</span>
                        <span className="line-connector line-connector-long-1"></span>
                        <div className="feature-content">
                          <h4 className="mb-3 feature-title">Individual</h4>
                          <p className="feature-sub-content">
                            This platform supports a diverse range of
                            individuals, including entrepreneurs, SME owners,
                            consultants, mentors, and investors, all focused on
                            growth and success. Freelancers and service
                            providers are equipped with tools to build their
                            brand, while students and young professionals gain
                            skills and networking opportunities. Each group is
                            empowered with resources and mentorship to overcome
                            challenges and seize opportunities. Together, they
                            achieve sustainable success.
                          </p>
                        </div>
                      </li> */}
                      {/* 
                      <li
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                        data-aos="fade-up"
                        data-aos-delay="600"
                      >
                        <span className="number-circle">2</span>
                        <span className="line-connector line-connector-long-2"></span>
                        <div className="feature-content">
                          <h4 className="feature-title">
                            Engage Students with Blogs
                          </h4>
                          <p className="feature-sub-content">
                            Keep your student body informed and engaged by
                            posting blogs about campus events, educational
                            content, and institutional news. This builds a
                            stronger connection with your students and attracts
                            new applicants.
                          </p>
                        </div>
                      </li>

                      <li
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                        data-aos="fade-up"
                        data-aos-delay="900"
                      >
                        <span className="number-circle">3</span>
                        <span className="line-connector line-connector-long-3"></span>
                        <div className="feature-content">
                          <h4 className="feature-title">
                            Advertise Jobs and Internships
                          </h4>
                          <p className="feature-sub-content">
                            Easily post job openings for faculty, staff, and
                            internships. Reach potential candidates directly and
                            streamline your recruitment process by managing
                            applications through your portal.
                          </p>
                        </div>
                      </li>

                      <li
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                        data-aos="fade-up"
                        data-aos-delay="1200"
                      >
                        <span className="number-circle">4</span>
                        <div className="feature-content">
                          <h4 className="feature-title">
                            Organize Seminars and Webinars
                          </h4>
                          <p className="feature-sub-content">
                            Host and promote educational seminars, webinars, and
                            workshops. Our platform allows easy registration for
                            students and visitors, helping you build a thriving
                            academic community.
                          </p>
                        </div>
                      </li> */}
                    </ul>

                    <Col
                      md={12}
                      className={`right-design d-flex align-items-center justify-content-center ${
                        showAnimation ? "circle-motion" : ""
                      }`}
                    >
                      <div className="first-cnt">Organization</div>
                    </Col>
                  </div>
                )}
              </>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default RoleForm;
