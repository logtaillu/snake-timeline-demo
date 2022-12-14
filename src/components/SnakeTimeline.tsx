import React, { useEffect, useRef } from 'react';
import { useSafeState, useSize } from "ahooks";
import "../styles/index.less";
import { ISnakeTimelineCssVar, ISnakeTimelineProps, ISnakeTimelineStyleProps } from '../ISnakeTimeline';
import SnakeTimelineItem from './SnakeTimelineItem';
import SnakeStyledList from './SnakeStyledList';
import { adjustPosition } from "./util";

const DEFAULT_PREFIX_CLS = "react-snake-timeline";
const defaultCssVar: ISnakeTimelineCssVar = {
    lineColor: "#e8e8e8",
    lineWidth: 2,
    dotSize: 10,
    padVertical: 10,
    padHorizontal: 10,
    dotColor: "cornflowerblue",
    dotBorder: 2,
    contentColor: "#fff",
    contentBackground: "coral"
}

// merge item style props
const mergeProps = (itemProps: ISnakeTimelineStyleProps, wrapProps: ISnakeTimelineStyleProps) => {
    const keys: Array<"dotStyle" | "lineStyle" | "contentStyle"> = ["dotStyle", "lineStyle", "contentStyle"];
    let merged: ISnakeTimelineStyleProps = { ...itemProps };
    keys.map(prop => {
        merged[prop] = { ...wrapProps[prop], ...itemProps[prop] };
    });
    return mergeProps;
}
function SnakeTimeline(props: React.PropsWithChildren<ISnakeTimelineProps>) {
    const { className = "", style, prefix = DEFAULT_PREFIX_CLS, data, children, wrap = false, direction = "vertical", reverse, itemWidth, css, position = "righttop", dot, template } = props;
    const [itemS, setItemS] = useSafeState(0);
    const [adjusting, setAajusting] = useSafeState(true);

    const ref = useRef<HTMLUListElement>(null);
    const size = useSize(ref);
    const w = (size && size.width) || 0;
    const h = (size && size.height) || 0;
    const cssvars = { ...defaultCssVar, ...css };
    useEffect(() => {
        // resort items and add circle
        if (w && h && ref.current && (data?.length || React.Children.toArray(children).length)) {
            const colunmS = adjustPosition(ref.current, itemWidth, cssvars, direction, wrap, position);
            setItemS(colunmS);
            setAajusting(false);
        }
    }, [w, h, itemWidth, wrap, position, direction, cssvars.lineWidth, reverse, children, data]);
    const prefixCls = (str: string) => `${prefix}-${str}`;

    // getChildren
    let childeles: any[] = [];
    if (data) {
        let ary = [...data];
        if (reverse) {
            ary.reverse();
        }
        childeles = ary.map((info, idx) => {
            const subprops = { prefix, position: position === "alternate" ? idx % 2 === 0 ? "righttop" : "leftbottom" : position, dot, template };
            if (!info) {
                return null;
            } else if (typeof (info) === "object" && info && 'content' in info) {
                return <SnakeTimelineItem key={idx} {...subprops} {...info} {...mergeProps(info, props)} />;
            } else {
                return <SnakeTimelineItem key={idx} {...subprops} content={info} {...mergeProps({}, props)} />;
            }
        }).filter(s => !!s);
    } else {
        const items: React.ReactElement[] = React.Children.toArray(children).filter(s => !!s) as React.ReactElement[];
        let ary = [...items];
        if (reverse) {
            ary.reverse();
        }
        childeles = React.Children.map(ary, (ele: React.ReactElement, idx: number) => {
            return React.cloneElement(ele, {
                position: position === "alternate" ? idx % 2 === 0 ? "righttop" : "leftbottom" : position,
                prefix: ele.props.prefix || prefix || DEFAULT_PREFIX_CLS,
                dot,
                template,
                ...mergeProps(ele.props, props)
            });
        });
    }
    return (
        <SnakeStyledList ref={ref} className={`${prefixCls("list")} ${wrap ? prefixCls("wrap") : ""} ${prefixCls(direction)} ${prefixCls(position)} ${className || ""}`} prefix={prefix} s={itemS} cssvar={cssvars} w={itemWidth} style={{ visibility: adjusting ? "hidden" : "visible", ...style }}>
            {childeles}
        </SnakeStyledList>
    )
}
export default SnakeTimeline;
