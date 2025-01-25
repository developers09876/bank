import React, { useState, useEffect } from "react";
import { Col, Row ,Button } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { Select } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import Api from "../../../Api";

function LeadDetails() {
  const { state } = useLocation();
  const record = state?.record;
  const [remarksFields, setRemarksFields] = useState([]);
  const [filteredEmployeeList, setFilteredEmployeeList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const { Option } = Select;
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const category = watch("loanType");
  console.log("category", category);

  const employeeType = "LoanEmployee";
  useEffect(() => {
    const fetchEmployeeList = async () => {
      try {
        const response = await Api.get(`signup/getbyUserType/${employeeType}`);
        setEmployeeList(response.data);
        console.log("responseemployee", response.data);
      } catch (error) {
        console.error("Error fetching employee list:", error);
        toast.error("Failed to fetch employee list.");
      }
    };
    fetchEmployeeList();
  }, [employeeType]);

  useEffect(() => {
    if (category) {
      console.log("category", category);
      const filtered = employeeList.filter(
        (employee) => employee.employeeCategory === category
      );
      setFilteredEmployeeList(filtered);
    }
  }, [category, employeeList]);
 

  useEffect(() => {
    if (record) {
      const initialRemarks = record.addremarks?.length
        ? record.addremarks.map((field) => ({ ...field, prefilled: true }))
        : [{ date: "", remarks: "", status: "", prefilled: false }];
      setRemarksFields(initialRemarks);

      const defaultValues = initialRemarks.reduce((acc, field, index) => {
        acc[`date_${index}`] = field.date;
        acc[`remarks_${index}`] = field.remarks;
        acc[`status_${index}`] = field.status;
        return acc;
      }, {});
      reset(defaultValues);
    }
  }, [record, reset]);

  const addRemarkField = () => {
    setRemarksFields([
      ...remarksFields,
      { date: "", remarks: "", status: "", prefilled: false },
    ]);
  };

  const removeRemarkField = (index) => {
    const updatedFields = remarksFields.filter((_, i) => i !== index);
    setRemarksFields(updatedFields);

    const defaultValues = updatedFields.reduce((acc, field, i) => {
      acc[`date_${i}`] = field.date;
      acc[`remarks_${i}`] = field.remarks;
      acc[`status_${i}`] = field.status;
      return acc;
    }, {});
    reset(defaultValues);
  };

  // const onSubmit = async (data) => {
  //   const formattedRemarks = remarksFields.map((field, index) => ({
  //     date: data[`date_${index}`],
  //     remarks: data[`remarks_${index}`],
  //     status: data[`status_${index}`],
  //     // notiFicatioinStauts: "false",
  //   }));

  //   const details = {
  //     firstname: record.firstname,
  //     lastname: record.lastname,
  //     userId: record.id,
  //     contactNumber: record.phone,
  //     email: record.email,
  //     aadhar: record.aadhar,
  //     purpose: record.purpose,
  //     amount: record.amount,
  //     addremarks: formattedRemarks,
  //     panno: record.panno,
  //   };

  //   try {
  //     await axios.put(
  //       `http://localhost:5000/lead/updatelead/${record._id}`,
  //       details
  //     );
  //     toast.success("Form submitted successfully");
  //   } catch (error) {
  //     console.error("Error:", error.message);
  //     toast.error("An error occurred while submitting the form");
  //   }
  // };

  // if (!record) {
  //   return <p>No details available</p>;
  // }
  const onSubmit = async (data, event) => {
    event.preventDefault();

    const updateDetails = {
      AdminId: data.AdminId,
      employeeType: data.employeeType,
      loanType: data.loanType,
      // employeeList: data.employeeList,
      description: data.description,
      employeeId: data.employeeId,
      startDate: data.startDate || null,
      endDate: data.endDate || null,
    };

    try {
      const response = await Api.put(
        `http://localhost:5000/lead/updateleadassign/${record._id}`,
        updateDetails
      );
      toast.success("Task Assigned successfully");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage =
        error?.response?.data?.error ||
        "An error occurred while submitting the form";
      toast.error(errorMessage);
    }
  };
   if (!record) {
    return <p>No details available</p>;
  }
  return (
    <div style={{ marginTop: "50px", padding: "20px" }}>
      <h3>Lead Details</h3>
      <div>
        <Row>
          <Col xs={2}>
            <p>
              <strong>Name:</strong>
            </p>
          </Col>
          <Col xs={7}>
            <p>{`${record.firstname} ${record.lastname}`}</p>
          </Col>
        </Row>
        <Row>
          <Col xs={2}>
            <p>
              <strong>Email:</strong>
            </p>
          </Col>
          <Col xs={7}>
            <p>{record.email}</p>
          </Col>
        </Row>
        <Row>
          <Col xs={2}>
            <p>
              <strong>Phone:</strong>
            </p>
          </Col>
          <Col xs={7}>
            <p>{record.contactNumber}</p>
          </Col>
        </Row>
        <Row>
          <Col xs={2}>
            <p>
              <strong>Loan Amount:</strong>
            </p>
          </Col>
          <Col xs={7}>
            <p>{record.amount}</p>
          </Col>
        </Row>
        <Row>
          <Col xs={2}>
            <p>
              <strong>Aadhar Number:</strong>
            </p>
          </Col>
          <Col xs={7}>
            <p>{record.aadhar}</p>
          </Col>
        </Row>
        <Row>
          <Col xs={2}>
            <p>
              <strong>PAN Card Number:</strong>
            </p>
          </Col>
          <Col xs={7}>
            <p>{record.panno}</p>
          </Col>
        </Row>
        <Row>
          <Col xs={2}>
            <p>
              <strong>Purpose Of Loan:</strong>
            </p>
          </Col>
          <Col xs={7}>
            <p>{record.purpose}</p>
          </Col>
        </Row>

        <h3 style={{ marginBottom: "20px", marginTop: "20px" }}>Reminders</h3>

{record.addremarks && record.addremarks.length > 0 ? (
  record.addremarks.map((remark, index) => (
    <div key={index} style={{ marginBottom: "10px" }}>
      <Row>
        <Col span={6}>
          <strong>Date:</strong>
        </Col>
        <Col span={18}>{remark.date}</Col>
      </Row>
      <Row>
        <Col span={6}>
          <strong>Message:</strong>
        </Col>
        <Col span={18}>{remark.remarks}</Col>
      </Row>

      <hr style={{ margin: "10px 0" }} />
    </div>
  ))
) : (
  <p>No reminders available.</p>
)}
      </div>
      <div className="py-2 px-2">
              <h5>
                <b>Assign To</b>
              </h5>
              <form onSubmit={(e) => onSubmit(watch(), e)}>
                <Row>
                  <Col xs={12} md={6} lg={4}>
                    <div>
                      <label className="vendorpage_labelCss">
                        Employee Type:
                      </label>
                      <Controller
                        name="employeeType"
                        control={control}
                        defaultValue="LoanEmployee"
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            disabled
                            className="inputcolumn_drp"
                          >
                            <Option value="LoanEmployee">Loan Employee</Option>
                            <Option value="TaxEmployee">Tax Employee</Option>
                            <Option value="InsuranceEmployee">
                              Insurance Employee
                            </Option>
                            <Option value="StockMarket">Stock Market</Option>
                          </Select>
                        )}
                      />
                      {errors.employeeType && (
                        <p className="text-danger">Employee type is required</p>
                      )}
                    </div>
                  </Col>
                  <Col xs={12} md={6} lg={4}>
                    <div>
                      <label className="vendorpage_labelCss">Loan Type:</label>
                      <Controller
                        name="loanType"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            className="inputcolumn_drp"
                            placeholder="Select Loan Type"
                            onChange={(value) => {
                              field.onChange(value);
                              setValue("loanType", value);
                            }}
                          >
                            <Option value="">Select Loan Type</Option>
                            <Option value="Home Loan">Home Loan</Option>
                            <Option value="Business Loan">Business Loan</Option>
                            <Option value="Vehicle Loan">Vechicle Loan</Option>
                            <Option value="Personal Loan">Personal Loan</Option>
                          </Select>
                        )}
                      />
                      {errors.loanType && (
                        <p className="text-danger">Loan type is required</p>
                      )}
                    </div>
                  </Col>

                  <Col xs={12} md={6} lg={4}>
                    <label>Employee List:</label>
                    <select
                      {...register("employeeId", { required: true })}
                      className="form-select"
                      placeholder="Select Employee"
                    >
                      <option value="">Select Employee</option>
                      {filteredEmployeeList?.map((employee) => (
                        <option key={employee._id} value={employee._id}>
                          {employee.firstname} {employee.lastname}
                        </option>
                      ))}
                    </select>
                    {errors.employeeId && (
                      <p className="text-danger">
                        Employee selection is required
                      </p>
                    )}
                  </Col>
                  <Col xs={12} md={6} lg={4}>
                    <div>
                      <label className="vendorpage_labelCss">Start Date:</label>
                      <Controller
                        name="startDate"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field }) => (
                          <input
                            type="date"
                            {...field}
                            className="form-control"
                            placeholder="Start Date"
                          />
                        )}
                      />
                      {errors.startDate && (
                        <p className="text-danger">Start date is required</p>
                      )}
                    </div>
                  </Col>
                  <Col xs={12} md={6} lg={4}>
                    <div>
                      <label className="vendorpage_labelCss">End Date:</label>
                      <Controller
                        name="endDate"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field }) => (
                          <input
                            type="date"
                            {...field}
                            className="form-control"
                            placeholder="End Date"
                          />
                        )}
                      />
                      {errors.endDate && (
                        <p className="text-danger">End date is required</p>
                      )}
                    </div>
                  </Col>
                  <Col xs={12} md={6} lg={4}>
                    <div>
                      <label className="vendorpage_labelCss">
                        Description:
                      </label>
                      <Controller
                        name="description"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field }) => (
                          <textarea
                            {...field}
                            className="form-control"
                            placeholder="Task description"
                          />
                        )}
                      />
                      {errors.description && (
                        <p className="text-danger">Description is required</p>
                      )}
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col className="px-2 py-2">
                    <Button type="submit" variant="primary">
                      Submit
                    </Button>
                  </Col>
                </Row>
              </form>
            </div>
     
    </div>
  );
}

export default LeadDetails;
