import React from 'react';
import { Layout, Menu } from  'antd';
import { Link } from 'react-router-dom';

const {Header} = Layout;

const AppHeader = () => {
    return (

        <Header className="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            
            <div className="logo">
                <img src=""
                     alt="Karthik"/>
            </div>

            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['home']}
                style={{lineHeight: '64px'}}
            >
                <Menu.Item key="home"><Link to="/">Home</Link></Menu.Item>
                <Menu.Item key="about"><Link to="/about/">About</Link></Menu.Item>
                <Menu.Item key="contact"><Link to="/contact/">Contact</Link></Menu.Item>
            </Menu>
        </Header>
    );
};

export default AppHeader;