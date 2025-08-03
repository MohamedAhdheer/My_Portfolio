import { useEffect, useState } from 'react';

const CursorFollower = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      className="fixed w-4 h-4 bg-blue-500 rounded-full pointer-events-none z-50"
      style={{
        left: mousePosition.x - 8,
        top: mousePosition.y - 8,
      }}
    />
  );
};

export default CursorFollower;