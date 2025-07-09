"use client";

import { useState } from "react";

/** Q1. Missing Number
 *
 * Implement the handleFindClick function to find the missing number.
 * Given an array of numbers from the `inputArray`, find the missing number and set it to the `number` state.
 * The missing number is the only number that is not in the array.
 * The array will not be sorted.
 * The array will always have a missing number.
 */

export default function NumbersPage() {
  const [number, setNumber] = useState<number>(0);
  const [inputArray, setInputArray] = useState<string>("");
  const [parsedArray, setParsedArray] = useState<number[]>([]);

  const handleArrayInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputArray(e.target.value);
    try {
      const parsedValue = JSON.parse(e.target.value);
      console.log("parsed", parsedValue)
      setParsedArray(parsedValue)
    } catch (error) {
      console.error("Invalid JSON input:", error);
      setNumber(0);
    }
  };

  const handleFindClick = () => {
    const size = parsedArray.length
    const ActualSize = parsedArray[size - 1]
    console.log("actual size", ActualSize)
    const expectedSum = (ActualSize * (ActualSize + 1)) / 2
    var actualSum: number = 0

    console.log("state array", parsedArray)
    for (let i = 0; i < size; i++) {
      let current = parsedArray[i]
      actualSum += current
    }

    const neededeValue = expectedSum - actualSum
    setNumber(neededeValue);
  };

  return (
    <div className="grid grid-rows-[1fr_auto] min-h-screen p-8">
      <div className="flex items-center justify-center">
        <span className="text-8xl font-bold">{number}</span>
      </div>

      <div className="w-full max-w-2xl mx-auto mb-8">
        <textarea
          className="w-full p-4 border rounded-lg"
          rows={4}
          value={inputArray}
          onChange={handleArrayInput}
          placeholder="Enter array of numbers in JSON format (e.g., [1,2,3])"
        />
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={handleFindClick} // Add onClick handler here
        >
          Find the missing number
        </button>
      </div>
    </div>
  );
}
