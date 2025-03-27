import { FC } from "react";

const Loader: FC = () => {
  return (
    <div className="h-screen flex items-center justify-center fixed top-0 left-0 w-full bg-white/50 backdrop-blur z-50">
      <div className="dot-spinner">
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
      </div>
    </div>
  );
};

export default Loader;
