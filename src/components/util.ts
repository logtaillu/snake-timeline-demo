import { ISnakeTimelineProps } from "../ISnakeTimeline";
/**
 * check if more then count lines
 * @param children timeline item array
 * @param count line num
 * @returns boolean
 */
const checkLineNumByCount = (children: HTMLLIElement[], count: number) => {
    let start = 0;
    let lines = 0;
    let flag = false;
    for (let i = 0; i < children.length; i++) {
        const cur = children[i].offsetLeft;
        if (i == 0) {
            start = cur;
            lines = 1;
        } else if (cur !== start) {
            start = cur;
            lines += 1;
        }
        if (lines > count) {
            flag = true;
            break;
        }
    }
    return flag;
}

export const getItemWidth = (ele: HTMLUListElement, itemWidth?: number) => {
    const children = Array.from(ele.children) as HTMLLIElement[];
    if (itemWidth) {
        return itemWidth;
    } else {
        const itemW = children.reduce((pre, cur) => Math.max(pre, cur.offsetWidth), 0);
        return itemW;
    }
}

export const clearEffects = (ele: HTMLUListElement) => {
    const children = Array.from(ele.children) as HTMLLIElement[];
    // reset
    children.map((value, index) => {
        value.style.order = index.toString();
        value.dataset.circle = "";
    });
    // clear padding
    ele.style.paddingTop = "0px";
    ele.style.paddingBottom = "0px";
}

export const adjustPosition = (ele: HTMLUListElement, columnW: number, lineW: number) => {
    clearEffects(ele);
    const children = Array.from(ele.children) as HTMLLIElement[];
    const pad = (columnW + lineW) / 2;
    // check if multi line
    const multiline = checkLineNumByCount(children, 1);
    if (multiline) {
        // add bottom padding
        ele.style.paddingBottom = pad + "px";
        // lines > 2, add top padding
        const moreThenTwo = checkLineNumByCount(children, 2);
        if (moreThenTwo) {
            ele.style.paddingTop = pad + "px";
        }
        let start: number = 0; // offset起始
        let idxAry: number[] = []; // 缓存indexs
        let reverse: boolean = false; // 当前序列是否倒序
        const orders: { [key: number]: { order: string; cls: string } } = {}; // order存储
        let lines = 0;
        const handleOrder = (lastAry = false) => {
            lines += 1;
            const len = idxAry.length;
            idxAry.map((idx, serial) => {
                orders[idx] = {
                    order: reverse ? idxAry[len - serial - 1].toString() : idx.toString(),
                    cls: serial === len - 1 && !lastAry ? (reverse ? "top" : "bottom") : ""
                };
            });
        };
        children.map((value, index) => {
            const sameLine = value.offsetLeft === start;
            if (sameLine) {
                // 相同offset，缓存index
                idxAry.push(index);
            } else {
                // 不同offset，处理缓存数组，更新值
                if (idxAry.length) {
                    handleOrder();
                    reverse = !reverse;
                }
                start = value.offsetLeft;
                idxAry = [index];
            }
        });
        if (idxAry.length) {
            handleOrder(true);
        }
        children.map((value, index) => {
            if (orders[index]) {
                value.style.order = orders[index].order;
                value.dataset.circle = orders[index].cls;
            } else {
                value.style.order = index.toString();
                value.dataset.circle = "";
            }
        });
        ele.style.width = lines * columnW + "px";
    } else {
        ele.style.width = columnW + "px";
    }
};