import { Meta, StoryObj } from '@storybook/react';
import Slider from '../components/Slider.tsx';
import { fn } from '@storybook/test';
import { ComponentProps } from 'react';

type SliderProps = ComponentProps<typeof Slider>;

const meta: Meta<SliderProps> = {
    component: Slider,
    title: 'Slider',
    argTypes: {
        variant: {
            options: ["Range", "Discrete", "Continous"],
            control: {
               type: 'select',
            }
        },
        tooltip: {
            control: {
                type: 'boolean',
            }
        },
        size: {
            options: [24, 32],
            control: {
                type: 'radio',
            }
        },
        disabled: {
            control: {
                type: 'boolean',
            }
        },
        status: {
            options: ["default","hover", "active"],
            control: {
                type: 'radio',
            }
        }
    }
}

export default meta;


type Story = StoryObj<SliderProps>;


export const Continous: Story = {
    args: {
        variant: "Range",
        min: 0,
        max: 101,
        step: 10,
        status: "default",
        tooltip: true,
        size: 24
    },
}