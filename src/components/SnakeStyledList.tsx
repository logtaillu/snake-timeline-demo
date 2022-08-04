import styled, { css } from "styled-components";
import { ISnakeTimelineCssVar } from "../ISnakeTimeline";

const SnakeStyledList = styled.ul<{ s?: number, prefix: string, cssvar: ISnakeTimelineCssVar, w?: number }>`
${(props) => {
    const { s: items = 0, prefix, cssvar, w } = props;
    const { pad, lineColor, lineWidth, dotSize } = cssvar;
    const [padVer, padHoz] = pad;
    const s = items + lineWidth;
    const halfw = s / 2;
    const itemprefix = `>li.${prefix}-item`;
    const cssstr = (v: boolean) => `
  &.${prefix}-${v ? "vertical" : "horizontal"}{
      &.${prefix}-wrap ${itemprefix}{
        width: ${v ? items ? `${items}px` : "auto" : w ? `${w}px` : "auto"};
      }
      /*元素部分*/
      ${itemprefix}{
        padding: ${v ? `${padVer}px 0` : `0 ${padHoz}px`};
        .${prefix}-line{
          ${v ? "height" : "width"}: 100%;
          ${v ? "top" : "left"}: 0;
          ${v ? "left" : "bottom"}: ${(dotSize - lineWidth) / 2}px;
          border-${v ? "left" : "bottom"}: ${lineWidth}px solid ${lineColor};
        }
        .${prefix}-dot{
          width: ${dotSize}px;
          height:${dotSize}px;
          ${v ? "top" : "left"}: calc( 50% - ${dotSize / 2}px );
          ${v ? "left" : "bottom"}: 0;
        }
        .${prefix}-content{
          margin: ${v ? `0 ${padHoz}px` : `${padVer}px 0`};
        }
        &.${prefix}-item-righttop{
          .${prefix}-content{
            margin-${v ? "left" : "bottom"}: ${(v ? padHoz : padVer) + dotSize}px;
          }
        }
        /* 左右布局部分 */
        &.${prefix}-item-leftbottom{
          ${v ? `
          display: flex;
          justify-content: flex-end;
          `: ""}
          .${prefix}-content{
            margin-${v ? "right" : "top"}: ${(v ? padHoz : padVer) + dotSize}px;
          }
          .${prefix}-line{
            ${v ? "left" : "bottom"}: calc( 100% - ${(dotSize + lineWidth) / 2}px );
          }
          .${prefix}-dot{
            ${v ? "left" : "bottom"}: calc( 100% - ${dotSize}px );
          }
        }
      }
      /* 圆弧部分*/
      ${itemprefix}[data-circle="top"]::before,
      ${itemprefix}[data-circle="bottom"]::after {
        content: "";
        display: block;
        ${v ? "width" : "height"}: ${s}px;
        ${v ? "height" : "width"}: ${halfw}px;
        border: ${lineWidth}px solid ${lineColor};
        left: ${(dotSize - lineWidth) / 2}px;
        box-sizing: border-box;
        position: absolute;
      }
      ${itemprefix}[data-circle="bottom"]::after {
        border-${v ? "top" : "left"}: none;
        border-radius: ${v ? `0 0 ${halfw}px ${halfw}px` : `0 ${halfw}px ${halfw}px 0`};
        ${v ? "top" : "left"}: 100%;
        ${v ? "" : `top: calc( 100% - ${(dotSize + lineWidth) / 2}px )`}
      }
      ${itemprefix}[data-circle="top"]::before {
        border-${v ? "bottom" : "right"}: none;
        border-radius: ${v ? `${halfw}px ${halfw}px 0 0` : `${halfw}px 0 0 ${halfw}px`};
        ${v ? "top" : "left"}: -${halfw}px;
        ${v ? "" : `top: calc( 100% - ${(dotSize + lineWidth) / 2}px )`}
      }
      /*左布局圆弧*/
      &.${prefix}-leftbottom >li{
        &[data-circle="top"]::before,
        &[data-circle="bottom"]::after{
          ${v ? `left: calc( 100% - ${(dotSize + lineWidth) / 2}px )`
        : `top: ${(dotSize - lineWidth) / 2}px`};
        }
      }
      /*交错布局*/
      &.${prefix}-alternate{
         ${itemprefix}{
            .${prefix}-dot{
              ${v ? "left" : "bottom"}: calc( 50% - ${dotSize / 2}px );
            }
            .${prefix}-line{
              ${v ? "left" : "bottom"}: calc( 50% - ${lineWidth / 2}px);
            }
          }
         ${itemprefix}.${prefix}-item-leftbottom .${prefix}-content{
                ${v ? `
                width: 50%;
                margin-right: calc( 50% + ${padHoz + dotSize / 2}px );
                ` : `
                margin-top: 100%;
                `}
          }
         ${itemprefix}.${prefix}-item-righttop .${prefix}-content{
              ${v ? `
              width: 50%;
              margin-left: calc( 50% + ${padHoz + dotSize / 2}px );
              ` : `
              margin-bottom: 100%;
              `}
          }
         ${itemprefix}[data-circle="top"]::before,
         ${itemprefix}[data-circle="bottom"]::after{
            ${v ? "left" : "top"}: calc( 50% - ${lineWidth / 2}px);
          }
      }
    }
  `;

    return css`
        ${cssstr(true)}
        ${cssstr(false)}
    `;
  }}`;
export default SnakeStyledList;