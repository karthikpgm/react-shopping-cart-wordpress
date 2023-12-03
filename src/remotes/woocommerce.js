import axios from "axios";
import OAuth from 'oauth-1.0a';
import CryptoJS from 'crypto-js'; // Add this line

/**
 * Default headers for doing API request to Woocommerce using API v3 and basic auth
 * @type {{params: {}, withCredentials: boolean, auth: {username: *, password: *}}}
 */
let defaultHeaders = {
    params: {},
    withCredentials: true,
    auth: {
        username: 'ck_a01c40337755e0a28e316060e45a05437a10e245',
        password: 'cs_c941c1287163164b1f7d6fd0388438db0b430a23'
    }
};

    const consumerKey = 'ck_a01c40337755e0a28e316060e45a05437a10e245';
    const consumerSecret = 'cs_c941c1287163164b1f7d6fd0388438db0b430a23';

    const oauth = OAuth({
    consumer: {
        key: consumerKey,
        secret: consumerSecret,
    },
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
        return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(base_string, key));
    },
    });



/**
 * Retrieves category tree
 * @returns {AxiosPromise<any>}
 */
const getCategories = () => {
   
    const requestData = {
        url: 'http://localhost/wordpress/wp-json/wc/v3/products/categories',
        method: 'GET',
        params : {
            per_page: 10
        },
      };
  
      const requestHeaders = oauth.toHeader(oauth.authorize(requestData));
  
      // Make your API request using the generated OAuth headers
      return axios({
        method: requestData.method,
        url: requestData.url,
        headers: {
          ...requestHeaders,
          // Add other headers as needed
        },
      })
       
    // return axios.get(`http://localhost/wordpress/wp-json/wc/v3/products/categories`, defaultHeaders);
};

/**
 * Retrieves products with category_id given as parameter
 * @param category_id
 * @returns {AxiosPromise<any>}
 */
const getProductsByCategory = (category, page, per_page) => {
    const requestData = {
        url: 'http://localhost/wordpress/wp-json/wc/v3/products',
        method: 'GET',
        params : {
            orderby: 'title',
            order: 'asc', 
            status: 'publish',
            category,
            per_page,
            page,
        },
      };
  
      const requestHeaders = oauth.toHeader(oauth.authorize(requestData));
  
      // Make your API request using the generated OAuth headers
      return axios({
        method: requestData.method,
        url: requestData.url,
        headers: {
          ...requestHeaders,
          // Add other headers as needed
        },
      })
    // return axios.get(`${process.env.REACT_APP_WOOCOMMERCE_API_ENDPOINT}/wp-json/wc/v3/products`, defaultHeaders)
};

const getCategoryById = (category_id) => {
    console.log(category_id);
    console.log('category id');
//    const requestData = {
//         url: 'http://localhost/wordpress/wp-json/wc/v3/products/categories/15',
//         method: 'GET',
//         params : {
//             per_page: 10
//         },
//       };
      const requestData = {
        url: `http://localhost/wordpress/wp-json/wc/v3/products/categories/${category_id}`,
        method: 'GET',
      };
      const requestHeaders = oauth.toHeader(oauth.authorize(requestData));
  
      // Make your API request using the generated OAuth headers
      return axios({
        method: requestData.method,
        url: requestData.url,
        headers: {
          ...requestHeaders,
          // Add other headers as needed
        },
      })
    // return axios.get(`${process.env.REACT_APP_WOOCOMMERCE_API_ENDPOINT}/wp-json/wc/v3/products/categories/${category_id}`, defaultHeaders)
};

/**
 * Get payment method info for checkout
 * @returns {AxiosPromise<any>}
 */
const getPaymentInfo = () => {
    const requestData = {
        url: 'http://localhost/wordpress/wp-json/wc/v3/payment_gateways',
        method: 'GET',
      };
  
      const requestHeaders = oauth.toHeader(oauth.authorize(requestData));
  
      // Make your API request using the generated OAuth headers
      return axios({
        method: requestData.method,
        url: requestData.url,
        headers: {
          ...requestHeaders,
          // Add other headers as needed
        },
      })
    // return axios.get(`${process.env.REACT_APP_WOOCOMMERCE_API_ENDPOINT}/wp-json/wc/v3/payment_gateways`, defaultHeaders);
};

/**
 * Get payment method info for checkout
 * @returns {AxiosPromise<any>}
 */
const CreateOrder = () => {
    const requestData = {
        url: 'http://localhost/wordpress/wp-json/wc/v3/orders',
        method: 'POST',
      };
  
      const requestHeaders = oauth.toHeader(oauth.authorize(requestData));
  
      // Make your API request using the generated OAuth headers
      return axios({
        method: requestData.method,
        url: requestData.url,
        headers: {
          ...requestHeaders,
          // Add other headers as needed
        },
      })
    // return axios.get(`${process.env.REACT_APP_WOOCOMMERCE_API_ENDPOINT}/wp-json/wc/v3/payment_gateways`, defaultHeaders);
};

/**
 * Get payment method info for checkout
 * @returns {AxiosPromise<any>}
 */
const getOrders = () => {
    const requestData = {
        url: 'http://localhost/wordpress/wp-json/wc/v3/orders',
        method: 'GET',
      };
  
      const requestHeaders = oauth.toHeader(oauth.authorize(requestData));
  
      // Make your API request using the generated OAuth headers
      return axios({
        method: requestData.method,
        url: requestData.url,
        headers: {
          ...requestHeaders,
          // Add other headers as needed
        },
      })
    // return axios.get(`${process.env.REACT_APP_WOOCOMMERCE_API_ENDPOINT}/wp-json/wc/v3/payment_gateways`, defaultHeaders);
};

export {getPaymentInfo, getProductsByCategory, getCategories, getCategoryById,CreateOrder,getOrders};