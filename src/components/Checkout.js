import React, {Component} from 'react';
import {Row, Col} from 'antd';
import ShoppingCart from './ShoppingCart';
import CheckoutForm from './CheckoutForm'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Checkout extends Component {

    render() {
        const { cart } = this.props;

        if (cart.length === 0) {
            return (
              <div>
                <p>Your cart is empty. <Link to="/">Browse products</Link></p>
              </div>
            );
          }
        return (
            <Row>
                <Col span={14}>

                    <h2>Checkout</h2>

                    <CheckoutForm />

                </Col>

                <Col span={10}>

                    <ShoppingCart/>

                </Col>
            </Row>
        );
    }
}
const mapStateToProps = state => ({
    cart: state.cart,
  });
  
export default connect(mapStateToProps)(Checkout);