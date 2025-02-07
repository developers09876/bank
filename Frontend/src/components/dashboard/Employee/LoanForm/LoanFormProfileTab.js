import React from "react";
import { Tabs } from "antd";
import { Link, useLocation } from "react-router-dom";
import LoanDetails from "./LoanDetails";
import LoanForm from "./LoanForm";
import Kycvendor from "./LoanKfc";
// import Popup from '../Popup/Popup';
// import AdminInfo from './AdminInfo.js';

function LoanFormProfileTab() {
   const { state } = useLocation();
    const record = state?.record;
    console.log('record', record)
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />

      <Tabs defaultActiveKey="1" centered className="p-3">
        <Tabs.TabPane tab="Personal Information" key="1">
          <LoanForm />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Loan Form" key="2">
          <LoanDetails />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Bank Details" key="3">
          <Kycvendor/>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default LoanFormProfileTab;
