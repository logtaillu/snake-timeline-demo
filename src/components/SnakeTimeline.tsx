import React, { useEffect, useRef, useState } from 'react';
import { useSafeState, useSize, useUpdateEffect } from "ahooks";
import "../styles/index.less";
import { ISnakeTimelineCssVar, ISnakeTimelineProps, ISnakeTimelineStyleProps } from '../ISnakeTimeline';
import SnakeTimelineItem from './SnakeTimelineItem';
import SnakeStyledList from './SnakeStyledList';
import { adjustPosition, getItemWidth, clearEffects } from "./util";

const DEFAULT_PREFIX_CLS = "react-snake-timeline";
const defaultCssVar: ISnakeTimelineCssVar = {
    lineColor: "#e8e8e8",
    lineWidth: 2,
    dotSize: 10,
    pad: 10
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
    const { className = "", style, prefix = DEFAULT_PREFIX_CLS, data, children, wrap, direction = "vertical", reverse, itemWidth, css } = props;
    const [itemW, setItemW] = useSafeState(itemWidth);
    const [adjusting, setAajusting] = useSafeState(true);

    const ref = useRef<HTMLUListElement>(null);
    const size = useSize(ref);
    const w = (size && size.width) || 0;
    const h = (size && size.height) || 0;
    const cssvars = { ...defaultCssVar, ...css };

    // clear when no wrap
    useUpdateEffect(() => {
        if (!wrap && ref && ref.current) {
            clearEffects(ref.current);
        }
    }, [wrap]);
    useEffect(() => {
        // resort items and add circle
        if (w && h && ref.current && wrap) {
                const colunmW = getItemWidth(ref.current, itemWidth);
                adjustPosition(ref.current, colunmW, cssvars.lineWidth);
            setItemW(colunmW);
            setAajusting(false);
        } else if (!wrap) {
            setAajusting(false);
        }
    }, [w, h, itemWidth, wrap, cssvars.lineWidth]);
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
        <div className={`${prefixCls("wrapper")} ${className || ""}`} style={{ paddingTop: cssvars.pad, visibility: adjusting ? "hidden" : "visible", ...style }}>
            <SnakeStyledList ref={ref} className={`${prefixCls("list")} ${wrap ? prefixCls("wrap") : ""} ${prefixCls(direction)}`} prefix={prefix} w={itemW} cssvar={cssvars}>
                {childeles}
            </SnakeStyledList>
        </div>
    )
}
export default SnakeTimeline;
