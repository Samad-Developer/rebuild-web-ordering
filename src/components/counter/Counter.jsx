// the counter nned to get different style width and heigh plus minue button and number of count each and eveyr thing need to be customize
import React from 'react';
import { Button } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

const Counter = () => {
    return (
        // there will be add to cart button when someone click on that then it will roate like 3d and show the counter 
        <div>
            <Button className="w-[40px] h-[40px] rounded-full flex items-center justify-center">
                <PlusOutlined />
            </Button>
            <span className="w-[40px] h-[40px] flex items-center justify-center">1</span>
            <Button className="w-[40px] h-[40px] rounded-full flex items-center justify-center">
                <MinusOutlined />
            </Button>
            <Button className="w-[40px] h-[40px] rounded-full flex items-center justify-center">
                <ShoppingCartOutlined />
            </Button>
        
        </div>
    )
}

export default Counter;
