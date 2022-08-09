import SnakeTimeline from "../components/SnakeTimeline";
import { ISnakeTimelineCssVar, ISnakeTimelinePosition, ISnakeTimelineProps } from "../ISnakeTimeline";

const mockData = new Array(20).fill(0).map((s, idx) => `mock data aaaa bbbbb ccccc ${idx + 1}`);

type ISnakeTimelineDemoProps = Pick<ISnakeTimelineProps, "direction"|"position"|"wrap"|"reverse"|"itemWidth"> & ISnakeTimelineCssVar;

export function Timeline(props: Partial<ISnakeTimelineDemoProps>) {
    const { direction, position, wrap, reverse, itemWidth ,...cssvars } = props;
    return (
        <div style={{ padding: 10, height: 600 }}>
            <SnakeTimeline data={mockData} {...{direction, position, wrap, reverse, itemWidth}} css={cssvars} />
        </div>
    )
}

export const defaultCssVars = {
    lineColor: "#e8e8e8",
    lineWidth: 2,
    dotSize: 10,
    padVertical: 10,
    padHorizontal: 10,
    dotColor: "cornflowerblue",
    dotBorder: 2,
    contentColor: "#fff",
    contentBackground: "coral"
};