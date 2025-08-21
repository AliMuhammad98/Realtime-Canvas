import { useSocket } from "../hooks/useSocket";

export const Toolbar = () => {
  const { emitAddRectangle } = useSocket();

  const handleAddRectangle = () => {
    const minHeight = 50;
    const maxHeight = 130;
    const height = minHeight + Math.random() * (maxHeight - minHeight);
    const width = height * (1.5 + Math.random() * 1.5);

    const newRect = {
      x: Math.random() * (window.innerWidth - width - 20),
      y: Math.random() * (window.innerHeight - height - 70),
      width,
      height,
      fill: `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")}`,
    };

    // IMPORTANT: do NOT add locally.
    // Let the server assign an id and broadcast back "rectangle:added".
    emitAddRectangle(newRect);
  };

  return (
    <div className="p-4 bg-gray-200 flex gap-4 w-full">
      <button
        onClick={handleAddRectangle}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Add Rectangle
      </button>
    </div>
  );
};
