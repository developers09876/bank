import React from "react";
import { Tabs } from "antd";
import { Link } from "react-router-dom";
import Insurance from "../InsuranceFrom";
import KycComplaince from "../LoanForm/LoanKfc";
import InsuranceDetails from "../InsuranceForm/InsuranceDetails";
 
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
        <Tabs.TabPane tab="Insurance Form" key="2">
          <InsuranceDetails />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Bank Details" key="3">
          <KycComplaince />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default InsuranceFormProfileTab;
