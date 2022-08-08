import React from 'react';
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
    const { prefix, className = "", style, dot, dotStyle, lineStyle, contentStyle, position = "righttop", template, content } = props;
    const prefixCls = (str: string) => `${prefix}-${str}`;
    const dotInfo = { className: `${prefixCls("dot")} ${dot?prefixCls("dotinner"):""}`, style: dotStyle };
    return (
        <li className={`${prefixCls("item")} ${prefixCls("item-" + position || "righttop")}  ${className}`} style={style}>
            <div className={prefixCls("line")} style={lineStyle} />
            {dot ? React.cloneElement(dot, dotInfo) : <div {...dotInfo} />}
            <div className={prefixCls("content")} style={contentStyle}>{template ? <ContentInfo {...props} /> : content}</div>
        </li>
    )
}

export default SnakeTimelineItem;