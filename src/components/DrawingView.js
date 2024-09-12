import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Whiteboard from './Whiteboard';

function DrawingView() {
  const { id } = useParams();
  const [drawing, setDrawing] = useState(null);

  useEffect(() => {
    // Fetch a specific drawing by ID
    fetch(`http://localhost:5000/api/v1/drawing/${id}`)
      .then(response => response.json())
      .then(data => setDrawing(data))
      .catch(error => console.error('Error fetching drawing:', error));
  }, [id]);

  return (
    <div>
      {drawing ? (
        <div>
          <h1>{drawing.title}</h1>
          <Whiteboard elements={drawing.elements} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default DrawingView;
