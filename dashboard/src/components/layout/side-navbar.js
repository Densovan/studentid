import React from "react";
import { Layout, Menu } from "antd";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/Final Jabaram Logo-07.png";

import {
  UserOutlined,
  AppstoreAddOutlined,
  BookOutlined,
  FormOutlined,
  ProjectOutlined,
  // MessageOutlined,
  // UserSwitchOutlined,
  // ApartmentOutlined,
  // TeamOutlined,
  // MailOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;
const { SubMenu } = Menu;

const SideNavbar = () => {
  const [pathname, setPathname] = React.useState(window.location.pathname);

  const subMenu = window.location.pathname.split("/")[2];

  React.useEffect(() => {
    setPathname(window.location.pathname);
  }, [pathname]);

  return (
    <React.Fragment>
      <Sider
        style={{
          boxShadow: " 18px 0px 35px 0px rgba(0, 0, 0, 0.02)",
        }}
        theme="light"
        width="290px"
        breakpoint="lg"
        collapsedWidth="0"
      >
        <center>
          <div className="logos">
            <NavLink to="/dashboard">
              <h1 className="jabarom-logo">StudentID</h1>
              {/* <img src={logo} className="vuthy-logo" alt="logo" /> */}
            </NavLink>
          </div>
        </center>
        <Menu
          defaultSelectedKeys={[pathname]}
          defaultOpenKeys={[subMenu]}
          // onOpenChange={onOpenChange}
          theme="light"
          mode="inline"
          className="menu-categories"
        >
          <Menu.Item key="/dashboard" icon={<AppstoreAddOutlined />}>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </Menu.Item>
          <Menu.Item key="/dashboard/admins" icon={<UserOutlined />}>
            <NavLink to="/dashboard/admins">Admins</NavLink>
          </Menu.Item>

          <SubMenu key="blog" icon={<FormOutlined />} title="Students">
            <Menu.Item key="/dashboard/student/create">
              <NavLink to="/dashboard/student/create">Create Students</NavLink>
            </Menu.Item>
            <Menu.Item key="/dashboard/students">
              <NavLink to="/dashboard/students">Students</NavLink>
            </Menu.Item>
            {/* <Menu.Item key="/dashboard/student/edit/:id">
              <NavLink to="/dashboard/student/edit/:id">Students</NavLink>
            </Menu.Item> */}
          </SubMenu>
        </Menu>
      </Sider>
    </React.Fragment>
  );
};

export default SideNavbar;
