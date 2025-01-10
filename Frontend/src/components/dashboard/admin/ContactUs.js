import React, { useState, useEffect } from "react";
import { Table, Input, Space } from "antd";
import { useForm } from "react-hook-form";
import { SearchOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import axios from "axios";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Api from "../../../Api";

import { FaPlus } from "react-icons/fa";

function ContactUs() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [contactUsData, setContactUsData] = useState([]);


  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/contactus/getallcontactus");
      setData(response.data.data);
      setFilteredData(response.data.data);
    } catch (error) {
      console.error("Error fetching contact us data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchContactUsData = async () => {
      try {
        const response = await Api.get(
          `http://localhost:5000/contactus/getallcontactus`
        );
        console.log("Response:", response);
        setContactUsData(response.data.data);
      } catch (error) {
        console.error("Error fetching contact us data", error);
      }
    };
    fetchContactUsData();
  }, []);

  const handleSearch = (e) => setSearchText(e.target.value);


  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const handleViewDetails = (record) => {
    // navigate(`/admin/leaddetails/${record.id}`, { state: { record } });
  };

  useEffect(() => {
    fetchLeads();
  }, []);
  const columns = [
    // {
    //   title: "Name",
    //   dataIndex: "name",
    //   key: "name",
    //   render: (_, record) => `${record.firstname} ${record.lastname}`,
    // },
    {
      title: "Email Id",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phonenumber",
      key: "phone",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "amount",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "purpose",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => handleViewDetails(record)}
        >
          View
        </button>
      ),
    },
  ];

  return (
    <div style={{ marginTop: "50px", width: "100%" }}>
    <Container style={{ width: "90%" }}>
    <div style={{ width: "100%" }}>
      <h4 style={{ textAlign: "center", fontWeight: "bold" }}>
        Contact Us
      </h4>
      <br />
      <div style={{ justifyContent: "space-between" }}>
      <Space style={{ marginBottom: 16 }}className="filter-actions">
        <Input
          placeholder="Search"
          style={{ width: 200 }}
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={handleSearch}
        />
      </Space>
    
      <Table
        dataSource={paginatedData}
        columns={columns}
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: filteredData.length,
          showSizeChanger: true,
        }}
        onChange={handleTableChange}
        rowKey="id"
      />
       </div>
       </div>
    </Container>
  </div>

  );
}

export default ContactUs;
