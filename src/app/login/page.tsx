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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { loginUser } from "@/store/slices/AuthSlice";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { PayloadInterface } from "@/lib/types";

const Login: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { isLoggedIn, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  const loginHandler = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const result = await dispatch(loginUser({ email, password }));
      const response = result.payload as PayloadInterface;

      if (!response.success) {
        return toast.error(response.message);
      }

      setEmail("");
      setPassword("");
      toast.success(response.message);
      router.push("/");
      return;
    } catch (error: unknown) {
      return toast.error(
        error instanceof Error ? error.message : "Failed to login"
      );
    }
  };

  return (
    <main>
      {/* Navbar */}
      <Navbar />

      {/* Loader */}
      {loading && <Loader />}

      <div className="wrapper py-20 flex items-center">
        <div className="w-[50%]">
          <Image src={SignUpImg} alt="jz-mart-signup-image" priority />
        </div>
        <div className="w-[50%] py-10 px-14 flex flex-col gap-5">
          <h1 className="text-center text-2xl font-inter font-semibold">
            Welcome back to JZ Mart
          </h1>
          <form onSubmit={loginHandler}>
            <div className="grid gap-5">
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
              <div className="flex justify-center">
                <Button className="px-16">Login</Button>
              </div>
            </div>
          </form>
          <p className="text-center">
            Don&#39;t have an account?{" "}
            <Link href="/signup" className="text-primary">
              Signup
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
              <span>Login with google</span>
            </button>
            <button className="border flex items-center gap-2 py-2 px-5 rounded">
              <span className="text-2xl text-blue-600">
                <FaFacebook />
              </span>
              <span>Login with facebook</span>
            </button>
          </div>
          <p className="bg-muted rounded py-3 px-5">
            By processing you agree our term and conditions, Privacy Policy, and
            consent to receive emails about the plateform productsand services.
            If you do not agree, please do not proceed.
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default Login;
