import React from "react";
import {Link, useLocation} from 'react-router-dom';
import './MainNavBar.css'
import {Breadcrumb, Col, Layout, Menu, Row, Typography} from 'antd';

const {Header, Content, Footer} = Layout;
const {Text} = Typography;


export const MainNavBar = (props) => {
    const {pathname} = useLocation();

    return (
        <Layout>
            <Header style={{position: 'sticky', top: 0, zIndex: 1, width: '100%'}}>
                <Menu theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}>
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
            <Content className="site-layout" style={{padding: '0 15px 50px'}}>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>
                        <Text type="secondary">Путь: </Text>
                        {pathname}
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Content>
                    <div style={{
                        minHeight: 380,
                        borderRadius: 10,
                        paddingBottom: 10,
                        paddingTop: 10
                    }}>
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
