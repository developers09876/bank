import React from "react";
import { Tabs } from "antd";
import { Link } from "react-router-dom";
import MyProfile from "./MyProfile";
// import Popup from '../Popup/Popup';
import Kyc from "./Kyc";
// import AdminInfo from './AdminInfo.js';

function TabsProfile() {
  return (
    <div>
      <Tabs defaultActiveKey="1" centered className="p-3">
        <Tabs.TabPane tab="User Details" key="1">
          <MyProfile />
        </Tabs.TabPane>
        <Tabs.TabPane tab="KYC " key="2">
          <Kyc />
        </Tabs.TabPane>
        
      </Tabs>
    </div>
  );
}

export default TabsProfile;
