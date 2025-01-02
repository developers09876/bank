import React, { useState, useEffect } from "react";
// import Api from "../../Api";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { Row, Col, Button } from "react-bootstrap";
import "./MyProfile.scss";
import { Select } from "antd";
import { Option } from "antd/lib/mentions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Api from "../../../Api";

function TabsVendor() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const userid = localStorage.getItem("id");
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [cityList, setCityList] = useState([]);

  console.log("districtList", districtList);
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
      fullName: data.fullName,
      dob: data.dob,
      gender: data.gender,
      maritalStatus: data.MaritalStatus,
      nationality: data.nationality,
      contact: data.contact,
      address: data.address,
      city: data.city,
      district: data.district,
      state: data.state,
      country: data.Country,
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
    console.log("Details", Details);

    // try {
    //   const response = await axios.post(
    //     `http://localhost:5000/loanform/createloanapplications`,
    //     Details
    //   );
    //   console.log(response.data.data, "Form submitted successfully");
    //   localStorage.setItem("loanApplicationId", response.data.data._id);
    //   toast.success("Form submitted successfully");
    // } catch (error) {
    //   console.error("Form submission failed", error);
    //   toast.error("An error occurred while submitting the form");
    // }
  };

  const [childCount, setChildCount] = useState(0);
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
      <Col xs={12} md={12} lg={12}>
        <div
          className="ourProfileParentdiv"
          style={{ backgroundColor: "white", padding: "10px 20px" }}
        >
          <div style={{ paddingLeft: "10px" }}>
            <center>
              {" "}
              <h4 className="pages-title mt-3 mb-5"> User Details</h4>
            </center>

            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <div>
                <Row>
                  <Col xs={12} md={6} lg={4}>
                    <div>
                      <label className="vendorpage_labelCss">Full Name</label>
                      <input
                        className="inputcolumn-ourProfile"
                        type="text"
                        name="fullName"
                        {...register("fullName", { required: true })}
                        placeholder="Full Name"
                      />
                      {errors.fullName && (
                        <p className="text-danger">Full Name is required</p>
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
                        <p className="text-danger">Date of Birth is required</p>
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
                        name="MaritalStatus"
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
                              setValue("MaritalStatus", value);
                            }}
                          >
                            <Option value="Single">Single</Option>
                            <Option value="Married">Married</Option>
                            <Option value="Divorced">Divorced</Option>
                          </Select>
                        )}
                      />
                      {errors.MaritalStatus && (
                        <p className="text-danger">
                          Marital Status is required
                        </p>
                      )}
                    </div>
                  </Col>
                  {watch("MaritalStatus") === "Married" && (
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
                                  Child Age is required and must be greater than
                                  0
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
                                // className="form-control"
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
                                // className="form-control"
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
                                Upload Your Spouse Pay slip
                              </label>
                              <input
                                className="inputcolumn-ourProfile"
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                {...register("coApplicantDocs")}
                                placeholder="If applicable"
                              />
                            </div>
                          </Col>
                        </>
                      )}
                    </>
                  )}

                  <Col xs={12} md={6} lg={4}>
                    <div>
                      <label className="vendorpage_labelCss">Nationality</label>
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
                        name="contact"
                        {...register("contact", { required: true })}
                        placeholder="Phone Number"
                      />
                      {errors.contact && (
                        <p className="text-danger">Phone Number is required</p>
                      )}
                    </div>
                  </Col>
                  <Col xs={12} md={6} lg={4}>
                    <div>
                      <label className="vendorpage_labelCss">Country</label>
                      <Controller
                        name="Country"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            className="inputcolumn_drp"
                            showSearch
                            placeholder="Select Country"
                            optionFilterProp="children"
                            onChange={(value, option) => {
                              field.onChange(value);
                              setValue("Country", value); // Update form state
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
                      {errors.Country && (
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
                              field.onChange(value); 
                              setValue("district", value); 
                              getCity(option.key); 
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
                        <p className="text-danger">{errors.district.message}</p>
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
                              setValue("city", value); 
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
                  <Col xs={12} md={6} lg={4}>
                    <div>
                      <label className="vendorpage_labelCss">
                        Photographs (Passport size)
                      </label>
                      <input
                        className="inputcolumn-ourProfile"
                        type="file"
                        accept="image/*"
                        {...register("photographs", { required: true })}
                      />
                      {errors.photographs && (
                        <p className="text-danger">Photographs are required</p>
                      )}
                    </div>
                  </Col>
                </Row>
              </div>

              <div className="upgrade_column mb-3 mt-3">
                <Button className="button1" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
        {/* </Card> */}
      </Col>
      <ToastContainer />
    </div>
  );
}

export default TabsVendor;
