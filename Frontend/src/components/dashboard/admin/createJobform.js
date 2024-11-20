import React, { useState, useEffect } from "react";
import "../admin/createJobform.scss";
import { Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import Api from "../../../Api";
import { useNavigate } from "react-router-dom";
import { MultiSelect } from "primereact/multiselect";
import Sidebar from './Sidebar';

function CreateJobForm() {
  const [Experience, setExperience] = useState();
  const [selectSalary, setSelectSalary] = useState();
  const [skillist, setskilList] = useState([]);
  const [Qualification, setQualification] = useState([]);
  const [QualificationList, setQualificationList] = useState([]);
  const [jobType, setJobType] = useState([]);
  const [jobMode, setJobMode] = useState([]);
  const [skill, setSkill] = useState([]);
  const [notice, setNotice] = useState();
  const [noticeList, setNoticeList] = useState([]);
  const navigate = useNavigate();
  const [languageList, setLanguageList] = useState([]);
  const [languageValue, setLanguageValue] = useState();
  const [locationList, setLocationList] = useState([]);
  const [locationValue, setLocationValue] = useState();
  const [qualificationValue, setQualificationValue] = useState();
  const [selectExperience, setSelectExperiene] = useState();
  const email = localStorage.getItem("email");
  const companyName = localStorage.getItem("companyName")

  const [review, setReview] = useState({
    jobTitle: "",
    location: "",
    area: "",
    technology: "",
    experience: "",
    qualification: "",
    selectSalary: "",
    languagePreference: "",
    skill: "",
    companyDescription: "",
    jobDescription: "",
    companyName: "",
    companyWebsite: "",
    companyMailId: "",
    carrerlevel: "",
    jobRole: "",
    jobType: "",
    jobMode: "",
    noticePeriod: "2 month",
  });
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: review,
  });
  const jobid = localStorage.getItem("id");
  const handleCreateFormSubmit = async () => {
    const createFormDetails = {
      employerId:jobid,
      jobId: jobid,
      jobTitle: review.jobTitle,
      jobRole: getValues().jobRole,
      skill: getValues().skill,
      experience: getValues().experience,
      qualification: getValues().qualification,
      salaryRange: getValues().salaryRange,
      location: getValues().location,
      languagePreference: getValues().languagePreference,
      noticePeriod: getValues().noticePeriod,
      companyMailId: getValues().companyMailId,
      companyWebsite: getValues().companyWebsite,
      jobType: getValues().jobType,
      jobMode: getValues().jobMode,
      companyDescription: getValues().companyDescription,
      jobDescription: getValues().jobDescription,
    };
    await Api.post(`createForm/createForm`, createFormDetails).then((resp) => {
      navigate("/employer/reviewpage", { state: createFormDetails });
    });
  };

  useEffect(() => {
    getSkill();
    getQualification();
    getNoticePeriod();
    getLanguage();
    getLocation();
  }, []);

  const getLanguage = async () => {
    await Api.get("fields/getlanguage").then((res) => {
      setLanguageList(res.data.data);
    });
  };
  const onLanguage = (e) => {
    setLanguageValue(e.value);
  };

  const getLocation = async () => {
    await Api.get("fields/getlocation").then((res) => {
      setLocationList(res.data.data);
    });
  };
  const onLocation = (e) => {
    setLocationValue(e.value);
  };
  const getQualification = async () => {
    await Api.get("fields/getqualification").then((res) => {
      setQualificationList(res.data.data);
    });
  };
  const onQualification = (e) => {
    setQualificationValue(e.value);
  };
  console.log("qualificationList", QualificationList);
  const getSkill = async () => {
    await Api.get("skills/getSkill").then((res) => {
      setskilList(res.data.data);
    });
  };

  const getNoticePeriod = async () => {
    await Api.get("noticeperiod/getForm").then((res) => {
      setNoticeList(res.data.data);
    });
  };

  const noticeOptions =
    noticeList &&
    noticeList.map((list) => {
      return { label: list?.noticePeriod, value: list?.noticePeriod };
    });

  const salarys = [
    { name: "1-2 lakhs", value: "1-2 lakhs" },
    { name: "2-3 lakhs", value: "2-3 lakhs" },
    { name: "3-4 lakhs", value: "3-4 lakhs" },
    { name: "4-5 lakhs", value: "4-5 lakhs" },
    { name: "6-7 lakhs", value: "6-7 lakhs" },
  ];
  const experiences = [
    { name: "1-2 Years", value: "1-2 Years" },
    { name: "2-3 Years", value: "2-3 Years" },
    { name: "3-4 Years", value: "3-4 Years" },
    { name: "4-5 Years", value: "4-5 Years" },
    { name: "6-7 Years", value: "6-7 Years" },
    { name: "7-8 Years", value: "7-8 Years" },
    { name: "8-9 Years", value: "8-9 Years" },
    { name: "9-10 Years", value: "9-10 Years" },
    { name: "11-12 Years", value: "11-12Years" },
    { name: "12-13 Years", value: "12-13 Years" },
    { name: "13-14 Years", value: "13-14 Years" },
    { name: "14-15 Years", value: "14-15 Years" },
  ];
  const jobtype = [
    { name: "Part Time(temporary)", value: "Part Time(temporary)" },
    { name: "Part Time(permenent)", value: "Part Time(permenent)" },
    { name: "Full Time(temporary)", value: "Full Time(temporary)" },
    { name: "Full Time(permenent)", value: "Full Time(permenent)" },
  ];

  const jobmode = [
    { name: "Work from office", value: "Work from office" },
    { name: "Permanent Remote", value: "Permanent Remote" },
    { name: "Hybrid", value: "Hybrid" },
    { name: "Temp. WFH due to covid", value: "Temp. WFH due to covid" },
  ];

  const datas =
    skillist &&
    skillist.map((list) => {
      return { label: list?.skill, value: list?.skill };
    });
  return (
    <div>
        <Sidebar />
      <Container>
        <Row style={{ marginLeft: "5%" }}>
          <form onSubmit={handleSubmit(handleCreateFormSubmit)}>
            <br />
            <div className="pages-title mt-1">Create Job:</div>
            <Row className="mt-3">
              <Col lg={4}>
                <label className="create-title">Job title</label>
                <br />
                <input
                  {...register("jobTitle", {
                    required: true,
                    onChange: (e) => {
                      setReview((prev) => ({
                        ...prev,
                        jobTitle: e.target.value,
                      }));
                    },
                  })}
                  className="Create-input"
                />
                {errors.jobTitle && (
                  <p className="text-danger">Job title is required</p>
                )}
              </Col>
              <Col lg={4}>
                <label>Job Role </label>
                <br />
                <input
                  {...register("jobRole", { required: true })}
                  className="Create-input"
                />
                {errors.jobRole && (
                  <p className="text-danger">Job Role is required</p>
                )}
              </Col>
              <Col lg={4}>
                <label>Skills </label>
                <br />
                <MultiSelect
                  // name="skill"
                  className="create-select"
                  options={datas}
                  value={skill}
                  {...register("skill", {
                    required: true,
                    onChange: (e) => {
                      setSkill(e.value);
                    },
                  })}
                  style={{ width: "100%" }}
                  placeholder="Please select a Qualification"
                ></MultiSelect>
                {/* {skill.length > 0
                  ? null
                  : */}
                {errors.skill && (
                  <p className="text-danger">Skill is required</p>
                )}
              </Col>
            </Row>
            <Row className="mt-4">
              <Col lg={4}>
                <label>Experience</label>
                <br />
                <Dropdown
                  className="create-select"
                  name="selectSalary"
                  value={selectExperience}
                  options={experiences}
                  optionLabel="name"
                  placeholder="Select a experience range"
                  {...register("experience", {
                    required: true,
                    onChange: (e) => {
                      setSelectExperiene(e.target.value);
                    },
                  })}
                />
                {errors.experience && (
                  <p className="text-danger">Experience is required</p>
                )}
              </Col>
              <Col lg={4}>
                <label>Qualification</label>
                <br />
                <Dropdown
                  className="Create-input"
                  value={qualificationValue}
                  options={QualificationList}
                  {...register("qualification", { required: true })}
                  optionLabel={"qualificationName"}
                  optionValue={"_id"}
                  onChange={onQualification}
                />
                {errors.qualification && (
                  <p className="text-danger">Qualification is required</p>
                )}
              </Col>
              <Col lg={4}>
                <label>Salary Range</label>
                <br />

                <Dropdown
                  className="create-select"
                  name="selectSalary"
                  value={selectSalary}
                  options={salarys}
                  optionLabel="name"
                  placeholder="Select a salary range"
                  {...register("selectSalary", {
                    required: true,
                    onChange: (e) => {
                      setSelectSalary(e.target.value);
                    },
                  })}
                />
                {errors.selectSalary && (
                  <p className="text-danger">Salary is required</p>
                )}
              </Col>
            </Row>
            <Row className="mt-4">
              <Col lg={4}>
                <label>Location</label>
                <br />
                <Dropdown
                  className="Create-input"
                  value={locationValue}
                  options={locationList}
                  {...register("location", { required: true })}
                  optionLabel={"locationName"}
                  optionValue={"_id"}
                  onChange={onLocation}
                />
                {errors.location && (
                  <p className="text-danger">Location is required</p>
                )}
              </Col>

              <Col lg={4}>
                <label>Language Preference</label>
                <br />
                <Dropdown
                  className="Create-input"
                  value={languageValue}
                  options={languageList}
                  {...register("languagePreference", { required: true })}
                  optionLabel={"languageName"}
                  optionValue={"_id"}
                  onChange={onLanguage}
                />

                {errors.languagePreference && (
                  <p className="text-danger">language is required</p>
                )}
              </Col>
              <Col lg={4}>
                <label>Notice Period</label>
                <br />
                <Dropdown
                  name="noticePeriod"
                  className="create-select"
                  value={notice}
                  options={noticeOptions}
                  placeholder="Select a Notice Period"
                  {...register("noticePeriod", {
                    required: true,
                    onChange: (e) => {
                      setNotice(e.target.value);
                    },
                  })}
                />
                <br />
                {errors.noticePeriod && (
                  <p className="text-danger">Notice Period is required</p>
                )}
              </Col>
            </Row>
            <Row className="mt-4">
            <Col lg={4}>
                <label>Company Name </label>
                <br />
                <input
                  {...register("companyName", { required: true })}
                  className="Create-input"
                  value={companyName}
                />
              </Col>
              <Col lg={4}>
                <label>Company Mail-ID </label>
                <br />
                <input
                  {...register("companyMailId", { required: true })}
                  className="Create-input"
                  value={email}
                />
              </Col>
              <Col lg={4}>
                <label>Company Website </label>
                <br />
                <input
                  {...register("companyWebsite", { required: true })}
                  className="Create-input"
                  // value={email}
                />
              </Col>
          
            </Row>
            <Row className="mt-4">
                 
            <Col lg={4}>
                <label style={{marginTop:"10px"}}>Job Type</label>
                <br />
                <Dropdown
                  className="create-select"
                  name="jobType"
                  value={jobType}
                  options={jobtype}
                  optionLabel="name"
                  placeholder="Select a jobType"
                  {...register("jobType", {
                    required: true,
                    onChange: (e) => {
                      setJobType(e.target.value);
                    },
                  })}
                />
                {errors.jobType && (
                  <p className="text-danger">jobtype is required</p>
                )}
              </Col>
              <Col lg={4}>
                <label>Job Mode</label>
                <br />
                <Dropdown
                  className="create-select"
                  name="jobMode"
                  value={jobMode}
                  options={jobmode}
                  optionLabel="name"
                  placeholder="Select a jobMode"
                  {...register("jobMode", {
                    required: true,
                    onChange: (e) => {
                      setJobMode(e.target.value);
                    },
                  })}
                />
                {errors.jobMode && (
                  <p className="text-danger">jobMode is required</p>
                )}
              </Col>
              <Col lg={4}>
                <label className="create-title">Job Description</label>
                <br />
                <input
                  {...register("jobDescription", { required: true })}
                  rows={5}
                  cols={5}
                  style={{ height: 80 }}
                  className="profile-input"
                />
                {errors.jobDescription && (
                  <p className="text-danger">Description is required</p>
                )}
              </Col>
              <Col lg={4}>
                <label className="create-title">Company Description</label>
                <br />
                <input
                  {...register("companyDescription", { required: true })}
                  rows={5}
                  cols={5}
                  style={{ height: 80 }}
                  className="profile-input"
                />
                {errors.companyDescription && (
                  <p className="text-danger">Description is required</p>
                )}
              </Col>
            </Row>
            {/* <Row className="mt-4">
              <Col lg={4}>
                <label>Interview </label>
                <br />
                <Dropdown
                  className="create-select"
                  name="jobMode"
                  value={jobMode}
                  options={jobmode}
                  optionLabel="name"
                  placeholder="Select a jobMode"
                  {...register("jobMode", {
                    required: true,
                    onChange: (e) => {
                      setJobMode(e.target.value);
                    },
                  })}
                />
                {errors.jobMode && (
                  <p className="text-danger">jobMode is required</p>
                )}
              </Col>
              <Col lg={4}>
                <label className="create-title">Job Description</label>
                <br />
                <input
                  {...register("jobDescription", { required: true })}
                  rows={5}
                  cols={5}
                  style={{ height: 80 }}
                  className="profile-input"
                />
                {errors.jobDescription && (
                  <p className="text-danger">Description is required</p>
                )}
              </Col>
              <Col lg={4}>
                <label className="create-title">Company Description</label>
                <br />
                <input
                  {...register("companyDescription", { required: true })}
                  rows={5}
                  cols={5}
                  style={{ height: 80 }}
                  className="profile-input"
                />
                {errors.companyDescription && (
                  <p className="text-danger">Description is required</p>
                )}
              </Col>
            </Row> */}
            <div className="submitbuttons p-2">
              <button
                className="button1 m-2 p-2"
                type="submit"
                // onClick={handleCreateFormSubmit}
              >
                Submit
              </button>
              <button className="button2 m-2 p-2" type="reset">
                Reset
              </button>
            </div>
          </form>
        </Row>
      </Container>
    </div>
  );
}

export default CreateJobForm;
