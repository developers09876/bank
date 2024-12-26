import React from "react";
import { Tabs } from "antd";
import { Link } from "react-router-dom";
import OurProfile from "./LoanForm";
// import Popup from '../Popup/Popup';
import KycComplaince from "./LoanKfc";
// import AdminInfo from './AdminInfo.js';

function LoanFormProfileTab() {
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />

      <Tabs defaultActiveKey="1" centered className="p-3">
        <Tabs.TabPane tab="User Information" key="1">
          <OurProfile />
        </Tabs.TabPane>
        <Tabs.TabPane tab="KYC Complainces" key="2">
          <KycComplaince />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default LoanFormProfileTab;
