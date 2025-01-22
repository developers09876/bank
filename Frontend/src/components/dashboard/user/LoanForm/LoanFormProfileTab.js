import React from "react";
import { Tabs } from "antd";
import { Link, useLocation } from "react-router-dom";
import OurProfile from "./LoanForm";
// import Popup from '../Popup/Popup';
import KycComplaince from "./LoanKfc";
// import AdminInfo from './AdminInfo.js';
import LoanDetails from "./LoanDetails";

function LoanFormProfileTab() {
   const { state } = useLocation();
    const record = state?.record;
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />

      <Tabs defaultActiveKey="1" centered className="p-3">
        <Tabs.TabPane tab="Personal Information" key="1">
          <OurProfile />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Loan Form" key="2">
          <LoanDetails />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Bank Details" key="3">
          <KycComplaince />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default LoanFormProfileTab;
