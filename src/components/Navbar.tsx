"use client";

import Link from "next/link";
import React, { FC } from "react";
import NavTabs from "./NavTabs";
import Logo from "./Logo";
import Search from "./Search";
import { FaUser } from "react-icons/fa6";
import { LuRadar } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { logoutUser } from "../store/slices/AuthSlice";
import toast from "react-hot-toast";
import { PayloadInterface } from "@/lib/types";

const Navbar: FC = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async () => {
    try {
      const response = await dispatch(logoutUser());
      const result = response.payload as PayloadInterface;

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
    } catch (error: unknown) {
      return toast.error(
        error instanceof Error ? error.message : "Failed to logout"
      );
    }
  };

  return (
    <nav>
      {/* Top Bar Img */}
      <div className="topBarImg h-[45px] sm:h-[75px] md:h-[100px]"></div>
      <div className="wrapper">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-3">
          <p className="text-sm sm:text-base">
            Welcome to JZ Mart - An Online Market
          </p>
          <div className="sm:flex items-center gap-2 hidden">
            <Link href="/">Be Partner</Link>
            <p>|</p>
            <Link href="/">My Market</Link>
          </div>
        </div>

        {/* Tabs */}
        <NavTabs />

        {/* Nav */}
        <div className="flex items-center justify-between mt-3">
          {/* Logo */}
          <Logo />

          {/* Search */}
          <Search className="w-[45%] md:flex hidden" />

          {/* Icons */}
          <div className="flex items-center gap-3 sm:gap-5 text-sm sm:text-base">
            {isLoggedIn ? (
              <button
                className="flex flex-col items-center gap-1 hover:text-primary transition-all duration-300 cursor-pointer"
                onClick={handleLogout}
              >
                <span className="text-xl sm:text-2xl">
                  <FaUser />
                </span>
                <span>Logout</span>
              </button>
            ) : (
              <Link
                href="/signup"
                className="flex flex-col items-center gap-1 hover:text-primary transition-all duration-300"
              >
                <span className="text-xl sm:text-2xl">
                  <FaUser />
                </span>
                <span>Login/Signup</span>
              </Link>
            )}
            <Link
              href="/"
              className="flex flex-col items-center gap-1 hover:text-primary transition-all duration-300"
            >
              <span className="text-xl sm:text-2xl">
                <LuRadar />
              </span>
              <span>Near Me</span>
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        <Search className="flex mt-3 md:hidden" />
      </div>
    </nav>
  );
};

export default Navbar;
