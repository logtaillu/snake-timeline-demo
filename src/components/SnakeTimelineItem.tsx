import { ITimelineItemData } from '../ISnakeTimeline';
const ContentInfo = (props: ITimelineItemData) => {
    const { template, content } = props;
    if (template) {
        if (typeof (template) === "string") {
            const func = new Function("content", "return `" + template + "`");
            return <div dangerouslySetInnerHTML={{ __html: func(content) }} />;
        } else {
            const Ele = template;
            return <Ele {...props} />;
        }
    } else {
        return <div>{content}</div>;
    }
}
function SnakeTimelineItem(props: ITimelineItemData) {
    const { prefix, className = "", style, dot, dotStyle, lineStyle, contentStyle, position = "righttop" } = props;
    const prefixCls = (str: string) => `${prefix}-${str}`;
    return (
        <li className={`${prefixCls("item")} ${prefixCls("item-" + position || "righttop")}  ${className}`} style={style}>
            <div className={prefixCls("line")} style={lineStyle} />
            <div className={prefixCls("dot")} style={dotStyle}>
                {dot}
            </div>
            <div className={prefixCls("content")} style={contentStyle}><ContentInfo {...props} /></div>
        </li>
    )
}

export default SnakeTimelineItem;