import React from "react";
import { Tabs } from "antd";
import { Link } from "react-router-dom";
import Insurance from "../InsuranceFrom";
// import Popup from '../Popup/Popup';
import KycComplaince from "../LoanForm/LoanKfc";
// import AdminInfo from './AdminInfo.js';
import LoanDetails from "../LoanForm/LoanDetails";

function InsuranceFormProfileTab() {
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />

      <Tabs defaultActiveKey="1" centered className="p-3">
        <Tabs.TabPane tab="Personal Information" key="1">
          <Insurance />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Loan Form" key="2">
          <LoanDetails />
        </Tabs.TabPane>
        {/* <Tabs.TabPane tab="Bank Details" key="3">
          <KycComplaince />
        </Tabs.TabPane> */}
      </Tabs>
    </div>
  );
}

export default InsuranceFormProfileTab;
