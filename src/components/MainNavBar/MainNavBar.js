import React from "react";
import {Link, useLocation} from 'react-router-dom';
import './MainNavBar.css'
import {Breadcrumb, Col, Layout, Menu, Row, Typography} from 'antd';

const {Header, Content, Footer} = Layout;
const {Text} = Typography;


export const MainNavBar = (props) => {
    const {pathname} = useLocation();

    return (
        <Layout className="layout" style={{background: 'rgba(255, 255, 255, 0.3)'}}>
            <Header className="header" style={{position: 'fixed', top: 0, width: '100%', zIndex: 999999}}>
                <Menu theme="dark" mode="horizontal" selectedKeys={[pathname]}
                      className="main-menu">
                    <Menu.Item key="logo">
                        <Link to="/" className="items" style={{filter: 'blur(5px)', backgroundColor: 'darkgrey'}}>
                            ГЛАВНАЯ
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/">
                        <Link to="/" className="items">
                            Главная
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/posts">
                        <Link to="/posts" className="items">
                            Посты
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/error404">
                        <Link to="/error404" className="items">
                            Error404
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/login">
                        <Link to="/login" className="items">
                            Авторизация
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/registration">
                        <Link to="/registration" className="items">
                            Регистрация
                        </Link>
                    </Menu.Item>
                </Menu>
            </Header>
            <Content style={{padding: '0 15px 50px', marginTop: 70}}>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>
                        <Text type="secondary">Путь: </Text>
                        {pathname}
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Content>
                    <div className="site-layout-content"
                         style={{background: '#DCDCDC', borderRadius: 10, paddingBottom: 10, paddingTop: 10}}>
                        {props.children}
                    </div>
                </Content>
            </Content>
            <Footer style={{textAlign: 'center', width: '100%'}}>
                <Row size="small">
                    <Col span={12} style={{textAlign: "left"}}>
                        React project 2023
                    </Col>
                    <Col span={12} style={{textAlign: "right"}}>
                        TheKost_
                    </Col>
                </Row>
            </Footer>
        </Layout>
    );
};
