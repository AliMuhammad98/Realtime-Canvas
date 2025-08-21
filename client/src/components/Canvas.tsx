import { Stage, Layer, Rect } from "react-konva";
import { useCanvasStore } from "../store/useCanvasStore";
import { useSocket } from "../hooks/useSocket";

export const Canvas = () => {
  const { rectangles, updateRectanglePosition } = useCanvasStore();
  const { emitMoveRectangle } = useSocket();

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight - 50}
      className="block"
    >
      <Layer>
        {rectangles.map((rect) => (
          <Rect
            key={rect.id}
            x={Math.min(rect.x, window.innerWidth - rect.width - 10)}
            y={Math.min(rect.y, window.innerHeight - rect.height - 60)}
            width={rect.width}
            height={rect.height}
            fill={rect.fill}
            stroke="#000"
            strokeWidth={1}
            cornerRadius={4}
            shadowColor="#888"
            shadowBlur={5}
            shadowOpacity={0.6}
            shadowOffset={{ x: 2, y: 2 }}
            draggable
            onDragMove={(e) => {
              const newX = e.target.x();
              const newY = e.target.y();

              // Sender updates locally immediately
              updateRectanglePosition(rect.id, newX, newY);

              // Inform server -> other clients will receive "rectangle:moved"
              emitMoveRectangle({ id: rect.id, x: newX, y: newY });
            }}
          />
        ))}
      </Layer>
    </Stage>
  );
};
