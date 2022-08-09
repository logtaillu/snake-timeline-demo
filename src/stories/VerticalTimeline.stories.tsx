import { defaultCssVars, Timeline } from "./TimeLine";
import { ComponentStory, ComponentMeta } from '@storybook/react';
export default {
    title: "Example/Veritcal Timeline",
    component: Timeline,
    
} as ComponentMeta<typeof Timeline>;
const Template: ComponentStory<typeof Timeline> = (args) => <Timeline {...args} />;
const baseArgs: any = {
    ...defaultCssVars,
    direction: "vertical",
    wrap: false
}
export const ItemInLeft = Template.bind({});
ItemInLeft.args = {
    ...baseArgs,
    position: "leftbottom",
}

export const ItemInRight = Template.bind({});
ItemInRight.args = {
    ...baseArgs,
    position: "righttop",
}


export const AlternateItem = Template.bind({});
AlternateItem.args = {
    ...baseArgs,
    position: "alternate",
}

export const Wrap = Template.bind({});
Wrap.args = {
    ...baseArgs,
    position: "righttop",
    wrap: true
}