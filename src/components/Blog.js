import axios from "axios";
import React, { useEffect, useState } from "react";
import "./blog.css";

export default function Blog({ post }) {
  const [featuredImage, setFeaturedimage] = useState();

  const getImage = () => {
    // Access the wp:attachment link from the _links property
    if (post && post._links && post._links["wp:featuredmedia"] && post._links["wp:featuredmedia"][0]) {
      const wpAttachmentLink = post?._links["wp:attachment"][0]?.href;
      console.log(wpAttachmentLink);
      if (wpAttachmentLink) {
        fetch(wpAttachmentLink)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            // Access the image source URL from the data
            console.log(data)
            setFeaturedimage(data.source_url);
          })
          .catch((error) => {
            console.error("Error fetching image:", error);
          });
      } else {
        // Handle the case when the wp:attachment link is not available
        console.error("Featured image link not found in _links.");
      }
    } else {
      console.log("Image link not found.");
    }
  };
    

  useEffect(() => {
    getImage();
  }, []);

  return (
    <div className="container">
      <div className="blog-container">
        <p className="blog-date">
          {new Date(Date.now()).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <h2 className="blog-title">{post.title.rendered}</h2>
        <p
          className="blog-excerpt"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />
        <img src={featuredImage} className="mask" />
      </div>
    </div>
  );
}
