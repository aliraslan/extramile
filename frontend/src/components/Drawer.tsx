import React, { PureComponent } from "react";
import { Drawer, Icon, Button, Menu } from "antd";
import { Link } from "react-router-dom";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
export class DrawerView extends PureComponent {
  state = { visible: false };
  showDrawer = () => {
    this.setState({
      visible: true
    });
  };
  onClose = () => {
    this.setState({
      visible: false
    });
  };
  render() {
    return (
      <div>
        <div>
          <img
            onClick={this.showDrawer}
            style={{
              width: "25px",
              position: "absolute",
              top: "3%",
              left: "2%"
            }}
            src="https://img.icons8.com/material/24/000000/menu.png"
          />
          <Drawer
            title="Menu"
            placement="left"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            <Menu style={{ width: 256 }} defaultOpenKeys={["sub1"]}>
              <Menu.Item key="1">
                <Icon type="global" />
                Map
                <Link to="/map" />
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="solution" />
                Edit Profile
                <Link to="/editprofile" />
              </Menu.Item>
            </Menu>
          </Drawer>
        </div>
      </div>
    );
  }
}
