import React from "react";
import { Tabs } from "antd";
import { Link } from "react-router-dom";
import OurProfile from "./MyProfile";
// import Popup from '../Popup/Popup';
import KycComplaince from "./Kyc";
// import AdminInfo from './AdminInfo.js';

function TabsProfile() {
  return (
    <div>
      <Tabs defaultActiveKey="1" centered className="p-3">
        <Tabs.TabPane tab="Vendor Information" key="1">
          <OurProfile />
        </Tabs.TabPane>
        <Tabs.TabPane tab="KYC Complainces" key="2">
          {/* <p style={{ marginLeft:"30px" }}>KYC Complaince</p> */}
          {/* <Popup/> */}
          <KycComplaince />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default TabsProfile;