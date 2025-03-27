"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { FC, FormEvent, useEffect, useState } from "react";
import VerificationImg from "@/assets/verification.jpg";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { registerUser, sendOtp } from "@/store/slices/AuthSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { PayloadInterface } from "@/lib/types";

const Verification: FC = () => {
  const [otp, setOtp] = useState<string | undefined>("");
  const dispatch = useDispatch<AppDispatch>();
  const { loading, tempData, isLoggedIn } = useSelector(
    (state: RootState) => state.auth
  );
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  const otpHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!otp) {
      toast.error("Please fill otp");
      return;
    }

    try {
      const response = await dispatch(registerUser({ ...tempData, otp }));
      const result = response.payload as PayloadInterface;

      setOtp("");

      if (!result.success) {
        toast.error(result.message);
        router.push("/signup");
        return;
      }

      toast.success(result.message);
      router.push("/");
    } catch (error: unknown) {
      router.push("/signup");
      return toast.error(
        error instanceof Error ? error.message : "Failed to register"
      );
    }
  };

  const resendOtpHandler = async () => {
    try {
      const response = await dispatch(sendOtp(tempData));
      const result = response.payload as PayloadInterface;

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success("Otp sent successfully!");
    } catch (error: unknown) {
      return toast.error(
        error instanceof Error ? error.message : "Failed to send otp."
      );
    }
  };

  return (
    <main>
      {/* Navbar */}
      <Navbar />

      {loading && <Loader />}

      <div className="wrapper flex items-center justify-center pt-20 pb-10">
        <div className="w-[450px] border shadow p-7 rounded flex flex-col gap-5">
          <div>
            <Image
              src={VerificationImg}
              alt="jz-mart-verfication"
              priority
              className="h-[200px] w-fit mx-auto"
            />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-inter font-medium mb-1">
              OTP Verification
            </h1>
            <p>
              Thank you for joining JZ Mart. Please chack your email we have
              sent and OTP (One time password) on your email.
            </p>
          </div>
          <form className="space-y-5" onSubmit={otpHandler}>
            <div className="space-y-2">
              <Label htmlFor="otp" className="font-inter font-medium text-base">
                Your Verification Code
              </Label>
              <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS}
                value={otp}
                onChange={(e) => setOtp(e)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <Button className="w-full">Submit</Button>
          </form>
          <div>
            Did not recieve code?{" "}
            <button
              className="text-primary cursor-pointer"
              onClick={resendOtpHandler}
              type="button"
            >
              Resend
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default Verification;
