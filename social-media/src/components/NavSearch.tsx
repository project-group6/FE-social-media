import React from "react";
import { BiSearch } from "react-icons/bi";

const NavSearch = () => {
  return (
    <form className="flex bg-white  items-center justify-between w-auto h-11 rounded-full px-5">
      <label className="flex gap-3">
        <input type="text" placeholder="Search" className="bg-transparent text-black focus:outline-none " />
        <BiSearch />
      </label>
    </form>
  );
};

export default NavSearch;
