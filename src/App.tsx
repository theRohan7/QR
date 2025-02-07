import Slider from "./components/Slider";

function App() {
  return (
    <div className="app">
      <Slider
        variant="Continous"
        min={0}
        max={100}
      />
    </div>
  );
}

export default App;
