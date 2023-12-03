import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Checkbox, Button,message } from 'antd';
import { getPaymentInfo,CreateOrder } from "../remotes/woocommerce";
import { useNavigate } from 'react-router-dom'; // Import useHistory hook
import { ResetCart } from '../actions';
import { useDispatch } from 'react-redux';

// ...


const { Option } = Select;

const CheckoutForm = () => {
    const dispatch = useDispatch();

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [form] = Form.useForm();
  const navigate = useNavigate(); // Initialize useHistory hook


  useEffect(() => {
    // Fetch payment methods when component mounts
    getPaymentInfo().then(response => {
      setPaymentMethods(response.data);
    });
  }, []);

  

  const onFinish = async (values) => {
    console.log('Received values:', values);

    try {
       // Prepare order data
       const orderData = {
        payment_method: values.paymentMethod,
        billing: {
          first_name: values.fullName,
          email: values.email,
          address_1: values.address,
        },
        line_items: [
          {
            product_id: 1, // Replace with the actual product ID
            quantity: 1,
          },
          // Add more line items as needed
        ],
        // Add more order details as needed
      };
      const response = await CreateOrder(orderData);
      console.log('Order created:', response.data);
      message.success('Order placed successfully!');
        // Dispatch the action to reset the cart after placing the order
      dispatch(ResetCart());

      navigate('/order-history'); // Replace with the actual route

    } catch (error) {
        console.error('Error creating order:', error);
        message.error('Failed to place the order. Please try again.');
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item label="Full Name" name="fullName" rules={[{ required: true, message: 'Please enter your full name!' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please enter your address!' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Payment Method" name="paymentMethod" rules={[{ required: true, message: 'Please select a payment method!' }]}>
        <Select placeholder="Select a payment method">
          {paymentMethods.map(method => (
            <Option key={method.id} value={method.id}>{method.name}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="subscribe" valuePropName="checked">
        <Checkbox>Subscribe to newsletter</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Place Order
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CheckoutForm;
