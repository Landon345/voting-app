import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "src/components/layout";
import { valueToObjectRepresentation } from "@apollo/client/utilities";

function Food() {
  const {
    query: { foods },
  } = useRouter();

  const [differentRecipes, setdifferentRecipes] = useState<any>(null);
  const [food1, setFood1] = useState<any>(null);
  const [food2, setFood2] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, [foods]);
  const fetchData = async () => {
    console.log("food :>> ", foods);
    const response = await fetch(
      `https://api.edamam.com/search?q=${foods}&app_id=c6a39b66&app_key=7fa17291b090e19347fea15eb12f09c8&to=50`
    );
    const data = await response.json();
    console.log("data :>> ", data);
    setdifferentRecipes(data.hits);
    PickRandom(data.hits);
  };

  const PickRandom = (hits: any) => {
    let ran1 = Math.floor(Math.random() * hits.length);
    let ran2 = Math.floor(Math.random() * hits.length);
    let tried = 0;
    while (ran1 == ran2 && tried <= 10) {
      ran2 = Math.floor(Math.random() * hits.length);
      tried++;
    }
    setFood1(hits[ran1].recipe);
    setFood2(hits[ran2].recipe);
  };

  const vote = (uri: string) => {
    const id = uri.split("#")[1];
    console.log("id :>> ", id);
    PickRandom(differentRecipes);
    // make api request to give a better elo score to winner.
  };
  return (
    <Layout
      main={
        <>
          <div className="text-4xl text-gray-800 text-center p-10">
            Choose One
          </div>
          <div className="flex content-start h-48 flex-wrap pt-3">
            {food1 && food2 && (
              <>
                <div
                  className="p-8 ml-6 bg-purple-400 rounded-xl text-white cursor-pointer hover:bg-red-400"
                  onClick={() => vote(food1.uri)}
                >
                  {food1.label}
                  <img
                    src={food1.image}
                    alt="food"
                    className="object-contain rounded-md"
                  />
                </div>

                <div
                  className="p-8 ml-6 bg-purple-400 rounded-xl text-white cursor-pointer hover:bg-red-400"
                  onClick={() => vote(food2.uri)}
                >
                  {food2.label}
                  <img
                    src={food2.image}
                    alt="food"
                    className="object-contain rounded-md"
                  />
                </div>
              </>
            )}
          </div>
        </>
      }
    />
  );
}

export default Food;
