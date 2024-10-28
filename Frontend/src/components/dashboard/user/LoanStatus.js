import React from 'react';
import { Table, Tag, Button } from 'antd';

const loanData = [
  {
    key: '1',
    loanID: 'LN001',
    bankName: 'Bank of America',
    amount: 5000,
    status: 'Approved',
    applicationDate: '2024-10-01',
    loanType: 'Personal Loan',
  },
  {
    key: '2',
    loanID: 'LN002',
    bankName: 'Wells Fargo',
    amount: 15000,
    status: 'Pending',
    applicationDate: '2024-10-05',
    loanType: 'Home Loan',
  },
  {
    key: '3',
    loanID: 'LN003',
    bankName: 'Chase Bank',
    amount: 20000,
    status: 'Rejected',
    applicationDate: '2024-10-10',
    loanType: 'Auto Loan',
  },
  {
    key: '4',
    loanID: 'LN004',
    bankName: 'Citibank',
    amount: 10000,
    status: 'Approved',
    applicationDate: '2024-10-15',
    loanType: 'Business Loan',
  },
];

const columns = [
  {
    title: 'Loan ID',
    dataIndex: 'loanID',
    key: 'loanID',
  },
  {
    title: 'Bank Name',
    dataIndex: 'bankName',
    key: 'bankName',
  },
  {
    title: 'Amount ($)',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Application Date',
    dataIndex: 'applicationDate',
    key: 'applicationDate',
  },
  {
    title: 'Loan Type',
    dataIndex: 'loanType',
    key: 'loanType',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      let color = status === 'Approved' ? 'green' : status === 'Pending' ? 'orange' : 'red';
      return <Tag color={color}>{status.toUpperCase()}</Tag>;
    },
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Button type="primary" style={{color:"black"}} onClick={() => handleView(record)}>
        View
      </Button>
    ),
  },
];

const handleView = (record) => {
  alert(`Viewing details for ${record.loanID}`);
  // You could also navigate to another page or display a modal with more details.
};

const LoanStatusTable = ({ collapsed }) => {
  return (
    <div className={collapsed === true ? "main-content.open" : "main-content"}>
      <Table 
        columns={columns} 
        dataSource={loanData} 
        pagination={{ pageSize: 5 }} 
      />
    </div>
  );
};

export default LoanStatusTable;
