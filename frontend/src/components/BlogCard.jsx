import React from "react";

const BlogCard = ({ image, date, category, title, excerpt }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 max-w-sm mx-auto">
      <img
        src={image}
        alt="Blog"
        className="rounded-md w-full h-56 object-cover"
      />
      <div className="mt-4 text-sm text-gray-500 flex gap-4 items-center">
        <span>📅 {date}</span>
        <span>📂 {category}</span>
      </div>
      <h2 className="mt-2 font-bold text-xl text-gray-800">{title}</h2>
      <p className="text-gray-600 mt-2 text-sm leading-relaxed">{excerpt}</p>
    </div>
  );
};

export default BlogCard;
