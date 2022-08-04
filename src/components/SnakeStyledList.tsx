import styled, { css } from "styled-components";
import { ISnakeTimelineCssVar } from "../ISnakeTimeline";

const SnakeStyledList = styled.ul<{ w?: number, prefix: string, cssvar: ISnakeTimelineCssVar }>`
${(props) => {
    const { w: itemw = 0, prefix, cssvar } = props;
  const { pad, lineColor, lineWidth, dotSize } = cssvar;
  const [padVer, padHoz] = pad;
    const w = itemw + lineWidth;
    const halfw = w / 2;
    const left = (dotSize - lineWidth) / 2;
    return css`
        >li.${prefix}-item {
            width: ${itemw ? itemw + "px" : "auto"};
            padding: ${padVer}px 0;
            .${prefix}-line{
              height: calc( 100% + ${padVer * 2}px );
              top: -${padVer}px;
              left: ${left}px;
              border-left: ${lineWidth}px solid ${lineColor};
            }
            .${prefix}-dot{
              width: ${dotSize}px;
              height:${dotSize}px;
              top: calc( 50% - ${dotSize / 2}px );
              left: 0;
            }
            &.${prefix}-item-righttop{
              .${prefix}-content{
                margin: 0 ${padHoz}px 0 ${padHoz + dotSize}px;
              }
            }
            /* 左右布局部分 */
            &.${prefix}-item-leftbottom{
              display: flex;
              justify-content: flex-end;
              .${prefix}-content{
                margin: 0 ${padHoz + dotSize}px 0 ${padHoz}px;
              }
              .${prefix}-line{
                left: calc( 100% - ${(dotSize + lineWidth) / 2}px );
              }
              .${prefix}-dot{
                left: calc( 100% - ${dotSize}px );
              }
            }
        }
        /* 圆弧部分*/
        >li.${prefix}-item[data-circle="top"]::before,
        >li.${prefix}-item[data-circle="bottom"]::after {
          content: "";
          display: block;
          width: ${w}px;
          height: ${halfw}px;
          border: ${lineWidth}px solid ${lineColor};
          left: ${left}px;
          box-sizing: border-box;
          position: absolute;
        }

        >li.${prefix}-item[data-circle="bottom"]::after {
          border-top: none;
          border-radius: 0 0 ${halfw}px ${halfw}px;
          top: 100%;
        }
        >li.${prefix}-item[data-circle="top"]::before {
          border-bottom: none;
          border-radius: ${halfw}px ${halfw}px 0 0;
          top: -${halfw}px;
        }
        /*左布局圆弧*/
        &.${prefix}-leftbottom >li{
          &[data-circle="top"]::before,
          &[data-circle="bottom"]::after{
            left: calc( 100% - ${(dotSize + lineWidth) / 2}px );
          }
        }
        /*交错布局*/
        &.${prefix}-alternate{
          &:not(.${prefix}-wrap){
            >li.${prefix}-item.${prefix}-item-leftbottom{
              right: calc( 50% - ${dotSize/2}px );
            }
            >li.${prefix}-item.${prefix}-item-righttop{
              left: calc( 50% - ${dotSize/2}px );
            }
          }
          &.${prefix}-wrap{
            >li.${prefix}-item{
              .${prefix}-dot{
                left: calc( 50% - ${dotSize/2}px );
              }
              .${prefix}-line{
                left: calc( 50% - ${lineWidth/2}px);
              }
            }
            >li.${prefix}-item.${prefix}-item-leftbottom .${prefix}-content{
                  width: 50%;
                  margin-right: calc( 50% + ${padHoz + dotSize/2}px );
            }
            >li.${prefix}-item.${prefix}-item-righttop .${prefix}-content{
                width: 50%;
                margin-left: calc( 50% + ${padHoz + dotSize/2}px );
            }
            >li.${prefix}-item[data-circle="top"]::before,
            >li.${prefix}-item[data-circle="bottom"]::after{
              left: calc( 50% - ${lineWidth/2}px);
            }
          }
        }
    `;
  }}`;
export default SnakeStyledList;