import { CSSProperties, useState } from "react";
import "../App.css";

type SliderVariant = "Continous" | "Discrete" | "Range";
type Size = 24 | 32;

interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  defaultStart?: number;
  defaultEnd?: number;
  variant?: SliderVariant;
  size?: Size;
  style?: CSSProperties;
  className?: string;
  tooltip?: boolean;
  onChange?: (value: number | [number, number]) => void;
  disabled?: boolean;
}

const Slider: React.FC<SliderProps> = ({
  min = 0,
  max = 100,
  step = 20,
  defaultStart = 0,
  defaultEnd = 75,
  onChange,
  variant = "Range",
  tooltip = false,
  size = 24,
  className = "",
  disabled = false,
}) => {
  const [minValue, setMinValue] = useState<number>(min);
  const [maxValue, setMaxValue] = useState<number>(max);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: number = Math.min(Number(e.target.value), maxValue - 1);
    setMinValue(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: number = Math.max(Number(e.target.value), minValue + 1);
    setMaxValue(value);
  };

  const calculateRangeStyle = () => {
    const left = ((minValue - min) / (max - min)) * 100;
    const right = 100 - ((maxValue - min) / (max - min)) * 100;
    return {
      left: `${left}%`,
      right: `${right}%`,
    };
  };

  const calculateStyle = () => {
    return {
      left: '0%',
      right: `${100 - ((minValue - min) / (max - min)) * 100}%`
    };
  };

  const steps = Array.from(
    { length: (max - min) / step + 1 },
    (_, index) => min + index * step
  );


  const highlightSteps = () => {
    return steps.map((step) => (
        <div
        key={step}
        style={{
          position: 'absolute',
          left: `${((step - min) / (max - min)) * 100}%`,
          width: '0.6rem',
          height: '0.6rem',
          backgroundColor: '#47B647',
          borderRadius: '50%',
          transform: 'translateX(-50%)',
          top: '20%',
          marginTop: '-2px',
          zIndex: 1
        }}
      />
    ))
  }

  return (
    <div className="slider-container">
      {variant === "Range" && (
        <div className="range-slider-container" aria-disabled={disabled}>
          <div className="slider-track" style={{ opacity: disabled ? 0.5 : 1 }}>
            <div className="slider-range" style={calculateRangeStyle()}></div>
            <div className="min-slider-wrapper">
              {tooltip && (
                <span
                  className="min-tooltip"
                  style={{
                    position: "absolute",
                    left: calculateRangeStyle().left,
                    top: "-35px",
                  }}
                >
                  {minValue}
                </span>
              )}
              <input
                type="range"
                className="slider-input range-slider"
                min={min}
                max={max}
                value={minValue}
                onChange={handleMinChange}
                disabled={disabled}
              />
            </div>

            <div className="max-slider-wrapper">
              {tooltip && (
                <span
                  className="max-tooltip"
                  style={{
                    position: "absolute",
                    left: `${((maxValue - min) / (max - min + 4)) * 100}%`,
                    top: "-35px",
                  }}
                >
                  {maxValue}
                </span>
              )}
              <input
                type="range"
                className="slider-input range-slider"
                min={min}
                max={max}
                value={maxValue}
                onChange={handleMaxChange}
                disabled={disabled}
              />
            </div>
          </div>
        </div>
      )}
      {variant === "Discrete" && (
        <div className="discrete-slider-container" aria-disabled={disabled}>
          <div className="slider-track" style={{ opacity: disabled ? 0.5 : 1}}>

          <div className="slider-range" style={calculateStyle()}></div>
            {highlightSteps()}
            {tooltip && (
              <span
                className="min-tooltip"
                style={{
                  position: "absolute",
                  left: `${((minValue - min) / (max - min)) * 100}%`,
                  top: "-35px",
                }}
              >
                {minValue}
              </span>
            )}
            <input
              type="range"
              className="slider-input"
              min={min}
              max={max}
              step={step}
              value={minValue}
              onChange={handleMinChange}
              disabled={disabled}
            />
          </div>
        </div>
      )}
      {
        variant === "Continous" && (
            <div className="continous-slider-container" aria-disabled={disabled}>
            <div className="slider-track" style={{ opacity: disabled ? 0.5 : 1}}>
            <div className="slider-range" style={calculateStyle()}></div>

              {tooltip && (
                <span
                  className="min-tooltip"
                  style={{
                    position: "absolute",
                    left: `${((minValue - min) / (max - min)) * 100}%`,
                    top: "-35px",
                  }}
                >
                  {minValue}
                </span>
              )}
              <input
                type="range"
                className="slider-input"
                min={min}
                max={max}
                value={minValue}
                onChange={handleMinChange}
                disabled={disabled}
              />
            </div>
          </div>  
        )
      }
    </div>
  );
};

export default Slider;
