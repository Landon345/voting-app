import { useState, useEffect } from "react";
import Layout from "src/components/layout";
import Link from "next/link";
export default function Home() {
  return (
    <Layout
      main={
        <>
          <div className="text-6xl text-center p-10 text-blue-900">
            Categories
          </div>
          <div className="flex content-start h-48 flex-wrap">
            <div className="p-8 ml-6 bg-gradient-to-br from-purple-400 to-red-400 rounded-xl text-white">
              Best Programming Language
            </div>
            <div className="p-8 ml-6 bg-gradient-to-br from-purple-400 to-red-400 rounded-xl text-white">
              Best Basketball Player
            </div>
            <Link href={`/categories/tastiest-food`}>
              <div className="p-8 ml-6 bg-gradient-to-br from-purple-400 to-red-400 rounded-xl text-white">
                Tastiest Food
              </div>
            </Link>
          </div>
        </>
      }
    />
  );
}
