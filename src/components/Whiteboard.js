import React, { useRef, useEffect } from 'react';

function Whiteboard({ elements = [] }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    elements.forEach(element => {
      if (element.type === 'line') {
        const { startX, startY, endX, endY, color, width } = element.properties.line;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.stroke();
      } else if (element.type === 'shape') {
        const { type, x, y, width, height, color } = element.properties.shape;
        ctx.fillStyle = color;
        if (type === 'rectangle') {
          ctx.fillRect(x, y, width, height);
        } else if (type === 'circle') {
          ctx.beginPath();
          ctx.arc(x + width / 2, y + height / 2, width / 2, 0, 2 * Math.PI);
          ctx.fill();
        }
      } else if (element.type === 'text') {
        const { content, x, y, fontSize, color } = element.properties.text;
        ctx.font = `${fontSize}px Arial`;
        ctx.fillStyle = color;
        ctx.fillText(content, x, y);
      }
    });
  }, [elements]);

  return <canvas ref={canvasRef} width={800} height={600} style={{ border: '1px solid black' }} />;
}

export default Whiteboard;
