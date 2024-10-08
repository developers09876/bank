import React, { useState, useEffect } from "react";
// import Api from "../../Api";
import { useForm } from "react-hook-form";
import { Row, Col, Button } from "react-bootstrap";
import "./MyProfile.scss";
import { Select } from "antd";
import { Option } from "antd/lib/mentions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TabsVendor() {
  const [typeValue, setTypeValue] = useState();
  const [serviceType, setServiceType] = useState([]);
  const [selectYear, setSelectYear] = useState();
  const [languageDetails, setLanguageDetails] = useState();
  const [countryValue, setCountryValue] = useState();
  const [countryId, setCountryId] = useState();
  const [country, setCountry] = useState(null);
  const [stateValue, setStateValue] = useState();
  const [stateList, setstateList] = useState([]);

  const [selectedState, setSelectedState] = useState(null);
  const [districtValue, setDistrictValue] = useState();
  const [districtList, setdistrictList] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [cityvalue, setCityValue] = useState();
  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectArea, setselectArea] = useState("");
  const [areaList, setareaList] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);

  const [data, setData] = useState();
  const [IyerPhone, setIyerPhone] = useState();
  const [IyerName, setIyerName] = useState();
  const id = localStorage.getItem("vendor_id");
  const [poojaType, setPoojaTypeValue] = useState();
  console.log("pooja", poojaType);

  const typeDetails = [
    { name: "Inside Temple", value: "inside" },
    { name: "Outside Temple", value: "outside" },
    { name: "Both", value: "both" },
  ];
  const year = [
    { name: "1990", value: "1990" },
    { name: "1991", value: "1991" },
    { name: "1992", value: "1992" },
    { name: "1993", value: "1993" },
    { name: "1994", value: "1994" },
    { name: "1995", value: "1995" },
    { name: "1996", value: "1996" },
    { name: "1997", value: "1997" },
    { name: "1998", value: "1998" },
    { name: "1999", value: "1999" },
    { name: "2000", value: "2000" },
    { name: "2001", value: "2001" },
    { name: "2002", value: "2002" },
    { name: "2003", value: "2003" },
    { name: "2004", value: "2004" },
    { name: "2005", value: "2005" },
    { name: "2006", value: "2006" },
    { name: "2007", value: "2007" },
    { name: "2008", value: "2008" },
    { name: "2009", value: "2009" },
    { name: "2010", value: "2010" },
    { name: "2011", value: "2011" },
    { name: "2012", value: "2012" },
    { name: "2013", value: "2013" },
    { name: "2014", value: "2014" },
    { name: "2015", value: "2015" },
    { name: "2016", value: "2016" },
    { name: "2017", value: "2017" },
    { name: "2018", value: "2018" },
    { name: "2019", value: "2019" },
    { name: "2020", value: "2020" },
    { name: "2021", value: "2021" },
    { name: "2022", value: "2022" },
    { name: "2023", value: "2023" },
    { name: "2024", value: "2024" },
  ];

  const serviceTypes = [
    { name: "Marriage Astrology", value: "Marriageastrology" },
    { name: "House Warming", value: "HouseWarming" },
    { name: "Ganesh Puja", value: "GaneshPuja" },
    { name: "Satyanarayana Vrat", value: "SatyanarayanaVrat" },
    { name: "Namkaran Ceremony", value: "NamkaranCeremony" },
    { name: "Rudrabhishek", value: "Rudrabhishek" },
    { name: "Annaprasan", value: "Annaprasan" },
    { name: "Navagraha Puja", value: "NavagrahaPuja" },
    { name: "Shanti Puja", value: "ShantiPuja" },
    { name: "Chandi Homa", value: "ChandiHoma" },
    { name: "Vastu Puja", value: "VastuPuja" },
    { name: "Durga Puja", value: "DurgaPuja" },
    { name: "Pitrupaksha", value: "Pitrupaksha" },
    { name: "Kaal Sarp Dosh Puja", value: "KaalSarpDoshPuja" },
    { name: "Sankat Mochan Hanuman Puja", value: "SankatMochanHanumanPuja" },
  ];

  const languageList = [
    { language: "Male", value: "Male" },
    { language: "Female", value: "Female" },
    { language: "Other", value: "Other" },


  ];
  useEffect(() => {
    getCountry();
  }, []);
  useEffect(() => {
    if (data?.country) {
      getCountry();
    }
  }, [data?.country]);

  useEffect(() => {
    if (data?.country) {
      getState(data.country);
    }
  }, [data?.country]);

  useEffect(() => {
    if (data?.state) {
      getDistrict(data.state);
    }
  }, [data?.state]);

  useEffect(() => {
    if (data?.district) {
      getCity(data.district);
    }
  }, [data?.district]);

//   useEffect(() => {
//     if (data?.city) {
//       getArea(data?.city);
//     }
//   }, [data?.city]);

  const {
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const getCountry = () => {
    // Api.get(`/country/getAll`).then((res) => {
    //   setCountry(res.data);
    //   const countryDetails = res.data.find(
    //     (stateObj) => stateObj.id === parseInt(data?.country)
    //   );
    //   if (countryDetails) {
    //     setCountryValue(countryDetails.country);
    //   } else {
    //     console.log("Country not found");
    //   }
    // });
  };

  const getState = (country_id) => {
    // Api.get(`/state/getState/${country_id}`).then((res) => {
    //   setstateList(res.data);
    //   const stateDetails = res.data.find(
    //     (stateObj) => stateObj.id === parseInt(data?.state)
    //   );
    //   if (stateDetails) {
    //     setSelectedState(stateDetails.state);
    //   } else {
    //     console.log("State not found");
    //   }
    // });
  };

  const getDistrict = (state_id) => {
    setStateValue(state_id);
    // Api.get(`/district/getdistrict/${state_id}`).then((res) => {
    //   setdistrictList(res.data);
    //   const districtDetails = res.data.find(
    //     (stateObj) => stateObj.id === parseInt(data?.district)
    //   );
    //   if (districtDetails) {
    //     setSelectedDistrict(districtDetails.district);
    //   } else {
    //     console.log("District not found");
    //   }
    // });
  };

  const getCity = (districtId) => {
    setDistrictValue(districtId);
    // Api.get(`/city/getCity/${districtId}`).then((res) => {
    //   setCityList(res.data);
    //   const cityDetails = res.data.find(
    //     (stateObj) => stateObj.id === parseInt(data?.city)
    //   );
    //   if (cityDetails) {
    //     setSelectedCity(cityDetails.city);
    //   } else {
    //     console.log("City not found");
    //   }
    // });
  };

//   const getArea = async (id) => {
//     await Api.get(
//       `${process.env.REACT_APP_DEV_BASE_URL}/area/getArea/${id}`
//     ).then((res) => {
//       const area_name = res.data;
//       setareaList(area_name);
//       const areaDetails = res.data.find(
//         (stateObj) => stateObj.area_id === parseInt(data?.area)
//       );
//       if (areaDetails) {
//         setSelectedArea(areaDetails.area_name);
//       } else {
//         console.log("Area not found");
//       }
//     });
//   };

  const [selectImage, setSelectImage] = useState(null);

  const setImage = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

//   useEffect(() => {
//     getValue();
//     // getByUser();
//   }, []);

//   const getValue = async () => {
//     try {
//     //   const res = await Api.get(`/vendor/getOne/${id}`);
//       const data = res.data[0];
//       setData(res.data[0]);
//       setSelectImage(data.imageUrl);
//       setLanguageDetails(JSON.parse(data.language) || []);
//       setStateValue(data.state);
//       setDistrictValue(data.district);
//       setCityValue(data.city);
//       setselectArea(data.area);
//       setTypeValue(data.type);
//       setServiceType(JSON.parse(data.serviceType) || []);
//       setSelectYear(data.yearofEstablish);

//       reset({
//         priestName: data.priestName,
//         templeName: data.templeName,
//         aadharNumber: data.aadharNumber,
//         mobileNumber: data.mobileNumber,
//         AlternateNumber: data.alternateNumber,
//         yearofExperience: data.yearofExperience,
//         poojaCounts: data.poojaCounts,
//         pincode: data.pincode,
//         address: data.address,
//       });
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const getByUser = async () => {
//     await Api.get(`/vendor/getOne/${id}`).then((res) => {
//       setIyerName(res?.data[0]?.vendor_name);
//       setIyerPhone(res?.data[0]?.phone_number);
//     });
//   };

  const isUpdating = data != undefined && data?.address > "";

  const handleFormSubmit = async () => {
    const Details = {
      vendorName: IyerName,
      templeName: getValues().templeName,
      aadharNumber: getValues().aadharNumber,
      mobileNumber: IyerPhone,
      alternateNumber: getValues().AlternateNumber,
      address: getValues().address,
      pincode: getValues().pincode,
      language: languageDetails,
      country: countryId,
      state: stateValue,
      district: districtValue,
      city: cityvalue,
      area: selectArea,
      type: typeValue,
      yearofExperience: getValues().yearofExperience,
      poojaCounts: getValues().poojaCounts,
      yearofEstablish: selectYear,
      serviceType: serviceType,
      image: "",
      countryName: countryValue,
      districtName: selectedState,
      stateName: selectedDistrict,
      cityName: selectedCity,
      areaName: selectedArea,
      poojaType: poojaType,
    };

    const data = new FormData();
    data.append("file", selectImage);
    data.append("upload_preset", "darshan");

    // const response = await fetch(
    //   "https://api.cloudinary.com/v1_1/dzblzw7ll/image/upload",
    //   {
    //     method: "POST",
    //     body: data,
    //   }
    // );
    // const cloudinaryData = await response.json();
    // Details.image = cloudinaryData.secure_url;

    // await Api.put(`/vendor/update/${id}`, Details).then((resp) => {
    //   console.log(resp, "respppppp");
    //   toast.success("Form updated successfully")
    // });
  };
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
                <p className="ourProfile_Heading_div">Personal Details</p>

                <Row>
                  <Col xs={12} md={4} lg={6} className="d-flex align-items-end">
                    <div>
                      <div>
                        <label className="vendorpage_labelCss">
                          Select Image
                        </label>
                      </div>
                      <div>
                        <input
                          className="inputcolumn-ourProfile mt-2"
                          type="file"
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} md={4} lg={6}>
                    {selectImage && (
                      <img
                        src={selectImage}
                        alt="Selected"
                        style={{ width: "60%", height: "30vh" }}
                      />
                    )}
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col xs={12} md={4} lg={6}>
                    <div>
                      <div>
                        <label className="vendorpage_labelCss">
                          Full Name
                        </label>
                      </div>
                      <div>
                        <input
                          className="inputcolumn-ourProfile"
                          type="text"
                          value={IyerName}
                          name="priestName"
                          {...register("priestName", { required: true })}
                          required="required"
                          placeholder="Priest Name"
                          onChange={(e) => setIyerName(e.target.value)}
                        />
                        {errors.priestName && (
                          <p className="text-danger">Name is required</p>
                        )}
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} md={4} lg={6}>
                    <div>
                      <div>
                        <label className="vendorpage_labelCss">
                          Marital Status
                        </label>
                      </div>
                      <div>
                        <input
                          className="inputcolumn-ourProfile"
                          type="text"
                          name="templeName"
                          {...register("templeName", { required: true })}
                          required="required"
                          placeholder="Temple Name"
                        />
                        {errors.templeName && (
                          <p className="text-danger">Name is required</p>
                        )}
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={4} lg={6}>
                    <div>
                      <div>
                        <label className="vendorpage_labelCss">
                          Aadhar Number
                        </label>
                      </div>
                      <div>
                        <input
                          className="inputcolumn-ourProfile"
                          type="number"
                          name="aadharNumber"
                          {...register("aadharNumber", { required: true })}
                          required="required"
                          placeholder="Aadhar Number"
                        />
                        {errors.aadharNumber && (
                          <p className="text-danger">
                            aadharNumber is required
                          </p>
                        )}
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} md={4} lg={6}>
                    <div>
                      <div>
                        <label className="vendorpage_labelCss">
                          Mobile Number
                        </label>
                      </div>
                      <div>
                        <input
                          className="inputcolumn-ourProfile"
                          type="number"
                          name="mobileNumber"
                          value={IyerPhone}
                          // {...register("mobileNumber", { required: true })}
                          required="required"
                          placeholder="Mobile Number"
                          onChange={(e) => setIyerPhone(e.target.value)}
                        />
                        {errors.mobileNumber && (
                          <p className="text-danger">
                            MobileNumber is required
                          </p>
                        )}
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={4} lg={6}>
                    <div>
                      <div>
                        <label className="vendorpage_labelCss">
                          Alternate Number
                        </label>
                      </div>
                      <div>
                        <input
                          className="inputcolumn-ourProfile"
                          type="number"
                          name="AlternateNumber"
                          {...register("AlternateNumber", { required: true })}
                          required="required"
                          placeholder="Alternate Number"
                        />
                        {errors.AlternateNumber && (
                          <p className="text-danger">
                            AlternateNumber is required
                          </p>
                        )}
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} md={4} lg={6}>
                    <div>
                      <div>
                        <label className="vendorpage_labelCss">Gender</label>
                      </div>
                      <div>
                        <Select
                          className="inputcolumn_drp"
                          mode="multiple"
                          allowClear
                          value={languageDetails}
                          onChange={(e) => {
                            setLanguageDetails(e);
                          }}
                          placeholder="Select a Type"
                          style={{ width: "90%" }}
                          maxTagCount="responsive"
                        >
                          {languageList?.map((option) => (
                            <Option value={option.value}>{option.name}</Option>
                          ))}
                        </Select>
                        {errors.language && (
                          <p className="error-text-color-Profile">
                            Language is required
                          </p>
                        )}
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={4} lg={6}>
                    <div>
                      <div>
                        <label className="vendorpage_labelCss">Country</label>
                      </div>
                      <div>
                        <Select
                          className="inputcolumn_drp"
                          value={countryValue}
                          onChange={(e) => {
                            const valueId = country?.find(
                              (list) => list.country === e
                            );
                            setCountryValue(e);
                            setCountryId(valueId.id);
                            getState(valueId.id);
                          }}
                          placeholder="Select a Country"
                          style={{ border: "none" }}
                        >
                          {country?.map((option) => (
                            <Option key={option.id} value={option.country}>
                              {option.country}
                            </Option>
                          ))}
                        </Select>
                        {errors.country && (
                          <p className="error-text-color-Profile">
                            Country is required
                          </p>
                        )}
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} md={4} lg={6}>
                    <div>
                      <div>
                        <label className="vendorpage_labelCss">State</label>
                      </div>
                      <div>
                        <Select
                          showSearch
                          name="selectState"
                          placeholder="Select State Name"
                          allowClear
                          className="inputcolumn_drp"
                          value={selectedState}
                          onChange={(e) => {
                            const valueId = stateList?.find(
                              (list) => list.state === e
                            );
                            setSelectedState(e);
                            getDistrict(valueId.id);
                          }}
                        >
                          {stateList?.map((list, i) => (
                            <Option value={list?.state} key={i}>
                              {list?.state}
                            </Option>
                          ))}
                        </Select>

                        {errors.state && (
                          <p className="error-text-color-Profile">
                            State is required
                          </p>
                        )}
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={4} lg={6}>
                    <div>
                      <div>
                        <label className="vendorpage_labelCss">District</label>
                      </div>
                      <div>
                        <Select
                          showSearch
                          name="selectDistrict"
                          placeholder="Select District Name*"
                          allowclear="true"
                          className="inputcolumn_drp"
                          value={selectedDistrict}
                          onChange={(e) => {
                            const valueId = districtList?.find(
                              (list) => list.district === e
                            );
                            setSelectedDistrict(e);
                            getCity(valueId.id);
                          }}
                        >
                          {districtList?.map((list, i) => (
                            <Option value={list?.district} key={i}>
                              {list?.district}
                            </Option>
                          ))}
                        </Select>
                        {errors.district && (
                          <p className="error-text-color-Profile">
                            District is required
                          </p>
                        )}{" "}
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} md={4} lg={6}>
                    <div>
                      <div>
                        <label className="vendorpage_labelCss">City</label>
                      </div>
                      <div>
                        <Select
                          showSearch
                          name="selectCity"
                          placeholder="Select City Name*"
                          allowclear="true"
                          className="inputcolumn_drp"
                          value={selectedCity}
                          onChange={(e) => {
                            const valueId = cityList?.find(
                              (list) => list.city === e
                            );
                            setCityValue(valueId.id);
                            setSelectedCity(e);
                            // getArea(valueId.id);
                          }}
                        >
                          {cityList?.map((list, i) => (
                            <Option value={list.city} key={i}>
                              {list?.city}
                            </Option>
                          ))}
                        </Select>
                        {errors.city && (
                          <p className="error-text-color-Profile">
                            City is required
                          </p>
                        )}
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={4} lg={6}>
                    <div>
                      <div>
                        <label className="vendorpage_labelCss">Area</label>
                      </div>
                      <div>
                        <Select
                          showSearch
                          name="selectArea"
                          placeholder="Select Area Name*"
                          allowclear="true"
                          className="inputcolumn_drp"
                          value={selectedArea}
                          onChange={(e) => {
                            const valueId = areaList?.find(
                              (list) => list.area_name === e
                            );
                            setSelectedArea(e);
                            setselectArea(valueId.area_id);
                          }}
                        >
                          {areaList?.map((list, i) => (
                            <Option value={list.area_name} key={i}>
                              {list?.area_name}
                            </Option>
                          ))}
                        </Select>
                        {errors.area && (
                          <p className="error-text-color-Profile">
                            Area is required
                          </p>
                        )}
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} md={4} lg={6}>
                    <div>
                      <div>
                        <label className="vendorpage_labelCss">Address</label>
                      </div>
                      <div>
                        <textarea
                          className="inputcolumn-ourProfile"
                          type="textarea"
                          name="address"
                          {...register("address", { required: true })}
                          required="required"
                          placeholder="Address"
                        />
                        {errors.address && (
                          <p className="text-danger">Address is required</p>
                        )}
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={4} lg={6}>
                    <div>
                      <div>
                        <label className="vendorpage_labelCss">Pincode</label>
                      </div>
                      <div>
                        <input
                          className="inputcolumn-ourProfile"
                          type="number"
                          name="priestName"
                          {...register("pincode", { required: true })}
                          required="required"
                          placeholder="pincode"
                        />
                        {errors.pincode && (
                          <p className="text-danger">Name is required</p>
                        )}
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div>
                <p className="ourProfile_Heading_div">Professional Details</p>

                <Row>
                  <Col xs={12} md={4} lg={6}>
                    <div>
                      <div>
                        <label className="vendorpage_labelCss">Employment Status</label>
                      </div>
                      <div>
                        <Select
                          className="inputcolumn_drp"
                          value={typeValue}
                          onChange={(e) => {
                            setTypeValue(e);
                          }}
                          placeholder="Select a Type"
                          style={{ border: "none" }}
                        >
                          {typeDetails?.map((option) => (
                            <Option value={option.value}>{option.name}</Option>
                          ))}
                        </Select>
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} md={4} lg={6}>
                    <div>
                      <div>
                        <label className="vendorpage_labelCss">
                          Pooja Type
                        </label>
                      </div>
                      <div>
                        <Select
                          className="inputcolumn_drp"
                          placeholder="Select a Type"
                          style={{ border: "none" }}
                          value={poojaType}
                          onChange={(e) => {
                            setPoojaTypeValue(e);
                          }}
                        >
                          {/* {typeDetails?.map((option) => ( */}
                          <Option value="auspicious">Auspicious</Option>
                          <Option value="inaspicious">Inauspicious</Option>
                          <Option value="both">Both</Option>

                          {/* ))} */}
                        </Select>
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} md={4} lg={6}>
                    <div className="select-multiple">
                      <label className="vendorpage_labelCss">Employment Status</label>
                      <Select
                        value={serviceType}
                        mode="multiple"
                        allowClear
                        onChange={(e) => {
                          setServiceType(e);
                        }}
                        placeholder="Select a Type"
                        style={{ width: "90%" }}
                        maxTagCount="responsive"
                      >
                        {serviceTypes?.map((option) => (
                          <Option value={option.value} key={option.value}>
                            {option.name}
                          </Option>
                        ))}
                      </Select>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={4} lg={6}>
                    <div>
                      <div>
                        <label className="vendorpage_labelCss">
                          Year of Experience
                        </label>
                      </div>
                      <div>
                        <input
                          className="inputcolumn-ourProfile"
                          type="number"
                          name="yearofExperience"
                          {...register("yearofExperience", { required: true })}
                          required="required"
                          placeholder="Experience"
                        />
                        {errors.yearofExperience && (
                          <p className="text-danger">
                            yearofExperience is required
                          </p>
                        )}
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} md={4} lg={6}>
                    <div>
                      <div>
                        <label className="vendorpage_labelCss">
                          Pooja Counts
                        </label>
                      </div>
                      <div>
                        <input
                          className="inputcolumn-ourProfile"
                          type="number"
                          name="poojaCounts"
                          {...register("poojaCounts", { required: true })}
                          required="required"
                          placeholder="Pooja Counts"
                        />
                        {errors.poojaCounts && (
                          <p className="text-danger">poojaCounts is required</p>
                        )}
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={4} lg={6}>
                    <div>
                      <div>
                        <label className="vendorpage_labelCss">
                          Year of Establish
                        </label>
                      </div>
                      <Select
                        className="inputcolumn_drp"
                        value={selectYear}
                        onChange={(e) => {
                          setSelectYear(e);
                        }}
                        placeholder="Select a Type"
                        style={{ border: "none" }}
                      >
                        {year?.map((option) => (
                          <Option value={option.value}>{option.name}</Option>
                        ))}
                      </Select>
                      <div>
                        {errors.yearofEstablish && (
                          <p className="text-danger">
                            yearofEstablish is required
                          </p>
                        )}
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="upgrade_column mb-3">
                <Button className="button1" type="submit">
                  Updade
                </Button>
              </div>
            </form>
          </div>
        </div>
        {/* </Card> */}
      </Col>
      <ToastContainer/>
    </div>
  );
}

export default TabsVendor;
