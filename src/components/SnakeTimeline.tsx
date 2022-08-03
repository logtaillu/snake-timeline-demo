import React, { useEffect, useRef } from 'react';
import { useSize } from "ahooks";
import "../styles/index.less";
import { ISnakeTimelineProps, ISnakeTimelineStyleProps } from '../ISnakeTimeline';
import SnakeTimelineItem from './SnakeTimelineItem';
import SnakeStyledList from './SnakeStyledList';
import { adjustPosition } from "./util";

const DEFAULT_PREFIX_CLS = "react-snake-timeline";

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
    const { className = "", style, prefix = DEFAULT_PREFIX_CLS, data, children, wrap, direction = "vertical", reverse, itemWidth, css } = props;
    const ref = useRef<HTMLUListElement>(null);
    const size = useSize(ref);
    const w = (size && size.width) || 0;
    const h = (size && size.height) || 0;
    useEffect(() => {
        if (w && h && ref.current && itemWidth && wrap) {
            adjustPosition(ref.current, itemWidth);
        }
    }, [w, h, itemWidth, wrap]);
    const prefixCls = (str: string) => `${prefix}-${str}`;

    // getChildren
    let childeles: any[] = [];
    if (data) {
        let ary = [...data];
        if (reverse) {
            ary.reverse();
        }
        childeles = ary.map((info, idx) => {
            if (!info) {
                return null;
            } else if (typeof (info) === "object" && info && 'content' in info) {
                return <SnakeTimelineItem key={idx} prefix={prefix} {...info} {...mergeProps(info, props)} />;
            } else {
                return <SnakeTimelineItem key={idx} prefix={prefix} content={info} {...mergeProps({}, props)} />;
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
                prefixCls: ele.props.prefix || prefix || DEFAULT_PREFIX_CLS,
                ...mergeProps(ele.props, props)
            });
        });
    }
    return (
        <SnakeStyledList ref={ref} className={`${prefixCls("list")} ${wrap ? prefixCls("wrap") : ""} ${prefixCls(direction)} ${className || ""}`} prefix={prefix} w={itemWidth} cssvar={css} style={style}>
            {childeles}
        </SnakeStyledList>
    )
}
export default SnakeTimeline;
