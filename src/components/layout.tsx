import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import Link from "next/link";

interface IProps {
  main: ReactNode;
}

const Layout: FunctionComponent<IProps> = ({ main }) => {
  const link = "text-lg text-gray-800 flex-1 text-center";
  return (
    <div>
      <nav className="flex py-6 bg-gradient-to-r from-green-400 to-blue-500">
        <a href="/" className={link}>
          Home
        </a>
        <a href="/voting" className={link}>
          Voting
        </a>
        <a href="/statistics" className={link}>
          Statistics
        </a>
      </nav>

      <main style={{ minHeight: "calc(100vh - 64px)" }}>{main}</main>
    </div>
  );
};

export default Layout;
