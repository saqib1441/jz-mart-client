"use client";

import { FC, useState } from "react";
import { Button } from "./ui/button";

const NavTabs: FC = () => {
  const [active, setActive] = useState<string>("Supplier");

  const handleClick = (tab: string) => {
    setActive(tab);
  };
  return (
    <div className="items-center gap-2 p-1 border border-primary rounded w-fit mx-auto hidden md:flex">
      <Button
        variant={active === "Product" ? "default" : "ghost"}
        onClick={() => handleClick("Product")}
      >
        Product
      </Button>
      <Button
        variant={active === "Supplier" ? "default" : "ghost"}
        onClick={() => handleClick("Supplier")}
      >
        Supplier
      </Button>
      <Button
        variant={active === "Buyer" ? "default" : "ghost"}
        onClick={() => handleClick("Buyer")}
      >
        Buyer
      </Button>
    </div>
  );
};

export default NavTabs;
