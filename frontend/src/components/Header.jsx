import React, { useState } from "react";
import Button from "@mui/material/Button";
import { HiMenuAlt1 } from "react-icons/hi";
import { FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import Category from "./Category";
// import Header from "./Header"
const Navigation = () => {
  const [open, setOpen] = useState(false);
  const handleOpenCategory = () => setOpen(true);

  const categories = [
    "fashions",
    "electronics",
    "fruits",
    "vegetables",
    "groceries",
    "beauty",
  ];

  return (
    <>
      {/* <Header/> */}
      <nav className="py-2">
        <div className="container flex items-center justify-end gap-8">
          <div className="col_1 w-[25%]">
            <Button
              className="!text-black gap-2 w-full"
              onClick={handleOpenCategory}
            >
              <HiMenuAlt1 className="text-[20px]" />
              Shop By Departments
              <FaAngleDown className="text-[14px]" />
            </Button>
          </div>

          <div className="col_2 w-[75%] ">
            <ul className="flex items-center gap-7">
              {categories.map((cat) => (
                <li key={cat} className="list-none capitalize">
                  <Link
                    to={`/category/${cat}`}
                    className="link transition text-[14px] font-[500]"
                  >
                    <Button className="link transition !text-black capitalize">
                      {cat}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <Category open={open} opencategory={setOpen} />
    </>
  );
};

export default Navigation;
