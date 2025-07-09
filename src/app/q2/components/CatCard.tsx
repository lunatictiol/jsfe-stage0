// components/CatFactDisplay.tsx
import React from "react";

type Fact = {
    fact: string;
    length: number;
};

type Props = {
    catFact: Fact;
};

const CatCard: React.FC<Props> = ({ catFact }) => {
    if (!catFact) return null;

    return (
        <div className="fact-container mt-4 p-4 border rounded bg-gray-50">
            <p className="fact text-lg mb-2">{catFact.fact}</p>
            <p className="fact-length text-sm text-gray-600">
                Character count: {catFact.length}
            </p>
        </div>
    );
};


export default CatCard;
