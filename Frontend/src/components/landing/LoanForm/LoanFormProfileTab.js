// import React from "react";
// import { Tabs } from "antd";
// import { Link } from "react-router-dom";
// import OurProfile from "./LoanForm";
// // import Popup from '../Popup/Popup';
// import KycComplaince from "./LoanKfc";
// // import AdminInfo from './AdminInfo.js';
// import LoanDetails from "./LoanDetails";

// function LoanFormProfileTab() {
//   return (
//     <div>
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//    

//       <Tabs defaultActiveKey="1" centered className="p-3">
//         <Tabs.TabPane tab= "Personal Information" key="1">
//           <OurProfile/>
//         </Tabs.TabPane>
//         <Tabs.TabPane tab="Loan Form" key="2">
//           <LoanDetails />
//         </Tabs.TabPane>
//         <Tabs.TabPane tab="Bank Details" key="3">
//           <KycComplaince />
//         </Tabs.TabPane>
//       </Tabs>
//     </div>
//   );
// }

// export default LoanFormProfileTab;
import React from "react";
import { Tabs } from "antd";
import OurProfile from "./LoanForm";
import KycComplaince from "./LoanKfc";
import LoanDetails from "./LoanDetails";
import {TbCircleNumber1Filled,TbCircleNumber2Filled,TbCircleNumber3Filled} from "react-icons/tb";
function UserLoanFormProfileTab() {
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
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

export default UserLoanFormProfileTab;
