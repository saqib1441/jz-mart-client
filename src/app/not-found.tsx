"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";
import { FC } from "react";
import NotFoundImg from "@/assets/not-found.png";
import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa6";
import { PiHouse } from "react-icons/pi";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

const NotFound: FC = () => {
  const router = useRouter();
  return (
    <main>
      {/* Navbar */}
      <Navbar />
      <div className="wrapper py-10 flex items-center justify-center flex-col">
        <div>
          <Image src={NotFoundImg} alt="jz-mart-page-not-found" priority />
        </div>
        <div className="w-[50%] mx-auto text-center space-y-5">
          <h1 className="text-2xl font-inter font-medium">
            404, Page not found
          </h1>
          <p>
            Something went wrong. It&#39;s look that your requested could not be
            found. It&#39;s look like the link is broken or the page is removed.
          </p>
          <div className="space-x-4">
            <Button onClick={() => router.back()}>
              <span>
                <FaArrowLeft />
              </span>
              <span>GO BACK</span>
            </Button>
            <Button variant="outline" className="text-primary">
              <span>
                <PiHouse />
              </span>
              <span>GO TO HOME</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default NotFound;
