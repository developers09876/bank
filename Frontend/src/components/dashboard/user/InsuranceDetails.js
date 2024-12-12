import React from 'react';
import { Table, Tag, Button } from 'antd';

const insuranceData = [
  {
    key: '1',
    policyID: 'INS001',
    companyName: 'Allianz',
    coverageAmount: 100000,
    status: 'Active',
    startDate: '2024-01-10',
    endDate: '2025-01-10',
    insuranceType: 'Health Insurance',
  },
  {
    key: '2',
    policyID: 'INS002',
    companyName: 'State Farm',
    coverageAmount: 50000,
    status: 'Pending',
    startDate: '2024-03-05',
    endDate: '2025-03-05',
    insuranceType: 'Car Insurance',
  },
  {
    key: '3',
    policyID: 'INS003',
    companyName: 'Geico',
    coverageAmount: 75000,
    status: 'Expired',
    startDate: '2023-06-15',
    endDate: '2024-06-15',
    insuranceType: 'Home Insurance',
  },
  {
    key: '4',
    policyID: 'INS004',
    companyName: 'MetLife',
    coverageAmount: 200000,
    status: 'Active',
    startDate: '2024-08-01',
    endDate: '2025-08-01',
    insuranceType: 'Life Insurance',
  },
];

const columns = [
  {
    title: 'Policy ID',
    dataIndex: 'policyID',
    key: 'policyID',
  },
  {
    title: 'Company Name',
    dataIndex: 'companyName',
    key: 'companyName',
  },
  {
    title: 'Coverage Amount ($)',
    dataIndex: 'coverageAmount',
    key: 'coverageAmount',
  },
  {
    title: 'Start Date',
    dataIndex: 'startDate',
    key: 'startDate',
  },
  {
    title: 'End Date',
    dataIndex: 'endDate',
    key: 'endDate',
  },
  {
    title: 'Insurance Type',
    dataIndex: 'insuranceType',
    key: 'insuranceType',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      let color = status === 'Active' ? 'green' : status === 'Pending' ? 'orange' : 'red';
      return <Tag color={color}>{status.toUpperCase()}</Tag>;
    },
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Button type="primary" style={{ color: 'black' }} onClick={() => handleView(record)}>
        View
      </Button>
    ),
  },
];

const handleView = (record) => {
  alert(`Viewing details for ${record.policyID}`);
  // You could also navigate to another page or display a modal with more details.
};

const InsuranceDetailsTable = ({ collapsed }) => {
  return (
    <div>
      <div
        style={{ width: '90%', marginRight: 'auto', marginLeft: 'auto' }}
      >
        <div
          className={collapsed === true ? 'main-content.open' : 'main-content'}>
          <Table
            columns={columns}
            dataSource={insuranceData}
            pagination={{ pageSize: 5 }}
            style={{ height: 'auto' }}
          />
        </div>
      </div>
    </div>
  );
};

export default InsuranceDetailsTable;
