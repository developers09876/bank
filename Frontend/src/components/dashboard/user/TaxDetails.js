import React from 'react';
import { Table, Tag, Button } from 'antd';

const taxData = [
  {
    key: '1',
    taxID: 'TAX001',
    taxAuthority: 'IRS',
    taxableIncome: 50000,
    status: 'Filed',
    filingDate: '2024-01-15',
    dueDate: '2024-04-15',
    taxType: 'Income Tax',
  },
  {
    key: '2',
    taxID: 'TAX002',
    taxAuthority: 'California Franchise Tax Board',
    taxableIncome: 75000,
    status: 'Pending',
    filingDate: '2024-02-10',
    dueDate: '2024-04-15',
    taxType: 'State Tax',
  },
  {
    key: '3',
    taxID: 'TAX003',
    taxAuthority: 'HM Revenue & Customs',
    taxableIncome: 30000,
    status: 'Overdue',
    filingDate: '2023-03-20',
    dueDate: '2023-04-20',
    taxType: 'Property Tax',
  },
  {
    key: '4',
    taxID: 'TAX004',
    taxAuthority: 'Canada Revenue Agency',
    taxableIncome: 100000,
    status: 'Filed',
    filingDate: '2024-05-01',
    dueDate: '2024-06-01',
    taxType: 'Corporate Tax',
  },
];

const columns = [
  {
    title: 'Tax ID',
    dataIndex: 'taxID',
    key: 'taxID',
  },
  {
    title: 'Tax Authority',
    dataIndex: 'taxAuthority',
    key: 'taxAuthority',
  },
  {
    title: 'Taxable Income ($)',
    dataIndex: 'taxableIncome',
    key: 'taxableIncome',
  },
  {
    title: 'Filing Date',
    dataIndex: 'filingDate',
    key: 'filingDate',
  },
  {
    title: 'Due Date',
    dataIndex: 'dueDate',
    key: 'dueDate',
  },
  {
    title: 'Tax Type',
    dataIndex: 'taxType',
    key: 'taxType',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      let color = status === 'Filed' ? 'green' : status === 'Pending' ? 'orange' : 'red';
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
  alert(`Viewing details for ${record.taxID}`);
  // You could also navigate to another page or display a modal with more details.
};

const TaxDetails = ({ collapsed }) => {
  return (
    <div className={collapsed === true ? 'main-content.open' : 'main-content'}>
      <Table 
        columns={columns} 
        dataSource={taxData} 
        pagination={{ pageSize: 5 }} 
        style={{ height: 'auto' }} 
      />
    </div>
  );
};

export default TaxDetails;
