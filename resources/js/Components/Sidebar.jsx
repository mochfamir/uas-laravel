import React, { useState } from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import {
    LaptopOutlined,
    TeamOutlined,
    ApartmentOutlined,
} from "@ant-design/icons";

const { Header, Content, Sider } = Layout;

const items = [
    {
        key: "products",
        icon: React.createElement(LaptopOutlined),
        label: "Products",
    },
    {
        key: "customers",
        icon: React.createElement(TeamOutlined),
        label: "Customers",
    },
    {
        key: "staffs",
        icon: React.createElement(ApartmentOutlined),
        label: "Staffs",
    },
];

const Sidebar = (props) => {
    return (
        <Layout>
            <Layout>
                <Sider width={200}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={["products"]}
                        style={{
                            height: "90vh",
                            borderRight: 0,
                        }}
                        items={items}
                        onSelect={(e) => props.setSelectedKey(e.key)}
                    />
                </Sider>
                <Layout
                    style={{
                        padding: "0 24px 24px",
                    }}
                >
                    <Content
                        style={{
                            padding: 24,
                            marginTop: 10,
                            minHeight: 280,
                            backgroundColor: "white",
                        }}
                    >
                        {props.content}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};
export default Sidebar;
