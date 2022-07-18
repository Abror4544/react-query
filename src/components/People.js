import React, { useState } from "react";
import { useQuery } from "react-query";
import Person from "./Person";

const fetchPlanets = async ({ queryKey }) => {
  const res = await fetch(`http://swapi.dev/api/people/?page=${queryKey[1]}`);
  return res.json();
};

const People = () => {
  const [page, setPage] = useState(1);
  const { data, status } = useQuery(["planets", page], fetchPlanets);

  return (
    <div>
      <h2>People</h2>
      <button onClick={() => setPage(1)}>1</button>
      <button onClick={() => setPage(2)}>2</button>
      <button onClick={() => setPage(3)}>3</button>
      {status === "error" && <div>Error fetching data</div>}
      {status === "loading" && <div>Loading data...</div>}
      {status === "success" && (
        <div>
          {data.results.map((person, id) => (
            <Person key={id} person={person} />
          ))}
        </div>
      )}
    </div>
  );
};

export default People;
