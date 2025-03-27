import Link from "next/link";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="py-10">
      <div className="border py-2 text-center space-x-3">
        <Link href="/terms">Terms & Conditions</Link>
        <span>|</span>
        <Link href="/privacy">Privacy Policy</Link>
        <span>|</span>
        <Link href="/sell">
          Sell on <span className="text-primary">JZ Mart</span>
        </Link>
        <span>|</span>
        <Link href="/advertise">
          Advertise on <span className="text-primary">JZ Mart</span>
        </Link>
        <span>|</span>
        <Link href="/about">About Us</Link>
        <span>|</span>
        <Link href="/about">Contact Us</Link>
      </div>
      <div className="border text-center py-2">
        <p>
          Copyright &copy; 2025{" "}
          <Link href="/" className="text-primary">
            JZ Mart
          </Link>{" "}
          , All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
