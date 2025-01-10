import React from "react";
import { Tabs } from "antd";
import { Link } from "react-router-dom";
import TaxFormMyprofile from "./TaxFormMyprofile";
import KycComplaince from "./TaxFormKyc";
import TaxFormDetails from "./TaxFormDetails";

function TaxFormTab() {
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />

      <Tabs defaultActiveKey="1" centered className="p-3">
        <Tabs.TabPane tab="Personal Information" key="1">
          <TaxFormMyprofile />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Tax Form" key="2">
          <TaxFormDetails />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Bank Details" key="3">
          <KycComplaince />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default TaxFormTab;
