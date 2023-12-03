import React, {Component} from 'react';
import {Layout, Menu, Spin} from 'antd';
import {Link} from 'react-router-dom';
import {getCategories} from "../../remotes/woocommerce";

const {Sider} = Layout;


const SideStyle = {
    textAlign: 'center'
};

const categoryImage = {
    width: '30px',
    height: '30px',
    marginRight: '10px'
};


class SideMenu extends Component {

    constructor(props, state) {
        super(props, state);

        this.state = {

            loading: true,
            categories: []

        };

    }

    componentDidMount() {


            getCategories().then(response => {

                this.setState({
                    categories: response.data,
                    loading: false
                });

            });
    }

    renderCategories = () => {

        if (this.state.loading) {
            return (
                <div style={SideStyle}>
                    <Spin size="large" tip="Loading Categories..."/>
                </div>
            );
        }

        if (!this.state.categories || this.state.categories.length === 0) {
            return <p>No categories to show</p>
        }

        return (
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                style={{height: '100%'}}
            >
                {
                    this.state.categories.map((category) => {
                        return ( category.count > 0 && 
                            <Menu.Item key={category.id}>
                                <Link to={`/category/${category.id}`}>
                                    {
                                        category.image &&
                                        <img src={category.image.src} alt={category.name} style={categoryImage}/>
                                    }
                                    { 
                                        category.name + "  (" + category.count + ")" 
                                    } 
                                </Link>
                            </Menu.Item>
                        );
                    })
                }

            </Menu>
        );

    };

    render() {

        return (
            <Sider width={220}
                   style={{background: '#fff'}}
            >

                <h2>Categories</h2>

                {this.renderCategories()}

            </Sider>

        );
    }
}

export default SideMenu;