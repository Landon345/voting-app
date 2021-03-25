import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "src/components/layout";

function BestBasketball() {
  const {
    query: { category },
  } = useRouter();
  return (
    <Layout
      main={
        <>
          <div className="flex content-start h-48 flex-wrap">
            <Link href={`/basketball-categories/current`}>
              <div className="p-8 ml-6 bg-gradient-to-br from-purple-400 to-red-400 rounded-xl text-white">
                Current Players
              </div>
            </Link>
            {/* <Link href={`/basketball-categories/basketball-2020`}>
              <div className="p-8 ml-6 bg-gradient-to-br from-purple-400 to-red-400 rounded-xl text-white">
                Players 2000 - 2020
              </div>
            </Link> */}
          </div>
        </>
      }
    />
  );
}

export default BestBasketball;
