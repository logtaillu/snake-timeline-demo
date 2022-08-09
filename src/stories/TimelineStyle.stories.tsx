import { defaultCssVars, Timeline } from "./TimeLine";
import { ComponentStory, ComponentMeta } from '@storybook/react';
export default {
    title: "Example/TimelineStyle",
    component: Timeline
} as ComponentMeta<typeof Timeline>;
const Template: ComponentStory<typeof Timeline> = (args) => <Timeline {...args} />;
export const ItemInLeft = Template.bind({});
ItemInLeft.args = {
    position: "leftbottom",
    direction: "vertical",
    ...defaultCssVars
}