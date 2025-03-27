"use client";

import Image from "next/image";
import { FC, FormEvent, useEffect, useState } from "react";
import SignUpImg from "@/assets/signup.png";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import toast from "react-hot-toast";
import { sendOtp } from "@/store/slices/AuthSlice";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { PayloadInterface } from "@/lib/types";

const Signup: FC = () => {
  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { loading, isLoggedIn } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!fullname || !email || !password) {
      toast.error("Please fill in all the required fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await dispatch(
        sendOtp({ fullname, email, password, purpose: "register" })
      );

      const result = response.payload as PayloadInterface;
      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      router.push("/verification");
      setFullname("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error: unknown) {
      return toast.error(
        error instanceof Error
          ? error.message
          : "Failed to register. Please try again later."
      );
    }
  };

  return (
    <main>
      {/* Navbar */}
      <Navbar />

      {loading && <Loader />}

      <div className="wrapper py-20 flex items-center">
        <div className="w-[50%]">
          <Image src={SignUpImg} alt="jz-mart-signup-image" priority />
        </div>
        <div className="w-[50%] py-10 px-14 flex flex-col gap-5">
          <h1 className="text-center text-2xl font-inter font-semibold">
            Welcome to JZ Mart, Sign Up Now
          </h1>
          <form onSubmit={submitHandler}>
            <div className="grid gap-5">
              <div className="grid gap-2">
                <Label htmlFor="fullname">Full Name</Label>
                <Input
                  type="text"
                  id="fullname"
                  placeholder="Enter your name"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  type="password"
                  id="confirm-password"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-center">
                <Button className="px-14">Create Account</Button>
              </div>
            </div>
          </form>
          <p className="text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-primary">
              Login
            </Link>
          </p>
          <div className="text-center font-inter font-medium text-lg text-muted-foreground flex items-center gap-4">
            <hr className="grow" />
            OR
            <hr className="grow" />
          </div>
          <div className="flex items-center justify-center gap-3">
            <button className="border flex items-center gap-2 py-2 px-5 rounded">
              <span className="text-2xl">
                <FcGoogle />
              </span>
              <span>Signup with Google</span>
            </button>
            <button className="border flex items-center gap-2 py-2 px-5 rounded">
              <span className="text-2xl text-blue-600">
                <FaFacebook />
              </span>
              <span>Signup with Facebook</span>
            </button>
          </div>
          <p className="bg-muted rounded py-3 px-5 text-sm">
            By proceeding, you agree to our{" "}
            <Link href="/terms" className="text-primary">
              Terms and Conditions
            </Link>
            ,{" "}
            <Link href="/privacy" className="text-primary">
              Privacy Policy
            </Link>
            , and consent to receive emails about platform products and
            services. If you do not agree, please do not proceed.
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default Signup;
