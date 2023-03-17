import './App.css';
import './mycss.css';
import {ButtonUI, MainNavBar, PostPage, Posts} from './components/';
import {Result, List, Avatar, Space} from 'antd';
import React from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import {LikeOutlined, MessageOutlined, StarOutlined} from "@ant-design/icons";
import Title from "antd/es/typography/Title";


function App() {
    return (
        <MainNavBar>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/posts' element={<Posts/>}/>
                <Route path='/post/:id' element={<PostPage/>}/>
                <Route path='*' element={<NotFoundError/>}/>
            </Routes>
        </MainNavBar>
    );
}


const data = Array.from({
    length: 23,
}).map((_, i) => ({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: `https://joesch.moe/api/v1/random?key=${i}`,
    description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));

const IconText = ({icon, text}) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);


const HomePage = () => (
    <>
        <Title level={1} style={{textAlign: "center"}}>Главная</Title>
        <List style={{margin: 20}}
              itemLayout="vertical"
              size="large"
              pagination={{
                  onChange: (page) => {
                      console.log(page);
                  },
                  pageSize: 3,
              }}

              dataSource={data}

              renderItem={(item) => (
                  <List.Item
                      style={{margin: 10, border: 'solid', backgroundColor: 'white'}}
                      key={item.title}
                      actions={[
                          <IconText icon={StarOutlined} text="156" key="list-vertical-star-o"/>,
                          <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o"/>,
                          <IconText icon={MessageOutlined} text="2" key="list-vertical-message"/>,
                      ]}
                      extra={
                          <img
                              width={272}
                              alt="logo"
                              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                          />
                      }>
                      <List.Item.Meta
                          avatar={<Avatar src={item.avatar}/>}
                          title={<a href={item.href}>{item.title}</a>}
                          description={item.description}
                      />
                      {item.content}
                  </List.Item>
              )}
        />
    </>
);


const NotFoundError = () => {
    const {pathname} = useLocation();
    const message = `Запрошенная страница не существует ошибка при получении информации с URL: ${pathname}`;
    const error = new Error(message);
    error.statusCode = 404;
    return (
        <Result
            status="404"
            title="404"
            subTitle={message}
            extra={
                <ButtonUI type={"primary"} className={"ant-btn-primary ant-btn"} to={"/"}
                          style={{textDecoration: 'none'}}
                          label={"Вернуться на главную"}/>
            }
        />
    );
};


export default App;
