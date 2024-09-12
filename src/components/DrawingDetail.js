/* eslint-disable no-undef */
import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useGetSingleDrawingQuery } from "../features/Drawing/Drawing";

const DrawingDetail = () => {
  const { id } = useParams();
  const canvasRef = useRef(null);

  // Fetch drawing data
  const { data, isLoading, isError, error } = useGetSingleDrawingQuery(id);

  useEffect(() => {
    if (data && !isLoading && !isError) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // Clear canvas before drawing
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Ensure data.elements is defined and is an array
      if (Array.isArray(data.data.elements)) {
        data.data.elements.forEach(element => {
          if (element.type === 'line') {
            const { startPoint, endPoint, color, thickness } = element.data;
            ctx.beginPath();
            ctx.moveTo(startPoint.x, startPoint.y);
            ctx.lineTo(endPoint.x, endPoint.y);
            ctx.strokeStyle = color;
            ctx.lineWidth = thickness;
            ctx.stroke();
          } else if (element.type === 'rectangle') {
            const { topLeft, bottomRight, color, borderWidth } = element.data;
            const width = bottomRight.x - topLeft.x;
            const height = bottomRight.y - topLeft.y;
            ctx.fillStyle = color;
            ctx.lineWidth = borderWidth;
            ctx.strokeRect(topLeft.x, topLeft.y, width, height);
            ctx.fillRect(topLeft.x, topLeft.y, width, height);
          } else if (element.type === 'circle') {
            const { center, radius, color, borderWidth } = element.data;
            ctx.beginPath();
            ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
            ctx.strokeStyle = color;
            ctx.lineWidth = borderWidth;
            ctx.stroke();
            ctx.fillStyle = color;
            ctx.fill();
          } else if (element.type === 'text') {
            const { position, content, fontSize, fontColor } = element.data;
            ctx.font = `${fontSize}px Arial`;
            ctx.fillStyle = fontColor;
            ctx.fillText(content, position.x, position.y);
          }
        });
      }
    }
  }, [data, isLoading, isError]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    console.error("Error fetching drawing data", error);
    return <p>Error loading drawing data.</p>;
  }

  return (
    <div>
      <h1>{data?.title || 'No Title'}</h1>
      <canvas ref={canvasRef} width={800} height={600} style={{ border: '1px solid black' }}></canvas>
    </div>
  );
};

export default DrawingDetail;
