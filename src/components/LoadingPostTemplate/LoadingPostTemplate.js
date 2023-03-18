import React from "react";
import {Card, Skeleton} from "antd";
export const LoadingPostTemplate = ({windowSize}) => {
    return (
        windowSize > 930 ? (
        <Card title={<Skeleton.Input active/>} bordered={false} style={{
            width: 905,
            marginBottom: 10,
            border: "",
            borderRadius: 5,
            backgroundColor: "white",
            height: 280,
            overflow: "hidden"
        }}>
            <Skeleton active/>
        </Card>
        ) : (
            <Card style={{width: 300, marginBottom: 10}}>
                <Skeleton active/>
            </Card>
        )
    )
};

