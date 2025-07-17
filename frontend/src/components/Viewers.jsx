import React from "react";

const keywords = [
  "Blue diamon almonds",
  "Angie’s Boomchickapop Corn",
  "Salty kettle Corn",
  "Chobani Greek Yogurt",
  "Sweet Vanilla Yogurt",
  "Foster Farms Takeout Crispy wings",
  "Warrior Blend Organic",
  "Chao Cheese Creamy",
  "Chicken meatballs",
  "Blue diamon almonds",
  "Angie’s Boomchickapop Corn",
  "Salty kettle Corn",
  "Chobani Greek Yogurt",
  "Sweet Vanilla Yogurt",
  "Foster Farms Takeout Crispy wings",
  "Warrior Blend Organic",
  "Chao Cheese Creamy",
  "Chicken meatballs",
];

const TrendingSearches = () => {
  return (
    <section className="px-6 py-10 h-75 w-full">
      <h2 className="text-2xl font-bold mb-6">People are also looking for</h2>
      <div className="flex flex-wrap gap-3 font-[500]">
        {keywords.map((item, index) => (
          <span
            key={index}
            className={`px-4 py-2 rounded-md text-sm text-gray-700 cursor-pointer bg-orange-50 hover:bg-orange-100 transition ${
              index === 3 ? "bg-yellow-100 font-medium" : ""
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
};

export default TrendingSearches;
