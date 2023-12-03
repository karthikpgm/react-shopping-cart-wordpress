import React, { useEffect } from 'react';
import OAuth from 'oauth-1.0a';
import axios from 'axios';
import CryptoJS from 'crypto-js'; // Add this line

const WooCommerceComponent = () => {
    useEffect(() => {
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
  
      // Example: Creating an OAuth signature for a request
      const requestData = {
        url: 'http://localhost/wordpress/wp-json/wc/v3/products',
        method: 'GET',
      };
  
      const requestHeaders = oauth.toHeader(oauth.authorize(requestData));
  
      // Make your API request using the generated OAuth headers
      axios({
        method: requestData.method,
        url: requestData.url,
        headers: {
          ...requestHeaders,
          // Add other headers as needed
        },
      })
        .then((response) => {
          // Handle the API response
          console.log('API Response:', response.data);
        })
        .catch((error) => {
          // Handle errors
          console.error('API Request Error:', error);
        });
    }, []);
  
    return <div>Your React Component</div>;
  };
  
  export default WooCommerceComponent;
  