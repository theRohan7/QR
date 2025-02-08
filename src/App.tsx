import Slider from "./components/Slider";

function App() {
  return (
    <div className="app">
      <Slider
        variant="Range"
        min={0}
        max={100}
        tooltip={true}
        step={
          10
        }
      />
    </div>
  );
}

export default App;
