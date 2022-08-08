import styled, { css } from "styled-components";
import { ISnakeTimelineCssVar } from "../ISnakeTimeline";

const SnakeStyledList = styled.ul<{ s?: number, prefix: string, cssvar: ISnakeTimelineCssVar, w?: number }>`
${(props) => {
    const { s: items = 0, prefix, cssvar, w } = props;
    const { padHorizontal: padHoz, padVertical: padVer, lineColor, lineWidth, dotSize } = cssvar;
    const s = items + lineWidth;
    const halfw = s / 2;
    const itemprefix = `>li.${prefix}-item`;
    const cssstr = (v: boolean) => `
  &.${prefix}-${v ? "vertical" : "horizontal"}{
      ${itemprefix}{
        ${w ? `width: ${w}px;
        flex-shrink: 0;
        `: ""}
      }
      &.${prefix}-wrap ${itemprefix}{
        width: ${v && items ? `${items}px` : ""};
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
      &.${prefix}-alternate{
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
        .${prefix}-item .${prefix}-dot{
          color: ${cssvar.dotColor};
          border: ${cssvar.dotBorder}px solid ${cssvar.dotColor};
        }
        /*交错布局*/
        &.${prefix}-vertical.${prefix}-alternate{
          ${itemprefix}{
            .${prefix}-dot{
              left: calc( 50% - ${dotSize / 2}px );
            }
            .${prefix}-line{
              left: calc( 50% - ${lineWidth / 2}px);
            }
          }
         ${itemprefix}.${prefix}-item-leftbottom .${prefix}-content{
                width: 50%;
                margin-right: calc( 50% + ${padHoz + dotSize / 2}px );
          }
         ${itemprefix}.${prefix}-item-righttop .${prefix}-content{
              width: 50%;
              margin-left: calc( 50% + ${padHoz + dotSize / 2}px );
          }
        }
        &.${prefix}-horizontal.${prefix}-alternate{
          ${itemprefix}{
            .${prefix}-dot{
              bottom: calc( 50% - ${dotSize / 2}px );
            }
            .${prefix}-line{
              bottom: calc( 50% - ${lineWidth / 2}px);
            }
            &.${prefix}-item-leftbottom{
              align-self: flex-start;
              align-items: flex-start;
              .${prefix}-content{
                top: 50%;
              }
            }
            &.${prefix}-item-righttop{
              align-self: flex-end;
              align-items: flex-end;
              .${prefix}-content{
                bottom: 50%;
              }
            }
          }
          &.${prefix}-wrap ${itemprefix}{
            &.${prefix}-item-leftbottom{
            }
            &.${prefix}-item-righttop{}
          }
        }
    `;
  }}`;
export default SnakeStyledList;