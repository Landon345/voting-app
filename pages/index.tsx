import { useState, useEffect } from "react";
export default function Home() {
  const [foods, setFoods] = useState<any>([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const response = await fetch(
      "https://api.edamam.com/search?q=chicken&app_id=c6a39b66&app_key=7fa17291b090e19347fea15eb12f09c8"
    );
    const data = await response.json();
    console.log("data :>> ", data);
    setFoods(data.hits);
  };
  const link = "text-lg text-gray-800 flex-1 text-center";
  return (
    <>
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

      <div className="text-6xl text-center p-10 text-blue-900">Categories</div>
      <div className="flex content-start h-48 flex-wrap">
        {foods.map((hit: any) => (
          <>
            <div className="p-8 ml-6 bg-gradient-to-br from-purple-400 to-red-400 rounded-xl text-white">
              {hit.recipe.label}
            </div>
          </>
        ))}
        <div className="p-8 ml-6 bg-gradient-to-br from-purple-400 to-red-400 rounded-xl text-white">
          Best Programming Language
        </div>
        <div className="p-8 ml-6 bg-gradient-to-br from-purple-400 to-red-400 rounded-xl text-white">
          Best Basketball Player
        </div>
        <div className="p-8 ml-6 bg-gradient-to-br from-purple-400 to-red-400 rounded-xl text-white">
          Tastiest Food
        </div>
      </div>
    </>
  );
}
