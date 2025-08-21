import { Toolbar } from "./components/Toolbar";
import { Canvas } from "./components/Canvas";

function App() {
  return (
    <div className="h-screen flex flex-col">
      <Toolbar />
      <div className="flex-1">
        <Canvas />
      </div>
    </div>
  );
}

export default App;
