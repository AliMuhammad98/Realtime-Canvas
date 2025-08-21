import { create } from "zustand";

export interface Rectangle {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
}

interface CanvasState {
  rectangles: Rectangle[];
  // addRectangle respects supplied id (from server), otherwise generates one
  addRectangle: (
    rect: Omit<Rectangle, "id"> & { id?: string },
    _fromServer?: boolean
  ) => void;
  updateRectanglePosition: (id: string, x: number, y: number) => void;
  setRectangles: (rectangles: Rectangle[]) => void;
}

export const useCanvasStore = create<CanvasState>((set) => ({
  rectangles: [],

  addRectangle: (rect) =>
    set((state) => ({
      rectangles: [
        ...state.rectangles,
        {
          ...rect,
          id: rect.id || Math.random().toString(36).substring(2, 9),
        },
      ],
    })),

  updateRectanglePosition: (id, x, y) =>
    set((state) => ({
      rectangles: state.rectangles.map((rect) =>
        rect.id === id ? { ...rect, x, y } : rect
      ),
    })),

  setRectangles: (rectangles) => set({ rectangles }),
}));
