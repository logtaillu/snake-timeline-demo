import { defaultCssVars, Timeline } from "./TimeLine";
import { ComponentStory, ComponentMeta } from '@storybook/react';
export default {
    title: "Example/Horizontal Timeline",
    component: Timeline,
    
} as ComponentMeta<typeof Timeline>;
const Template: ComponentStory<typeof Timeline> = (args) => <Timeline {...args} />;
const baseArgs: any = {
    ...defaultCssVars,
    direction: "horizontal",
    wrap: false,
    itemWidth: 200
}
export const ItemInBottom = Template.bind({});
ItemInBottom.args = {
    ...baseArgs,
    position: "leftbottom"
}

export const ItemInTop = Template.bind({});
ItemInTop.args = {
    ...baseArgs,
    position: "righttop"
}


export const AlternateItem = Template.bind({});
AlternateItem.args = {
    ...baseArgs,
    position: "alternate"
}

export const Wrap = Template.bind({});
Wrap.args = {
    ...baseArgs,
    position: "righttop",
    wrap: true,
}