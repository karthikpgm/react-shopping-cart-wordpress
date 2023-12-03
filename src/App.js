import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Route,Routes} from "react-router-dom";
import {Layout} from 'antd';
import AppHeader from './components/Layout/AppHeader';
import SideMenu from './components/Layout/SideMenu';
import AboutUs from './components/AboutUs';
import Shopping from "./components/Shopping";
import Checkout from "./components/Checkout";
import OrderHistory from './components/OrderHistory';

const {Content, Footer} = Layout;

const Index = () => <h2>Home</h2>;
const Contact = () => <h2>Contact Us</h2>;

class App extends Component {
    render() {
        // return (
        //     <Layout>
                
        //         <Router>
        //             <Fragment>
        //                 <AppHeader/>

        //                 <Content style={{padding: '0 20px'}}>
        //                     <Layout style={{padding: '24px 0', background: '#fff'}}>
        //                         <SideMenu/>
                                

        //                         <Content style={{padding: '0 24px', minHeight: 280}}>
        //                         <Routes>
        //                              <Route path="/" exact component={Index}/>
        //                             <Route path="/category/:id" component={Shopping}/>
        //                             <Route path="/about/" component={AboutUs}/>
        //                             <Route path="/contact/" component={Contact}/>
        //                             <Route path="/checkout/" component={Checkout}/>
        //                         </Routes>
        //                         </Content>
                                   
        //                     </Layout>
        //                 </Content>

        //                 <Footer style={{textAlign: 'center'}}>
        //                     React-Woocommerce | ReactJS interfase using Ant Design for Woocommerce API
        //                 </Footer>

        //             </Fragment>
        //         </Router>
        //     </Layout>

        // );
        return (
            <Layout>
                <Router>
                    <Fragment>
                        <AppHeader/>
                        <Content style={{padding: '0 20px'}}>
                            <Layout style={{padding: '24px 0', background: '#fff'}}>
                            <SideMenu/>

                                <Content style={{padding: '0 24px', minHeight: 280}}>
                                    <Routes>
                                       <Route path="/" exact element={<Index />}/>
                                       <Route path="/category/:id" element={<Shopping/>}/>
                                       <Route path="/about/" element={<AboutUs />}/>
                                       <Route path="/contact/" element={<Contact/>}/>
                                       <Route path="/checkout/" element={<Checkout/>}/>
                                       <Route path="/order-history/" element={<OrderHistory/>}/>
                                    </Routes>
                                </Content>
                            </Layout>
                        </Content>
                    </Fragment>
                </Router>
            </Layout>
        );
    }
}

export default App;