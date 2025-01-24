import React, { useState, useEffect } from "react";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { Row, Col, Button, Container } from "react-bootstrap";
import "../../../dashboard/user/MyProfile.scss";
import { Select } from "antd";
// import { Option } from "antd/lib/mentions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

import Api from "../../../../Api";

const { Option } = Select;

function LoanForm() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const userid = localStorage.getItem("id");
  const { state } = useLocation();
  const record = state?.record;
  const userType = localStorage.getItem("userType");
  console.log("userid", userid);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [loanApplicationData, setLoanApplicationData] = useState(null);
  const [childCount, setChildCount] = useState(0);
  const [userDetail, setUserDetail] = useState(null);

  useEffect(() => {
    getCountry();
  }, []);

  const getCountry = async () => {
    try {
      const response = await Api.get("country/getallcountry");
      setCountryList(response.data.data);
    } catch (error) {
      console.error("Error fetching country data:", error);
    }
  };

  const getState = (country_id) => {
    Api.get(`state/stateById/${country_id}`).then((res) => {
      setStateList(res.data.data);
    });
  };

  const getDistrict = (state_id) => {
    Api.get(`district/districtById/${state_id}`).then((res) => {
      setDistrictList(res.data.data);
    });
  };

  const getCity = (districtId) => {
    Api.get(`city/cityById/${districtId}`).then((res) => {
      setCityList(res.data.data);
    });
  };

  const handleFormSubmit = async (data) => {
    console.log("step1", data);

    const uploadFile = async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "darshan");
      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dzblzw7ll/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const cloudinaryData = await response.json();
        return cloudinaryData.secure_url;
      } catch (error) {
        console.error("File upload failed", error);
        return null;
      }
    };

    const coApplicantDocsUrl = data.coApplicantDocs?.[0]
      ? await uploadFile(data.coApplicantDocs[0])
      : null;
    const photographsUrl = data.photographs?.[0]
      ? await uploadFile(data.photographs[0])
      : null;

    const Details = {
      userid: userid,
      lastname: data.lastname,
      firstname: data.firstname,
      dob: data.dob,
      gender: data.gender,
      maritalStatus: data.maritalStatus,
      nationality: data.nationality,
      contactNumber: data.contactNumber,
      address: data.address,
      city: data.city,
      district: data.district,
      state: data.state,
      country: data.country,
      pinCode: data.pinCode,
      totalChildren: data.totalChildren,
      children: data.children,
      spouseName: data.spouseName,
      spouseOccupation: data.spouseOccupation,
      spouseDesignation: data.spouseDesignation,
      spouseIncome: data.spouseIncome,
      coApplicantDocs: coApplicantDocsUrl,
      photographs: photographsUrl,
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/loanform/updateloanapplication/${record._id}`,
        Details
      );
      console.log(response, "Form updated successfully");
      toast.success("Form updated successfully");
    } catch (error) {
      console.error("Form update failed", error);
      toast.error("An error occurred while updating the form");
    }
  };

  useEffect(() => {
    const fetchLoanApplication = async () => {
      const userid = localStorage.getItem("id");
      if (!userid) {
        console.log("User ID not found in localStorage");
        return;
      }

      try {
        console.log("Fetching loan application with userID:", userid);
        const response = await axios.get(
          `http://localhost:5000/signup/getby/${userid}`
        );
        console.log("Response received:", response);
        setLoanApplicationData(response.data.data);
      } catch (error) {
        console.error("Error fetching loan application data:", error);
      }
    };

    fetchLoanApplication();
  }, [userid]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/signup/getby/${userid}`
        );
        setUserDetail(response.data);
        console.log("getresponse", response.data);

        const fetchedData = response.data;
        const formattedDob = fetchedData.dob
          ? new Date(fetchedData.dob).toISOString().split("T")[0]
          : "";

        reset({
          ...fetchedData,
          dob: formattedDob,
        });
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    fetchUserDetails();
  }, [userType, userid]);

  const loanAmount = watch("totalChildren");

  useEffect(() => {
    const count = parseInt(loanAmount, 10);
    setChildCount(Number.isNaN(count) ? 0 : count);
  }, [loanAmount]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "children",
  });

  useEffect(() => {
    const currentCount = fields.length;

    if (childCount > currentCount) {
      for (let i = currentCount; i < childCount; i++) {
        append({ gender: "", name: "", age: "", schoolName: "" });
      }
    } else if (childCount < currentCount) {
      for (let i = currentCount - 1; i >= childCount; i--) {
        remove(i);
      }
    }
  }, [childCount, fields.length, append, remove]);

  return (
    <div>
      <Container style={{ marginTop: "1%" }}>
        <Col xs={12} md={12} lg={12}>
          <div
            className="ourProfileParentdiv"
            style={{ backgroundColor: "white", padding: "10px 20px" }}
          >
            <div style={{ paddingLeft: "10px" }}>
              <center>
                {" "}
                <h4 className="pages-title mt-3 mb-5">Personal Information</h4>
              </center>

              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div>
                  <Row className="py-2">
                    <Col xs={12} md={6} lg={4}>
                      {(userDetail?.photographs || watch("imagePreview")) && (
                        <>
                          <img
                            src={
                              watch("imagePreview") || userDetail.photographs
                            }
                            alt="Preview"
                            style={{
                              width: "150px",
                              height: "150px",
                              objectFit: "cover",
                              marginTop: "10px",
                            }}
                          />
                          <p>Photographs</p>
                        </>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Photographs (Passport size)
                        </label>

                        <input
                          type="file"
                          className="inputcolumn-ourProfile"
                          id="photographsInput"
                          accept="image/*"
                          {...register("photographs", {
                            required: !userDetail?.photographs,
                          })}
                          onChange={(e) => {
                            if (e.target.files[0]) {
                              const fileUrl = URL.createObjectURL(
                                e.target.files[0]
                              );
                              setValue("imagePreview", fileUrl);
                              setValue(
                                "photographsFileName",
                                e.target.files[0].name
                              );
                            }
                          }}
                        />

                        {!userDetail?.photographs && errors.photographs && (
                          <p className="text-danger">
                            Photographs are required
                          </p>
                        )}
                      </div>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          First Name
                        </label>
                        <input
                          className="inputcolumn-ourProfile"
                          type="text"
                          name="firstname"
                          {...register("firstname", { required: true })}
                          placeholder="First Name"
                        />
                        {errors.firstname && (
                          <p className="text-danger">First Name is required</p>
                        )}
                      </div>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">Last Name</label>
                        <input
                          className="inputcolumn-ourProfile"
                          type="text"
                          name="lastname"
                          {...register("lastname", { required: true })}
                          placeholder="Last Name"
                        />
                        {errors.lastname && (
                          <p className="text-danger">First Name is required</p>
                        )}
                      </div>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Date of Birth
                        </label>
                        <input
                          className="inputcolumn-ourProfile"
                          type="date"
                          name="dob"
                          max={new Date().toISOString().split("T")[0]}
                          {...register("dob", { required: true })}
                        />
                        {errors.dob && (
                          <p className="text-danger">
                            Date of Birth is required
                          </p>
                        )}
                      </div>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">Gender</label>
                        <Controller
                          name="gender"
                          control={control}
                          defaultValue=""
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              className="inputcolumn_drp"
                              placeholder="Select Gender"
                            >
                              <Option value="Male">Male</Option>
                              <Option value="Female">Female</Option>
                              <Option value="Other">Other</Option>
                            </Select>
                          )}
                        />
                        {errors.gender && (
                          <p className="text-danger">Gender is required</p>
                        )}
                      </div>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Marital Status
                        </label>
                        <Controller
                          name="maritalStatus"
                          control={control}
                          defaultValue=""
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              className="inputcolumn_drp"
                              placeholder="Select Marital Status"
                              onChange={(value) => {
                                field.onChange(value);
                                setValue("maritalStatus", value);
                              }}
                            >
                              <Option value="Single">Single</Option>
                              <Option value="Married">Married</Option>
                              <Option value="Divorced">Divorced</Option>
                            </Select>
                          )}
                        />
                        {errors.maritalStatus && (
                          <p className="text-danger">
                            Marital Status is required
                          </p>
                        )}
                      </div>
                    </Col>
                    {watch("maritalStatus") === "Married" && (
                      <>
                        <Col xs={12} md={6} lg={4}>
                          <div>
                            <label className="vendorpage_labelCss">
                              Spouse Name
                            </label>
                            <Controller
                              name="spouseName"
                              control={control}
                              defaultValue=""
                              rules={{ required: true }}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  type="text"
                                  className="inputcolumn-ourProfile"
                                  placeholder="Enter Spouse Name"
                                />
                              )}
                            />
                            {errors.WifeName && (
                              <p className="text-danger">
                                Spouse Name is required
                              </p>
                            )}
                          </div>
                        </Col>
                        <Col xs={12} md={6} lg={4}>
                          <div>
                            <label className="vendorpage_labelCss">
                              Spouse Occupation
                            </label>
                            <Controller
                              name="spouseOccupation"
                              control={control}
                              defaultValue=""
                              rules={{ required: true }}
                              render={({ field }) => (
                                <Select
                                  {...field}
                                  className="inputcolumn_drp"
                                  placeholder="Select Spouse Occupation"
                                  onChange={(value) => {
                                    field.onChange(value);
                                    setValue("spouseOccupation", value);
                                  }}
                                >
                                  <Option value="Working Person">
                                    Working Person
                                  </Option>
                                  <Option value="Housewife">Housewife</Option>
                                </Select>
                              )}
                            />
                            {errors.spouseOccupation && (
                              <p className="text-danger">
                                Spouse Occupation is required
                              </p>
                            )}
                          </div>
                        </Col>
                        <Col xs={12} md={6} lg={4}>
                          <div>
                            <label className="vendorpage_labelCss">
                              How Many Children?
                            </label>
                            <input
                              className="inputcolumn-ourProfile"
                              type="number"
                              {...register("totalChildren", { required: true })}
                              placeholder="How Many Children?"
                            />
                            {errors.totalChildren && (
                              <p className="text-danger">
                                How Many Children? is required
                              </p>
                            )}
                          </div>
                        </Col>
                        {fields.map((field, index) => (
                          <React.Fragment key={field.id}>
                            <Col xs={12} md={6} lg={4}>
                              <div>
                                <label>Child Gender {index + 1}</label>
                                <Controller
                                  name={`children.${index}.gender`}
                                  control={control}
                                  rules={{ required: true }}
                                  render={({ field }) => (
                                    <Select
                                      {...field}
                                      className="inputcolumn_drp"
                                      placeholder="Select Child Gender"
                                      options={[
                                        { value: "Male", label: "Male" },
                                        { value: "Female", label: "Female" },
                                      ]}
                                    />
                                  )}
                                />
                                {errors.children?.[index]?.gender && (
                                  <p className="text-danger">
                                    Child Gender is required
                                  </p>
                                )}
                              </div>
                            </Col>

                            <Col xs={12} md={6} lg={4}>
                              <div>
                                <label>Child Name {index + 1}</label>
                                <Controller
                                  name={`children.${index}.name`}
                                  control={control}
                                  rules={{ required: true }}
                                  render={({ field }) => (
                                    <input
                                      {...field}
                                      type="text"
                                      className="inputcolumn-ourProfile"
                                      placeholder="Enter Child Name"
                                    />
                                  )}
                                />
                                {errors.children?.[index]?.name && (
                                  <p className="text-danger">
                                    Child Name is required
                                  </p>
                                )}
                              </div>
                            </Col>

                            <Col xs={12} md={6} lg={4}>
                              <div>
                                <label>Child Age {index + 1}</label>
                                <Controller
                                  name={`children.${index}.age`}
                                  control={control}
                                  rules={{ required: true, min: 1 }}
                                  render={({ field }) => (
                                    <input
                                      {...field}
                                      type="number"
                                      className="inputcolumn-ourProfile"
                                      placeholder="Enter Child Age"
                                    />
                                  )}
                                />
                                {errors.children?.[index]?.age && (
                                  <p className="text-danger">
                                    Child Age is required and must be greater
                                    than 0
                                  </p>
                                )}
                              </div>
                            </Col>

                            <Col xs={12} md={6} lg={4}>
                              <div>
                                <label>Child School Name {index + 1}</label>
                                <Controller
                                  name={`children.${index}.schoolName`}
                                  control={control}
                                  rules={{ required: true }}
                                  render={({ field }) => (
                                    <input
                                      {...field}
                                      type="text"
                                      className="inputcolumn-ourProfile"
                                      placeholder="Enter Child School Name"
                                    />
                                  )}
                                />
                                {errors.children?.[index]?.schoolName && (
                                  <p className="text-danger">
                                    Child School Name is required
                                  </p>
                                )}
                              </div>
                            </Col>
                          </React.Fragment>
                        ))}

                        {watch("spouseOccupation") === "Working Person" && (
                          <>
                            <Col xs={12} md={6} lg={4}>
                              <div>
                                <label className="vendorpage_labelCss">
                                  Spouse Designation
                                </label>
                                <Controller
                                  name="spouseDesignation"
                                  control={control}
                                  defaultValue=""
                                  rules={{ required: true }}
                                  render={({ field }) => (
                                    <input
                                      {...field}
                                      type="text"
                                      className="inputcolumn-ourProfile"
                                      placeholder="Enter Wife's Designation"
                                    />
                                  )}
                                />
                                {errors.spouseDesignation && (
                                  <p className="text-danger">
                                    Spouse Designation is required
                                  </p>
                                )}
                              </div>
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                              <div>
                                <label className="vendorpage_labelCss">
                                  Spouse Income
                                </label>
                                <Controller
                                  name="spouseIncome"
                                  control={control}
                                  defaultValue=""
                                  rules={{ required: true }}
                                  render={({ field }) => (
                                    <input
                                      {...field}
                                      type="number"
                                      className="inputcolumn-ourProfile"
                                      placeholder="Enter spouse Income"
                                    />
                                  )}
                                />
                                {errors.WifeIncome && (
                                  <p className="text-danger">
                                    Spouse Income is required
                                  </p>
                                )}
                              </div>
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                              <div>
                                <label className="vendorpage_labelCss">
                                  Upload Your Spouse Pay Slip
                                </label>

                                <input
                                  type="file"
                                  className="inputcolumn-ourProfile"
                                  id="coApplicantDocsInput"
                                  accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                                  {...register("coApplicantDocs", {
                                    required: !userDetail?.coApplicantDocs,
                                  })}
                                  onChange={(e) => {
                                    if (e.target.files[0]) {
                                      const previewUrl = URL.createObjectURL(
                                        e.target.files[0]
                                      );
                                      setValue("spousePreview", previewUrl);
                                      setValue(
                                        "coApplicantDocsUrl",
                                        e.target.files[0].name
                                      );
                                    }
                                  }}
                                />

                                {!userDetail?.coApplicantDocs &&
                                  errors.coApplicantDocs && (
                                    <p className="text-danger">
                                      Spouse Pay Slip is required
                                    </p>
                                  )}
                              </div>
                            </Col>
                          </>
                        )}
                      </>
                    )}

                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Nationality
                        </label>
                        <input
                          className="inputcolumn-ourProfile"
                          type="text"
                          name="nationality"
                          {...register("nationality", { required: true })}
                          placeholder="Nationality"
                        />
                        {errors.nationality && (
                          <p className="text-danger">Nationality is required</p>
                        )}
                      </div>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Contact Information
                        </label>
                        <input
                          className="inputcolumn-ourProfile"
                          type="tel"
                          name="contactNumber"
                          {...register("contactNumber", { required: true })}
                          placeholder="Phone Number"
                        />
                        {errors.contactNumber && (
                          <p className="text-danger">
                            Phone Number is required
                          </p>
                        )}
                      </div>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">Country</label>
                        <Controller
                          name="country"
                          control={control}
                          defaultValue=""
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              className="inputcolumn_drp"
                              showSearch
                              placeholder="Select country"
                              optionFilterProp="children"
                              onChange={(value, option) => {
                                field.onChange(value);
                                setValue("country", value); // Update form state
                                getState(option.key); // Pass the country ID to getState
                              }}
                              filterOption={(input, option) =>
                                option?.children
                                  ?.toLowerCase()
                                  .includes(input.toLowerCase())
                              }
                            >
                              {countryList.map(({ id, name }) => (
                                <Select.Option key={id} value={name}>
                                  {name}
                                </Select.Option>
                              ))}
                            </Select>
                          )}
                        />
                        {errors.country && (
                          <p className="text-danger">Country is required</p>
                        )}
                      </div>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">State</label>
                        <br />
                        <Controller
                          name="state"
                          control={control}
                          defaultValue=""
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              showSearch
                              className="inputcolumn_drp"
                              placeholder="Select State"
                              onChange={(value, option) => {
                                field.onChange(value);
                                setValue("state", value); // Update form state
                                getDistrict(option.key);
                              }}
                            >
                              {stateList.map(({ id, name }) => (
                                <Select.Option key={id} value={name}>
                                  {name}
                                </Select.Option>
                              ))}
                            </Select>
                          )}
                        />
                        {errors.state && (
                          <p className="text-danger">State is required</p>
                        )}
                      </div>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">District</label>
                        <Controller
                          name="district"
                          control={control}
                          defaultValue=""
                          rules={{ required: "District is required" }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              showSearch
                              className="inputcolumn_drp"
                              placeholder="Select District"
                              optionFilterProp="children"
                              onChange={(value, option) => {
                                field.onChange(value); // Update the field value
                                setValue("district", value); // Update the form state
                                getCity(option.key); // Fetch city based on the selected district
                              }}
                              filterOption={(input, option) =>
                                option?.children
                                  ?.toLowerCase()
                                  .includes(input.toLowerCase())
                              }
                            >
                              {districtList.map(({ id, name }) => (
                                <Select.Option key={id} value={name}>
                                  {name}
                                </Select.Option>
                              ))}
                            </Select>
                          )}
                        />
                        {errors.district && (
                          <p className="text-danger">
                            {errors.district.message}
                          </p>
                        )}
                      </div>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">City</label>
                        <br />
                        <Controller
                          name="city"
                          control={control}
                          defaultValue=""
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              className="inputcolumn_drp"
                              placeholder="Select City"
                              onChange={(value) => {
                                field.onChange(value);
                                setValue("city", value); // Update form state
                              }}
                            >
                              {cityList.map(({ id, cityName }) => (
                                <Select.Option key={id} value={cityName}>
                                  {cityName}
                                </Select.Option>
                              ))}
                            </Select>
                          )}
                        />
                        {errors.city && (
                          <p className="text-danger">City is required</p>
                        )}
                      </div>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Residential Address
                        </label>
                        <textarea
                          className="inputcolumn-ourProfile"
                          style={{ height: "60px" }}
                          name="address"
                          {...register("address", { required: true })}
                          placeholder="Residential Address"
                        />
                        {errors.address && (
                          <p className="text-danger">Address is required</p>
                        )}
                      </div>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">Pin Code</label>
                        <input
                          className="inputcolumn-ourProfile"
                          type="number"
                          name="pinCode"
                          {...register("pinCode", { required: true })}
                          placeholder="Pin Code"
                        />
                        {errors.pinCode && (
                          <p className="text-danger">Pin Code is required</p>
                        )}
                      </div>
                    </Col>
                  </Row>

                  {/* <Row className="py-2">
                    <Col xs={12} md={6} lg={4}>
                      {(userDetail?.coApplicantDocs ||
                        watch("spousePreview")) && (
                        <>
                          <img
                            src={
                              watch("spousePreview") ||
                              userDetail.coApplicantDocs
                            }
                            alt="Preview"
                            style={{
                              width: "150px",
                              height: "150px",
                              objectFit: "cover",
                              marginTop: "10px",
                            }}
                          />
                          <p>Spouse pay slip</p>
                        </>
                      )}
                    </Col>
                  </Row> */}
                </div>

                <div className="upgrade_column mb-3 mt-3">
                  <Button className="button1" type="submit">
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Col>
      </Container>
      <ToastContainer />
      <br />
      <br />
    </div>
  );
}

export default LoanForm;
