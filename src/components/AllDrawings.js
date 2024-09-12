import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllDrawingQuery } from "../features/Drawing/Drawing";

const AllDrawings = () => {
//   const [drawings, setDrawings] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/v1/drawing")
//       .then((res) => res.json())
//       .then((data) => setDrawings(data.data));
//   }, []);


  const { data, isLoading, isError, error } =
  useGetAllDrawingQuery();
  const [drawings, setDrawings] = useState([]);

console.log("drawings", drawings);
useEffect(() => {
  if (isError) {
    console.error("Error fetching projects data", error);
  } else if (!isLoading) {
    if (data) {
        setDrawings(data.data);
    }
  }
}, [data, isLoading, isError, error]);


console.log('drawings', drawings);

  return (
    <div>
      <h1>All Drawings</h1>
      <ul>
        {drawings.map((drawing) => (
          <li key={drawing._id}>
            <Link to={`/drawing/${drawing._id}`}>{drawing.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllDrawings;
