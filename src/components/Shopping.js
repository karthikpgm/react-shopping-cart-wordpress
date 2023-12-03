import React from 'react';
import {Row, Col} from 'antd';
import ShoppingCart from './ShoppingCart';
import ProductList from './ProductList';
import { useParams } from 'react-router-dom';

const Shopping = (props) => {
    console.log(props)
    const { id } = useParams();

    console.log('ID from route:', id);
  
    return (
        <Row>
            <Col span={14}>

                <ProductList id={id}  />

            </Col>

            <Col span={10}>

                <ShoppingCart/>

            </Col>
        </Row>
    );
};

export default Shopping;