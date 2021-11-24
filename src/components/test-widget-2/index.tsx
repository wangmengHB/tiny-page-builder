import React from 'react';
import { Badge, Avatar } from 'antd';
import 'antd/dist/antd.css';



export default function TestWidget2({ value}) {
    return (
        <div style={{ marginRight: 3 }}>
        <Badge count={value || 0}>
            <Avatar shape="square" size="large" />
        </Badge>
        </div>
        
    )
}
