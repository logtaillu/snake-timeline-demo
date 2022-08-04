import { ITimelineItemData } from '../ISnakeTimeline';
function SnakeTimelineItem(props: ITimelineItemData) {
    const { prefix, className = "", style, content, dot, dotStyle, lineStyle, contentStyle, position = "righttop" } = props;
    const prefixCls = (str: string) => `${prefix}-${str}`;
    return (
        <li className={`${prefixCls("item")} ${prefixCls("item-" + position || "righttop")}  ${className}`} style={style}>
            <div className={prefixCls("line")} style={lineStyle} />
            <div className={prefixCls("dot")} style={dotStyle}>
                {dot}
            </div>
            <div className={prefixCls("content")} style={contentStyle}>{content}</div>
        </li>
    )
}

export default SnakeTimelineItem;