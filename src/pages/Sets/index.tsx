import { useEffect, useState } from "react";
import Set from "./Set";

const SetsPage = () => {
  const [sets, setSets] = useState<{ [key: string]: any }[]>([]);
  useEffect(() => {
    fetch("https://api.pokemontcg.io/v2/sets?q=series:Scarlet%20&%20Violet")
      .then((response) => response.json())
      .then((json) => {
        setSets(json.data);
        const cards = localStorage.getItem("cards") || "{}";
        if (cards === "{}") {
          const sets = json.data.reduce((acc: {}, curr: {[key: string]: any}) => (
            {...acc, [curr.ptcgoCode] : []}
          ),{});
          localStorage.setItem("cards", JSON.stringify(sets));
        }
      });
  }, []);
  return (
    <div className="page sets">
      {sets.map((set) => (
        <Set key={set.id} data={set} />
      ))}
    </div>
  );
};

export default SetsPage;
