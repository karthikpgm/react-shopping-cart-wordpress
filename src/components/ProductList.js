import React, { Component, Fragment,useState,useEffect } from 'react';
import { Spin, List, Card, Button, Pagination, Row, Col } from 'antd';
import { connect } from 'react-redux';
import { addToCart } from "../actions";
import { getProductsByCategory, getCategoryById } from "../remotes/woocommerce";
import no_image from '../img/no_image.jpg'
import { MinusOutlined,PlusOutlined } from '@ant-design/icons';

const { Meta } = Card;

// class ProductList extends Component {

//     constructor(props, state) {
//         super(props, state);

//         this.state = {
//             category_id: null,
//             products: [],
//             loading: false,
//             currentPage: 1,
//             category: []
//         }
//     }

//     fetchCategory = category_id => {
//         this.setState({
//             loading: true,
//         });

//         getCategoryById(category_id).then(response => {
//             this.setState({
//                 category: response.data,
//                 loading: false,
//             });
//         });
//     }

//     fetchProducts = (category_id, page, per_page) => {
//         this.setState({
//             loading: true,
//             products: [],
//             category_id
//         });

//         getProductsByCategory(category_id, page, per_page).then(response => {
//             this.setState({
//                 products: response.data,
//                 loading: false,
//                 currentPage: page
//             });
//         });
//     };

//     componentDidUpdate() {
//         console.log('did update');
//         // if (this.state.category_id !== this.props.match.params.id) {
//             this.fetchCategory(15);
//             this.fetchProducts(15, 1, process.env.REACT_APP_WOOCOMMERCE_PRODUCTS_PER_PAGE);
//         // }
//     }

//     renderPrices = (item) => {
//         if (parseFloat(item.price) === parseFloat(item.regular_price)) {
//             return <span>$ {item.price}</span>;
//         } else {
//             var discount = (1 - (parseInt(item.price)/parseInt(item.regular_price)))*100;
//             return (<span><span style={{color: "red", fontWeight: "bold"}}>{`${discount.toFixed(0)}%`}</span> | <strike>$ {item.regular_price}</strike> | <b>$ {item.price}</b></span>);
//         }
//     };

//     onChange = (page) => {
//         this.fetchProducts(this.state.category_id, page, process.env.REACT_APP_WOOCOMMERCE_PRODUCTS_PER_PAGE);
//     }

//     renderProducts = () => {
//         if (this.state.loading) {
//             return (
//                 <Spin size="large" tip="Loading Products..." />
//             );
//         }

//         if (!this.state.products || this.state.products.length === 0) {
//             return <p>No products in this category</p>
//         }

//         return (
//             <Fragment>
//                 <Row style={{marginBottom: 20}}>
//                     <Col>
//                         <Pagination defaultPageSize={parseInt(process.env.REACT_APP_WOOCOMMERCE_PRODUCTS_PER_PAGE)} showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`} defaultCurrent={this.state.currentPage} total={this.state.category.count} onChange={this.onChange}/>
//                     </Col>
//                 </Row>
//                 <Row>
//                     <Col>
//                         <List
//                             grid={{ gutter: 16, column: 3 }}
//                             dataSource={this.state.products}
//                             renderItem={item => (
//                                 <List.Item>
//                                     {
//                                         item.price > 0 && 
//                                         <Card
                                            
//                                             cover={<img alt="product" src={item.images[0] ? item.images[0].src : no_image} />}
//                                             actions={[
//                                                 <Button type="primary" icon="plus" onClick={() => this.props.addToCart(item)}>Add to Cart</Button>
//                                             ]}>                                    
//                                             <Meta
//                                                 title={item.name}
//                                                 description={this.renderPrices(item)}
//                                             />
//                                         </Card> 
//                                     }
//                                 </List.Item>
//                             )}
//                         />
//                     </Col>
//                 </Row>  
//             </Fragment>
//         );

//     };

//     render() {

//         return (
//             <div>
//                 <h1>Products on {this.state.category.name}</h1>
//                 {this.renderProducts()}
//             </div>
//         );
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         addToCart(product) {
//             dispatch(addToCart(product));
//         }
//     }
// };

// export default connect(null, mapDispatchToProps)(ProductList);


const ProductList = (props) => {
    const [category_id, setCategoryId] = useState(null);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
  
    useEffect(() => {
      // Check if the category_id has changed
      if (category_id !== props.id) {
        setCategoryId(props.id);
  
        // Fetch data based on the new category_id
        fetchCategory(props.id);
        fetchProducts(props.id, 1, process.env.REACT_APP_WOOCOMMERCE_PRODUCTS_PER_PAGE);
      }
    }, [props.id]); // Only re-run the effect if props.match.params.id changes
  
    const fetchCategory = async (categoryId) => {
      try {
        const response = await getCategoryById(categoryId);
        setCategory(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching category:', error);
        setLoading(false);
      }
    };
  
    const fetchProducts = async (categoryId, page, per_page) => {
      try {
        const response = await getProductsByCategory(categoryId, page, per_page);
        setCategory((prevCategory) => ({
          ...prevCategory,
          products: response.data,
          loading: false,
          currentPage: page,
        }));
      } catch (error) {
        console.error('Error fetching products:', error);
        // Handle error or set appropriate state
        setCategory((prevCategory) => ({
          ...prevCategory,
          loading: false,
        }));
      }
    };
    const renderPrices = ()=>{

    };
    // Conditionally render only if loading is true
    if (loading) {
        return <p>Loading...</p>;
    }
    const onChange = (page) => {
        this.fetchProducts(category.category_id, page, process.env.REACT_APP_WOOCOMMERCE_PRODUCTS_PER_PAGE);
    }

    // Conditionally render only if category and category.products are available
    if (!category || !category.products) {
      return <p>Loading or no products available</p>;
    }
    return (
        <div>
        <p>{category.description}</p>
        <h1>Products on {category && category.name}</h1>
        {category && (
          <Fragment>
            <Row style={{ marginBottom: 20 }}>
                <Col>
                    <Pagination
                    defaultPageSize={parseInt(process.env.REACT_APP_WOOCOMMERCE_PRODUCTS_PER_PAGE)}
                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                    defaultCurrent={currentPage}
                    total={category && category.count ? category.count : 0} // Ensure category and category.count are available
                    onChange={onChange}
                    />
                </Col>
            </Row>

            <Row>
              <Col>
                
              <List
                grid={{ gutter: 16, column: 3 }}
                dataSource={category && category.products ? category.products : []}
                renderItem={(item) => (
                    <List.Item>
                    {/* {item.price > 0 && ( */}
                        <Card
                        cover={<img alt="product" src={item.images[0] ? item.images[0].src : no_image} />}
                        actions={[
                            <Button type="primary" icon={<PlusOutlined />} onClick={() => props.addToCart(item)}>
                            Add to Cart
                            </Button>,
                        ]}
                        >
                        <Meta title={item.name} description={renderPrices(item)} />
                        </Card>
                    {/* )} */}
                    </List.Item>
                )}
                />

               
              </Col>
            </Row>
          </Fragment>
        )}
      </div>
  
    );
  };
  const mapDispatchToProps = (dispatch) => {
    return {
        addToCart(product) {
            dispatch(addToCart(product));
        }
    }
};
  export default connect(null, mapDispatchToProps)(ProductList);
  