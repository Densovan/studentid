import React, { useState, useContext } from "react";
import { Layout, Avatar, Popover, Row, Col, Input } from "antd";
import { Link } from "react-router-dom";
import { HiOutlineCog, HiLogout } from "react-icons/hi";
import { FiSearch, FiX } from "react-icons/fi";
import { SearchOutlined } from "@ant-design/icons";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsGear, BsBoxArrowLeft } from "react-icons/bs";
import { useQuery } from "@apollo/react-hooks";

// import Avatar1 from "../../assets/images/avatar/g9442.png";
// import Notifications from "./notifications";
import { GET_USER } from "../../graphql/user";
import { UserContext } from "../../contexts/userContext";

const { Header } = Layout;

const NavBar = () => {
  const [search, setSearch] = useState(false);
  const userContext = useContext(UserContext);

  const { loading, data } = useQuery(GET_USER);

  if (loading || !data) return null;
  const { fullname, avatar, email } = data.user;
  // -----------function search notification ------------

  const handleCloseSearch = () => {
    setSearch(false);
  };

  return (
    <React.Fragment>
      <Header className="site-layout-background" style={{ padding: 0 }}>
        <div className="navbar-display-flex">
          {/* <Input
            size="large"
            placeholder="Search ..."
            allowClear
            enterButton="Search"
            className="search-navbar"
            suffix={<SearchOutlined />}
          /> */}
          <div></div>
          <Popover
            placement="bottomRight"
            title={() => {
              return (
                <React.Fragment>
                  <div style={{ padding: "10px" }}>
                    <h4 style={{ marginBottom: "0px" }}>
                      <b>{fullname}</b>
                    </h4>
                    <div style={{ color: "rgba(0, 0, 0, 0.37)" }}>{email}</div>
                  </div>
                </React.Fragment>
              );
            }}
            content={() => {
              return (
                <React.Fragment>
                  <a href="/dashboard/user/settings ">
                    <div className="navbar-hover">
                      <div>
                        <BsGear className="logout-icon" />
                        <span>Setting</span>
                      </div>
                    </div>
                  </a>
                  <Link to="/logout">
                    <div className="navbar-hover">
                      <div>
                        <BsBoxArrowLeft className="logout-icon" />
                        <span>Logout</span>
                      </div>
                    </div>
                  </Link>
                </React.Fragment>
              );
            }}
            trigger="click"
          >
            <img
              // src={`${process.env.REACT_APP_SERVER}/public/avatar/${avatar}`}
              src="https://yt3.ggpht.com/yti/APfAmoEvNH8PqmayaaY6PBVnmsD8WY5kpfxF1Oetn6zn=s88-c-k-c0x00ffffff-no-rj-mo"
              alt="avatar"
              className="avatar"
            />
          </Popover>
        </div>
      </Header>
    </React.Fragment>
  );
};
export default NavBar;
