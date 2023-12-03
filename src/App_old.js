import React, { useEffect, useState } from 'react';
import axios from "axios";
import Blog from './components/Blog';
import WooCommerceComponent from './components/WooCommerceComponent';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  const fetchPosts = () => {
    axios
      .get("http://localhost/wordpress/wp-json/wp/v2/posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        setError(err);
      });
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <WooCommerceComponent />
      {/* {error && <p>Error: {error.message}</p>}
      {posts.map((item) => (
        <Blog
          key={item.id} // You should include a unique key for each post
          post={item}
        />
      ))} */}
    </div>
  );
}
