# Scalable Slider Component

A highly customizable and accessible slider component built with **React** and **TypeScript**. This component offers three variants of sliders with various customization options, perfect for modern web applications.

![Slider Image](path/to/slider-image.png)

## 🚀 Features

### 🎛️ Slider Variants
- **Range Slider**: Dual thumb slider for selecting a range of values
- **Discrete Slider**: Single thumb slider with step markers
- **Continuous Slider**: Smooth single thumb slider

### 🗝️ Key Features
-  Customizable sizes (**24px** and **32px**)
-  Interactive states (**default**, **hover**, **active**)
-  Configurable **min**, **max**, and **step** values
-  Tooltip support
-  Accessibility support
-  Disabled state styling
-  Responsive design

## 📚 Storybook Documentation

This component is thoroughly documented using **Storybook**, providing:
- Interactive examples
- Variant showcases

🔗 **Deployed Storybook**: [Storybook Link](https://67a6eecf9a868840a1fd0154-zwbngkkvbd.chromatic.com/)

## ⚙️ Component Props

```typescript
interface SliderProps {
  min?: number;                // Minimum value (default: 0)
  max?: number;                // Maximum value (default: 100)
  step?: number;               // Step increment (default: 20)
  variant?: "Continuous" | "Discrete" | "Range";  // Slider type
  size?: 24 | 32;              // Component size in pixels
  tooltip?: boolean;           // Show value tooltip
  onChange?: (value: number | [number, number]) => void;  // Value change handler
  disabled?: boolean;          // Disable the slider
  status?: "default" | "hover" | "active";  // Visual state
}

````

## Installation

1. Clone the Git repo. `` git clone https://github.com/theRohan7/QR.git ``
2. Installing Dependencies `` npm i ``
3. Run the project locally ``npm run dev `` will run locally on host ``localhost:5174``
4. Run Storybook: ``npm run storybook``

## Usage

````
import Slider from './components/Slider';

function App() {
  return (
    <Slider
      variant="Range"
      min={0}
      max={100}
      step={20}
      tooltip={true}
      onChange={(value) => console.log(value)}
    />
  );
}

````


## Author


Rohan Sahu

mail: therohansahu7@gmail.com

Portfolio: https://portfolio-five-alpha-31.vercel.app/


