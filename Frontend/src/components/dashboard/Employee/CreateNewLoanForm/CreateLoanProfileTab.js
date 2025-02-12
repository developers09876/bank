import React from "react";
import { Tabs } from "antd";
import OurProfile from "./CreateLoanForm";
import KycComplaince from "./CreateLoanKfc";
import LoanDetails from "./CreateLoanDetails";
import {
  TbCircleNumber1Filled,
  TbCircleNumber2Filled,
  TbCircleNumber3Filled,
} from "react-icons/tb";
function CreateLoanProfileTab() {
  return (
    <div>
      <br />
      <Tabs
        defaultActiveKey="1"
        centered
        className="p-3"
        // style={{ marginTop: "100px" }}
      >
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

export default CreateLoanProfileTab;
