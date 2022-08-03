import styled, { css } from "styled-components";
import { ISnakeTimelineCssVar } from "../ISnakeTimeline";

const SnakeStyledList = styled.ul<{ w?: number, prefix: string, cssvar: ISnakeTimelineCssVar }>`
${(props) => {
    const { w: itemw = 0, prefix, cssvar } = props;
    const { pad, lineColor, lineWidth, dotSize } = cssvar;
    const w = itemw + lineWidth;
    const halfw = w / 2;
    const left = (dotSize - lineWidth) / 2;
    return css`
        >li.${prefix}-item {
            width: ${itemw}px;
            padding: ${pad}px 10px ${pad}px 0;
            .${prefix}-line{
              height: calc( 100% + ${pad * 2}px );
              top: -${pad}px;
              left: ${left}px;
              border-left: ${lineWidth}px solid ${lineColor};
            }
            .${prefix}-dot{
              width: ${dotSize}px;
              height:${dotSize}px;
              top: calc( 50% - ${dotSize/2}px );
            }
        }
        > li[data-circle="top"]::before,
        > li[data-circle="bottom"]::after {
          content: "";
          display: block;
          width: ${w}px;
          height: ${halfw}px;
          border: ${lineWidth}px solid ${lineColor};
          /* same to line left */
          left: ${left}px;
          box-sizing: border-box;
          position: absolute;
        }
        > li[data-circle="bottom"]::after {
          border-top: none;
          border-radius: 0 0 ${halfw}px ${halfw}px;
          top: 100%;
        }
        > li[data-circle="top"]::before {
          border-bottom: none;
          border-radius: ${halfw}px ${halfw}px 0 0;
          top: -${halfw}px;
        }
    `;
  }}`;
export default SnakeStyledList;