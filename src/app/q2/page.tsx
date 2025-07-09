"use client";

import { useEffect, useState } from "react";
import CatCard from "./components/CatCard";
import { LoadingAndErrorComponent } from "./components/LoadingAndErrorComponent";

type Fact = {
  fact: string;
  length: number;
};

// export default function Q2Page() {
//   const [catFact, setCatFact] = useState<Fact | null>(null);
//   const [error, setError] = useState<string | null>(null); // Add error state

//   useEffect(() => {
//     const fetchCatFact = async () => {
//       setError(null); // Reset error state on new fetch attempt
//       try {
//         const response = await fetch("https://catfact.ninja/fact");
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setCatFact(data);
//       } catch (error) {
//         console.error("Failed to fetch cat fact:", error);
//         setError(
//           error instanceof Error ? error.message : "An unknown error occurred"
//         ); // Set error state
//       }
//     };

//     fetchCatFact();
//   }, []); // Empty dependency array means this effect runs once on mount

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-4">Q2 - Random Cat Fact</h1>

//       {error ? (
//         <p className="text-red-500">Error fetching cat fact: {error}</p> // Display error message
//       ) : catFact ? (
//         <div className="fact-container mt-4 p-4 border rounded bg-gray-50">
//           <p className="fact text-lg mb-2">{catFact.fact}</p>
//           <p className="fact-length text-sm text-gray-600">
//             Character count: {catFact.length}
//           </p>
//         </div>
//       ) : (
//         <p>Loading cat fact...</p> // Show loading state
//       )}
//     </div>
//   );
// }
const MainContainer = LoadingAndErrorComponent(CatCard);

export default function Q2Page() {
  const [catFact, setCatFact] = useState<Fact>({ fact: "", length: 0 });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchCatFact();
  }, []);

  const fetchCatFact = async () => {
    try {
      setError(null);
      setLoading(true);

      const response = await fetch("https://catfact.ninja/fact");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Fact = await response.json();
      setCatFact(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Q2 - Random Cat Fact</h1>
      <MainContainer
        loading={loading}
        error={error}
        catFact={catFact}
      />

    </div>
  );
}