import { Table, Input, Space, Pagination, Modal } from 'antd'
import React from 'react'
import { Container, Button } from 'react-bootstrap'
import { FaPlus } from "react-icons/fa6";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';

function LoanLeadManagement() {
    const navigate = useNavigate();

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        }, {
            title: "Email Id",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Phone Number",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Aadhar Number",
            dataIndex: "aadhar",
            key: "aadhar",
        }, {
            title: "PAN Number",
            dataIndex: "panno",
            key: "panno",
        },
        {
            title: "Loan Amount",
            dataIndex: "amount",
            key: "amount",
        },
    ]

    return (
        <div style={{ marginTop: '50px', width: '100%' }}>
            <Container style={{ width: '85%' }}>
                <div style={{ width: '100%' }}>
                    <h4>Lead Management</h4>
                    <br />
                    <div style={{ justifyContent: 'space-between' }}>
                        <Space style={{ marginBottom: 16 }} className="filter-actions">
                            <Input
                                placeholder="Search"
                                // value={searchText}
                                // onChange={handleSearch}
                                style={{ width: 200 }}
                                prefix={<SearchOutlined />}
                            />
                        </Space>
                        <Button
                            type='primary'
                            onClick={() => navigate("/adminLoan/createlead")}
                            style={{ display: 'inline', float: 'right', backgroundColor: '#00397f' }}
                        ><FaPlus style={{ display: 'inline', color: "white" }} />Add New</Button>
                    </div>
                    <Table
                        //  dataSource={getPaginatedData()}
                        columns={columns}
                        pagination={false}
                        className="loan-table"
                    />

                    {/* </Table> */}
                </div>
            </Container>
        </div>
    )
}

export default LoanLeadManagement