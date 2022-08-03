
export interface ISnakeTimelineStyleProps {
    /**@description dot style，轴点样式*/
    dotStyle?: React.CSSProperties;
    /**@description line style，线样式*/
    lineStyle?: React.CSSProperties;
    /**@description content style，内容样式*/
    contentStyle?: React.CSSProperties;
    /**@description wrapper className, 外层样式名 */
    className?: string;
    /**@description wrapper style，外层样式 */
    style?: React.CSSProperties;
    /**@description className prefix 样式前缀，配合less一起 @default react-snake-timeline */
    prefix?: string;
}
/**
 * 使用默认样式的数据
 * data structure if use default style
 */
type ITimelineContent = string | React.ReactNode;
export interface ITimelineItemData extends ISnakeTimelineStyleProps {
    /**@description content position，定位 @default righttop*/
    position?: "leftbottom" | "righttop";
    /**@description content，内容 @default "" */
    content: ITimelineContent;
    /**@description dot element，轴点元素*/
    dot?: React.ReactNode;
}

export interface ISnakeTimelineCssVar {
    lineColor: string;
    lineWidth: number;
    dotSize: number;
    pad: number;
}

/**
 * if wrap = true, at latest one of 'itemWidth'、'itemPerLine','lineCount' is needed for adjust
 * lineCount have priority over itemPerLine
 * props.children have priority over props.data
 */
export interface ISnakeTimelineProps extends ISnakeTimelineStyleProps {
    /**@description timeline direction， 方向  @default vertical*/
    direction?: "vertical" | "horizontal";
    /**@description position of element relative to line, right/left for  vertical,top/bottom for horizontal， 元素定位 @default righttop*/
    position?: "leftbottom" | "righttop" | "alternate";
    /**@description reverse all items，是否倒序 @default false*/
    reverse?: boolean;
    /**@description wrap line or not， 是否换行 @default false */
    wrap?: boolean;
    /**@description width of one item，单个元素宽度 */
    itemWidth?: number;
    /**@description max number of elements in a line，一行/列几个元素 */
    itemPerLine?: number;
    /**@description  number of lines，一共几行/列*/
    lineCount?: number;
    /**@description data，传入数据 */
    data?: ITimelineItemData[] | ITimelineContent[];
    css?: Partial<ISnakeTimelineCssVar>;
}