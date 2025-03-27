import HeaderSwiper from "@/components/HeaderSwiper";
import Navbar from "@/components/Navbar";
import { FC } from "react";

const Home: FC = () => {
  return (
    <main>
      {/* Navbar */}
      <Navbar />

      {/* Header Swiper */}
      <HeaderSwiper />
    </main>
  );
};

export default Home;
