import React, { useState, useEffect } from "react";
import { Table, Input, Space,Modal , Row, Col} from "antd";
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);


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
    setSelectedRecord(record);
    setIsModalVisible(true);
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedRecord(null);
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

    <Modal
        title="Contact Details"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={[
          <button key="close" className="btn btn-secondary" onClick={handleCloseModal}>
            Close
          </button>,
        ]}
      >
        {selectedRecord && (
          <div>
          <Row>
            <Col span={10}>
              <p style={{ fontSize: "15px" }}>
                <strong>Email</strong>
              </p>
            </Col>
            <Col span={2}>
              <p style={{ fontSize: "15px" }}>:</p>
            </Col>
            <Col span={12}>
              <p style={{ fontSize: "15px" }}>{selectedRecord.email}</p>
            </Col>
          </Row>
          <Row>
            <Col span={10}>
              <p style={{ fontSize: "15px" }}>
                <strong>Phone Number</strong>
              </p>
            </Col>
            <Col span={2}>
              <p style={{ fontSize: "15px" }}>:</p>
            </Col>
            <Col span={12}>
              <p style={{ fontSize: "15px" }}>{selectedRecord.phonenumber}</p>
            </Col>
          </Row>
          <Row>
            <Col span={10}>
              <p style={{ fontSize: "15px" }}>
                <strong>Subject</strong>
              </p>
            </Col>
            <Col span={2}>
              <p style={{ fontSize: "15px" }}>:</p>
            </Col>
            <Col span={12}>
              <p style={{ fontSize: "15px" }}>{selectedRecord.subject}</p>
            </Col>
          </Row>
          <Row>
            <Col span={10}>
              <p style={{ fontSize: "15px" }}>
                <strong>Message</strong>
              </p>
            </Col>
            <Col span={2}>
              <p style={{ fontSize: "15px" }}>:</p>
            </Col>
            <Col span={12}>
              <p style={{ fontSize: "15px" }}>{selectedRecord.message}</p>
            </Col>
          </Row>
        </div>
        )}
      </Modal>
  </div>

  );
}

export default ContactUs;
