import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "src/components/layout";

function TastiestFood() {
  const {
    query: { category },
  } = useRouter();
  return (
    <Layout
      main={
        <>
          <div className="flex content-start h-48 flex-wrap">
            <Link href={`/categories/chicken`}>
              <div className="p-8 ml-6 bg-gradient-to-br from-purple-400 to-red-400 rounded-xl text-white">
                Chicken
              </div>
            </Link>
            <Link href={`/categories/pizza`}>
              <div className="p-8 ml-6 bg-gradient-to-br from-purple-400 to-red-400 rounded-xl text-white">
                Pizza
              </div>
            </Link>
            <Link href={`/categories/icecream`}>
              <div className="p-8 ml-6 bg-gradient-to-br from-purple-400 to-red-400 rounded-xl text-white">
                Ice Cream
              </div>
            </Link>
            <Link href={`/categories/beef`}>
              <div className="p-8 ml-6 bg-gradient-to-br from-purple-400 to-red-400 rounded-xl text-white">
                Beef
              </div>
            </Link>
            <Link href={`/categories/soup`}>
              <div className="p-8 ml-6 bg-gradient-to-br from-purple-400 to-red-400 rounded-xl text-white">
                Soup
              </div>
            </Link>
          </div>
        </>
      }
    />
  );
}

export default TastiestFood;
