import React, { useState, useEffect } from "react";
// import Api from "../../Api";
import { Controller, useForm } from "react-hook-form";
import { Row, Col, Button, Container } from "react-bootstrap";
import "../dashboard/user/MyProfile.scss";
import { Select } from "antd";
import { Option } from "antd/lib/mentions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Insurance() {
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

  const [Premium, setPremium] = useState();
console.log('step1', Premium)

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
    control,
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
        <Container>
      <Col xs={12} md={12} lg={12}>
        <div
          className="ourProfileParentdiv"
          style={{ backgroundColor: "white", padding: "10px 20px" }}
        >
          <div style={{ paddingLeft: "10px" }}>
            <center>
              {" "}
              <h4 className="pages-title mt-3 mb-5"> Insurance Policy</h4>
            </center>

            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <div>
                <p className="ourProfile_Heading_div">Personal Details</p>

                <Row>
  {/* Full Name */}
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
      {errors.fullName && <p className="text-danger">Full Name is required</p>}
    </div>
  </Col>

  {/* Date of Birth */}
  <Col xs={12} md={6} lg={4}>
  <div>
    <label className="vendorpage_labelCss">Date of Birth</label>
    <input
      className="inputcolumn-ourProfile"
      type="date"
      name="dob"
      max={new Date().toISOString().split("T")[0]}  // Prevent future dates
      {...register("dob", { required: true })}
    />
    {errors.dob && <p className="text-danger">Date of Birth is required</p>}
  </div>
</Col>


  {/* Gender */}
  <Col xs={12} md={6} lg={4}>
          <div>
            <label className="vendorpage_labelCss">Gender</label>
            <Controller
              name="gender"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <Select {...field} className="inputcolumn_drp" placeholder="Select Gender">
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                  <Option value="Other">Other</Option>
                </Select>
              )}
            />
            {errors.gender && <p className="text-danger">Gender is required</p>}
          </div>
        </Col>

  {/* Marital Status */}
  <Col xs={12} md={6} lg={4}>
          <div>
            <label className="vendorpage_labelCss">Marital Status</label>
            <Controller
              name="MaritalStatus"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <Select {...field} className="inputcolumn_drp" placeholder="Select Gender">
                  <Option value="Single">Single</Option>
                  <Option value="Married">Married</Option>
                  <Option value="Divorced">Divorced</Option>
                </Select>
              )}
            />
            {errors.MaritalStatus && <p className="text-danger">Marital Status is required</p>}
          </div>
        </Col>
  {/* <Col xs={12} md={6} lg={4}>
    <div>
      <label className="vendorpage_labelCss">Marital Status</label>
      <Select
        className="inputcolumn_drp"
        placeholder="Select Marital Status"
        {...register("maritalStatus", { required: true })}
        options={[
          { value: "single", label: "Single" },
          { value: "married", label: "Married" },
          { value: "divorced", label: "Divorced" }
        ]}
      />
      {errors.maritalStatus && (
        <p className="text-danger">Marital Status is required</p>
      )}
    </div>
  </Col> */}

  {/* Nationality */}
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

  {/* PAN */}
  <Col xs={12} md={6} lg={4}>
    <div>
      <label className="vendorpage_labelCss">PAN Number</label>
      <input
        className="inputcolumn-ourProfile"
        type="text"
        name="pan"
        {...register("pan", { required: true })}
        placeholder="PAN Number"
      />
      {errors.pan && <p className="text-danger">PAN is required</p>}
    </div>
  </Col>

  {/* Aadhaar Number */}
  <Col xs={12} md={6} lg={4}>
    <div>
      <label className="vendorpage_labelCss">Aadhaar Number</label>
      <input
        className="inputcolumn-ourProfile"
        type="number"
        name="aadhaar"
        {...register("aadhaar", { required: true })}
        placeholder="Aadhaar Number"
      />
      {errors.aadhaar && (
        <p className="text-danger">Aadhaar Number is required</p>
      )}
    </div>
  </Col>

  {/* Contact Information */}
  <Col xs={12} md={6} lg={4}>
    <div>
      <label className="vendorpage_labelCss">Contact Information</label>
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

  {/* Residential Address */}
  <Col xs={12} md={6} lg={4}>
    <div>
      <label className="vendorpage_labelCss">Residential Address</label>
      <textarea
        className="inputcolumn-ourProfile"
        name="address"
        {...register("address", { required: true })}
        placeholder="Residential Address"
      />
      {errors.address && (
        <p className="text-danger">Address is required</p>
      )}
    </div>
  </Col>

  {/* Occupation */}
  <Col xs={12} md={6} lg={4}>
    <div>
      <label className="vendorpage_labelCss">Occupation</label>
      <input
        className="inputcolumn-ourProfile"
        type="text"
        name="occupation"
        {...register("occupation", { required: true })}
        placeholder="Occupation"
      />
      {errors.occupation && (
        <p className="text-danger">Occupation is required</p>
      )}
    </div>
  </Col>

  {/* Annual Income */}
  <Col xs={12} md={6} lg={4}>
    <div>
      <label className="vendorpage_labelCss">Annual Income</label>
      <input
        className="inputcolumn-ourProfile"
        type="number"
        name="income"
        {...register("income", { required: true })}
        placeholder="Annual Income"
      />
      {errors.income && (
        <p className="text-danger">Annual Income is required</p>
      )}
    </div>
  </Col>

  {/* Bank Account Details */}
  <Col xs={12} md={6} lg={4}>
    <div>
      <label className="vendorpage_labelCss">Bank Account Details</label>
      <input
        className="inputcolumn-ourProfile"
        type="text"
        name="bankAccount"
        {...register("bankAccount", { required: true })}
        placeholder="Account Number"
      />
      {errors.bankAccount && (
        <p className="text-danger">Bank Account is required</p>
      )}
    </div>
  </Col>

  {/* Policy Type */}
  <Col xs={12} md={6} lg={4}>
          <div>
            <label className="vendorpage_labelCss">Policy Type</label>
            <Controller
              name="PolicyType"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <Select {...field} className="inputcolumn_drp" placeholder="Select Gender">
                  <Option value="Single">Life Insurance</Option>
                  <Option value="Health Insurance">Health Insurance</Option>
                  <Option value="Vehicle">Vehicle Insurance</Option>
                </Select>
              )}
            />
            {errors.PolicyType && <p className="text-danger">Policy Type is required</p>}
          </div>
        </Col>
  {/* <Col xs={12} md={6} lg={4}>
    <div>
      <label className="vendorpage_labelCss">Policy Type</label>
      <Select
        className="inputcolumn_drp"
        placeholder="Select Policy Type"
        {...register("policyType", { required: true })}
        options={[
          { value: "life", label: "Life Insurance" },
          { value: "health", label: "Health Insurance" },
          { value: "vehicle", label: "Vehicle Insurance" }
        ]}
      />
      {errors.policyType && (
        <p className="text-danger">Policy Type is required</p>
      )}
    </div>
  </Col> */}

  {/* Policy Term */}
  <Col xs={12} md={6} lg={4}>
    <div>
      <label className="vendorpage_labelCss">Policy Term</label>
      <input
        className="inputcolumn-ourProfile"
        type="number"
        name="policyTerm"
        {...register("policyTerm", { required: true })}
        placeholder="Policy Term (years)"
      />
      {errors.policyTerm && (
        <p className="text-danger">Policy Term is required</p>
      )}
    </div>
  </Col>

  {/* Sum Assured */}
  <Col xs={12} md={6} lg={4}>
    <div>
      <label className="vendorpage_labelCss">Sum Assured</label>
      <input
        className="inputcolumn-ourProfile"
        type="number"
        name="sumAssured"
        {...register("sumAssured", { required: true })}
        placeholder="Sum Assured"
      />
      {errors.sumAssured && (
        <p className="text-danger">Sum Assured is required</p>
      )}
    </div>
  </Col>
   {/* Medical History */}
   <Col xs={12} md={6} lg={4}>
    <div>
      <label className="vendorpage_labelCss">Medical History</label>
      <textarea
        className="inputcolumn-ourProfile"
        {...register("medicalHistory", { required: true })}
        placeholder="Enter existing illnesses or conditions"
      />
      {errors.medicalHistory && <p className="text-danger">Medical History is required</p>}
    </div>
  </Col>

  {/* Family Medical History */}
  <Col xs={12} md={6} lg={4}>
    <div>
      <label className="vendorpage_labelCss">Family Medical History</label>
      <textarea
        className="inputcolumn-ourProfile"
        {...register("familyMedicalHistory", { required: true })}
        placeholder="Enter family medical history"
      />
      {errors.familyMedicalHistory && (
        <p className="text-danger">Family Medical History is required</p>
      )}
    </div>
  </Col>

  {/* Lifestyle Information */}
  <Col xs={12} md={6} lg={4}>
    <div>
      <label className="vendorpage_labelCss">Lifestyle Information</label>
      <textarea
        className="inputcolumn-ourProfile"
        {...register("lifestyle", { required: true })}
        placeholder="Smoking, Alcohol Consumption, etc."
      />
      {errors.lifestyle && <p className="text-danger">Lifestyle information is required</p>}
    </div>
  </Col>

  {/* Previous Insurance Policies */}
  <Col xs={12} md={6} lg={4}>
    <div>
      <label className="vendorpage_labelCss">Previous Insurance Policies</label>
      <textarea
        className="inputcolumn-ourProfile"
        {...register("previousPolicies")}
        placeholder="Details of previous policies (if any)"
      />
    </div>
  </Col>

  {/* Premium Payment Frequency */}
  <Col xs={12} md={6} lg={4}>
          <div>
            <label className="vendorpage_labelCss">Premium Payment Frequency</label>
            <Controller
              name="paymentFrequency"
              control={control}
              defaultValue="" // Default value for controlled input
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field} // Spread the field props here
                  className="inputcolumn_drp"
                  placeholder="Select Frequency"
                >
                  <Option value="Monthly">Monthly</Option>
                  <Option value="Quarterly">Quarterly</Option>
                  <Option value="Annually">Annually</Option>
                </Select>
              )}
            />
            {errors.paymentFrequency && (
              <p className="text-danger">Payment frequency is required</p>
            )}
          </div>
        </Col>

  {/* Proof of Identity */}
  <Col xs={12} md={6} lg={4}>
    <div>
      <label className="vendorpage_labelCss">Proof of Identity</label>
      <input
        className="inputcolumn-ourProfile"
        type="file"
        {...register("identityProof", { required: true })}
      />
      {errors.identityProof && (
        <p className="text-danger">Identity proof is required</p>
      )}
    </div>
  </Col>

  {/* Proof of Address */}
  <Col xs={12} md={6} lg={4}>
    <div>
      <label className="vendorpage_labelCss">Proof of Address</label>
      <input
        className="inputcolumn-ourProfile"
        type="file"
        {...register("addressProof", { required: true })}
      />
      {errors.addressProof && (
        <p className="text-danger">Address proof is required</p>
      )}
    </div>
  </Col>

  {/* Age Proof */}
  <Col xs={12} md={6} lg={4}>
    <div>
      <label className="vendorpage_labelCss">Age Proof</label>
      <input
        className="inputcolumn-ourProfile"
        type="file"
        {...register("ageProof", { required: true })}
      />
      {errors.ageProof && (
        <p className="text-danger">Age proof is required</p>
      )}
    </div>
  </Col>

  {/* Photographs */}
  <Col xs={12} md={6} lg={4}>
    <div>
      <label className="vendorpage_labelCss">Photographs</label>
      <input
        className="inputcolumn-ourProfile"
        type="file"
        accept="image/*"
        {...register("photograph", { required: true })}
      />
      {errors.photograph && <p className="text-danger">Photograph is required</p>}
    </div>
  </Col>

  {/* Signature Specimen */}
  <Col xs={12} md={6} lg={4}>
    <div>
      <label className="vendorpage_labelCss">Signature Specimen</label>
      <input
        className="inputcolumn-ourProfile"
        type="file"
        accept="image/*"
        {...register("signature", { required: true })}
      />
      {errors.signature && <p className="text-danger">Signature is required</p>}
    </div>
  </Col>

  {/* Beneficiary Details */}
  <Col xs={12} md={6} lg={4}>
    <div>
      <label className="vendorpage_labelCss">Beneficiary Details</label>
      <textarea
        className="inputcolumn-ourProfile"
        {...register("beneficiaryDetails", { required: true })}
        placeholder="Enter beneficiary details"
      />
      {errors.beneficiaryDetails && (
        <p className="text-danger">Beneficiary details are required</p>
      )}
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
      </Container>
      <ToastContainer/>
    </div>
  );
}

export default Insurance;
