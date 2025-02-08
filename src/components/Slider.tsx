import { CSSProperties, useEffect, useState } from "react";
import "../App.css";

type SliderVariant = "Continous" | "Discrete" | "Range";
type Size = 24 | 32;
type status= "default" | "hover" | "active";

interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  defaultStart?: number;
  defaultEnd?: number;
  variant?: SliderVariant;
  size?: Size;
  style?: CSSProperties;
  tooltip?: boolean;
  onChange?: (value: number | [number, number]) => void;
  disabled?: boolean;
  status?: status
}

const Slider: React.FC<SliderProps> = ({
  min: propMin = 0,
  max: propMax = 100,
  step = 20,
  defaultStart: propDefaultStart = 0,
  defaultEnd: propDefaultEnd = 100,
  onChange,
  variant = "Range",
  tooltip = false,
  size = 24,
  disabled = false,
  status = "default"
}) => {
  
  const min = Math.min(propMin, propMax);
  const max = Math.max(propMin, propMax);

  const validDefaultStart = Math.max(min, Math.min(propDefaultStart, max));

  const validDefaultEnd = variant === "Range" 
  ? Math.max(validDefaultStart, Math.min(propDefaultEnd, max))
  : propDefaultEnd;



  const [minValue, setMinValue] = useState<number>(validDefaultStart);
  const [maxValue, setMaxValue] = useState<number>(validDefaultEnd);
  const [currentStatus, setCurrentStatus] = useState<status>(status);

  useEffect(() => {
    const newStart = Math.max(min, Math.min(propDefaultStart, max));
    const newEnd = variant === "Range" 
      ? Math.max(newStart, Math.min(propDefaultEnd, max))
      : propDefaultEnd;

    setMinValue(newStart);
    setMaxValue(newEnd);
  }, [propDefaultStart, propDefaultEnd, min, max, variant]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: number = Math.min(Number(e.target.value), maxValue - 1);
    setMinValue(value);
    if (onChange) {
      onChange(variant === "Range" ? [value, maxValue] : value);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: number = Math.max(Number(e.target.value), minValue + 1);
    setMaxValue(value);
    if (onChange) {
      onChange([minValue, value]);
    }
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

  const getSliderHeight = () => {
    return size === 24 ? "h-6" : "h-8";
  };

  const getThumbSize = () => {
    return size === 24 ? "w-4 h-4" : "w-6 h-6";
  };

  const getStatusStyles = () => {
    switch (currentStatus) {
      case "hover":
        return "slider-hover";
      case "active":
        return "slider-active";
      default:
        return "";
    }
  };

  const highlightSteps = () => {
    return steps.map((step) => (
        <div
        key={step}
        style={{
          position: 'absolute',
          left: `${((step - min) / (max - min)) * 100}%`,
          width: size === 24 ? '0.6rem' : '0.8rem',
          height: size === 24 ? '0.6rem' : '0.8rem',
          backgroundColor: '#47B647',
          borderRadius: '50%',
          transform: 'translateX(-50%)',
          top: '20%',
          marginTop: size === 24 ? '-2px' : '-3px',
          zIndex: 1
        }}
      />
    ))
  }

  return (
    <div 
     className={`slider-container ${getSliderHeight()}`}
     onMouseEnter={() => setCurrentStatus("hover")}
      onMouseLeave={() => setCurrentStatus("default")}
      onMouseDown={() => setCurrentStatus("active")}
      onMouseUp={() => setCurrentStatus("hover")}
     
    >
        {variant === "Range" && (
        <div className={`range-slider-container ${getStatusStyles()}`} aria-disabled={disabled}>
          <div className="slider-track" style={{ opacity: disabled ? 0.5 : 1 }}>
            <div className="slider-range" style={calculateRangeStyle()}></div>
            <div className="min-slider-wrapper">
              {tooltip && (
                <span className="min-tooltip" style={{
                  position: "absolute",
                  left: calculateRangeStyle().left,
                  top: "-35px",
                }}>
                  {minValue}
                </span>
              )}
              <input
                type="range"
                className={`slider-input range-slider ${getThumbSize()}`}
                min={min}
                max={max}
                value={minValue}
                onChange={handleMinChange}
                disabled={disabled}
              />
            </div>

            <div className="max-slider-wrapper">
              {tooltip && (
                <span className="max-tooltip" style={{
                  position: "absolute",
                  left: `${((maxValue - min) / (max - min)) * 100}%`,
                  top: "-35px",
                }}>
                  {maxValue}
                </span>
              )}
              <input
                type="range"
                className={`slider-input range-slider ${getThumbSize()}`}
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
        <div className={`discrete-slider-container ${getStatusStyles()}`} aria-disabled={disabled}>
          <div className="slider-track" style={{ opacity: disabled ? 0.5 : 1 }}>
            <div className="slider-range" style={calculateStyle()}></div>
            {highlightSteps()}
            {tooltip && (
              <span className="min-tooltip" style={{
                position: "absolute",
                left: `${((minValue - min) / (max - min)) * 100}%`,
                top: "-35px",
              }}>
                {minValue}
              </span>
            )}
            <input
              type="range"
              className={`slider-input ${getThumbSize()}`}
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
      {variant === "Continous" && (
        <div className={`continous-slider-container ${getStatusStyles()}`} aria-disabled={disabled}>
          <div className="slider-track" style={{ opacity: disabled ? 0.5 : 1 }}>
            <div className="slider-range" style={calculateStyle()}></div>
            {tooltip && (
              <span className="min-tooltip" style={{
                position: "absolute",
                left: `${((minValue - min) / (max - min)) * 100}%`,
                top: "-35px",
              }}>
                {minValue}
              </span>
            )}
            <input
              type="range"
              className={`slider-input ${getThumbSize()}`}
              min={min}
              max={max}
              value={minValue}
              onChange={handleMinChange}
              disabled={disabled}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Slider;
