import React from "react";
import BlogCard from "./BlogCard";


const BlogList = () => {
  const blogData = [
    {
      image: "/orange.jpg", 
      date: "22 AUG 2021",
      category: "TIPS & TRICKS",
      title: "Top 10 casual look ideas to dress up your kids",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipi elit. Aliquet eleifend viverra enim tincidunt donec quam. A in arcu, hendrerit neque dolor morbi...",
    },
    {
      image: "/kajjuu.jpg",
      date: "25 AUG 2021",
      category: "TRENDING",
      title: "Latest trends of wearing street wears supremely",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipi elit. Aliquet eleifend viverra enim tincidunt donec quam. A in arcu, hendrerit neque dolor morbi...",
    },
    {
      image: "gobhi.jpg",
      date: "28 AUG 2021",
      category: "INSPIRATION",
      title: "10 Different Types of comfortable clothes ideas for women",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipi elit. Aliquet eleifend viverra enim tincidunt donec quam. A in arcu, hendrerit neque dolor morbi...",
    },
  ];

  return (
    
    <div className="bg-gray-50 py-10 px-5 flex justify-center h-full ">
      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {blogData.map((blog, index) => (
          <BlogCard key={index} {...blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
