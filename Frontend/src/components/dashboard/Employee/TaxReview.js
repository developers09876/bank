import React, { useState } from 'react';
import { Table, Input, Space, Pagination, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const TaxReview = ({ collapsed }) => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const data = [
    { key: '1', date: '01/02/2023', appId: '256789', customer: 'Katerina Simpson', status: 'Documents Required', action: 'Doc. Upload' },
    { key: '2', date: '01/02/2023', appId: '256790', customer: 'Willow Fuller', status: 'Approved', action: 'Continue' },
    { key: '3', date: '01/03/2023', appId: '256791', customer: 'Stacey Hawkins', status: 'Soft Approved', action: 'Continue' },
    { key: '4', date: '01/03/2023', appId: '256792', customer: 'Micheal Decker', status: 'Banking Incomplete', action: 'Continue' },
    { key: '5', date: '01/03/2023', appId: '256793', customer: 'Noah Hogan', status: 'Loan Details Incomplete', action: 'Delete' },
    { key: '6', date: '01/03/2023', appId: '256794', customer: 'James Millner', status: 'Soft Approved', action: 'Continue' }
  ];

  const columns = [
    {
      title: 'Created On',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Application ID',
      dataIndex: 'appId',
      key: 'appId',
    },
    {
      title: 'Customer Name',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => (
          <Space>
            <Button type="primary" style={{color:"black"}}>View</Button>
          </Space>
        ),
      }
  ];

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchText(searchTerm);
    const filtered = data.filter(item =>
      item.customer.toLowerCase().includes(searchTerm)
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to the first page when filtering
  };

  // Get the current page data by slicing the array based on pagination values
  const getPaginatedData = () => {
    const sourceData = searchText ? filteredData : data;
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return sourceData.slice(start, end);
  };

  return (
    <div>
      {/* <Sidebar/> */}
      <div className={collapsed === true ? "main-content.open" : "main-content"}>
        <Space style={{ marginBottom: 16 }} className="filter-actions">
          <Input
            placeholder="Search"
            value={searchText}
            onChange={handleSearch}
            style={{ width: 200 }}
            prefix={<SearchOutlined />}
          />
        </Space>

        <Table
          dataSource={getPaginatedData()}
          columns={columns}
          pagination={false}
          className="loan-table"
        />

        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={searchText ? filteredData.length : data.length}
          onChange={(page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize);
          }}
          className="pagination-control"
          // showSizeChanger
        />
      </div>
    </div>
  );
};

export default TaxReview;
