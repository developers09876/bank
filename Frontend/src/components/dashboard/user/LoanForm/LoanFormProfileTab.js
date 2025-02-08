import React from "react";
import { Tabs } from "antd";
import { Link, useLocation } from "react-router-dom";
import {TbCircleNumber1Filled,TbCircleNumber2Filled,TbCircleNumber3Filled} from "react-icons/tb";
import OurProfile from "./LoanForm";
import KycComplaince from "./LoanKfc";
import LoanDetails from "./LoanDetails";

function LoanFormProfileTab() {
   const { state } = useLocation();
    const record = state?.record;
  return (
    <div>
    <br />
    <Tabs defaultActiveKey="1" centered className="p-3">
      <Tabs.TabPane
        tab={
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
              }}
            >
              <h6 style={{ margin: 0 }}>Step </h6>
              <TbCircleNumber1Filled style={{ fontSize: "20px" }} />
            </div>
            <div>Personal Information</div>
          </div>
        }
        key="1"
      >
        <OurProfile />
      </Tabs.TabPane>

      <Tabs.TabPane
        tab={
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
              }}
            >
              <h6 style={{ margin: 0 }}>Step </h6>
              <TbCircleNumber2Filled style={{ fontSize: "20px" }} />
            </div>
            <div>Loan Form</div>
          </div>
        }
        key="2"
      >
        <LoanDetails />
      </Tabs.TabPane>
      <Tabs.TabPane
        tab={
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
              }}
            >
              <h6 style={{ margin: 0 }}>Step </h6>
              <TbCircleNumber3Filled style={{ fontSize: "20px" }} />
            </div>
            <div> Bank Details</div>
          </div>
        }
        key="3"
      >
        <KycComplaince />
      </Tabs.TabPane>
    </Tabs>
  </div>
  );
}

export default LoanFormProfileTab;
