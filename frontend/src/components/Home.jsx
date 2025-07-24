
import React from "react";
import Navbar from "./Navbar";
import Header from "./Header"
import Footer from "./Footer";
import Blogs from "./Blogs";
import Justarrived from "./Justarrived";
import Mostpopular from "./Mostpopular";
import Discountform from "./Discountform";
import Newarrived from "./Newarrived";
import Category from "./Category";
import Hero from "./Hero";
import Viewers from "./Viewers";
// import Brands from './Brands'
import PromoCard from "./PromoCard";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Header/>
      <Hero />
      <Category />
      {/* <Brands/> */}
      <Newarrived />
      <Discountform />
      <Justarrived />
      <PromoCard/>
      <Mostpopular />
      <Blogs />
      <Viewers/>
      <Footer />
    </div>
  );
}
