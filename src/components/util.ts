/**
 * check if more then count lines
 * @param children timeline item array
 * @param count line num
 * @returns boolean
 */
const checkLineNumByCount = (children: HTMLLIElement[], count: number, direction: "vertical" | "horizontal") => {
    let start = 0;
    let lines = 0;
    let flag = false;
    const key = direction === "vertical" ? "offsetLeft" : "offsetTop";
    for (let i = 0; i < children.length; i++) {
        const cur = children[i][key];
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

export const getItemSize = (ele: HTMLUListElement, direction: "vertical" | "horizontal", itemSize?: number) => {
    const children = Array.from(ele.children) as HTMLLIElement[];
    if (itemSize && direction === "vertical") {
        return itemSize;
    } else {
        const key = direction === "vertical" ? "offsetWidth" : "offsetHeight";
        const itemS = children.reduce((pre, cur) => Math.max(pre, cur[key]), 0);
        return itemS;
    }
}

export const clearEffects = (ele: HTMLUListElement) => {
    const children = Array.from(ele.children) as HTMLLIElement[];
    // reset
    children.map((value, index) => {
        value.style.order = index.toString();
        value.dataset.circle = "";
        value.style.height = "auto";
    });
    // clear padding
    ele.style.width = "auto";
    ele.style.height = "auto";
    ele.style.paddingTop = "0px";
    ele.style.paddingBottom = "0px";
    ele.style.paddingLeft = "0px";
    ele.style.paddingRight = "0px";
}
export const adjustPosition = (ele: HTMLUListElement, columnSize: number, lineW: number, direction: "vertical" | "horizontal", wrap: boolean) => {
    const v = direction === "vertical";
    clearEffects(ele);
    const children = Array.from(ele.children) as HTMLLIElement[];
    const pad = (columnSize + lineW) / 2;
    // check if multi line
    const multiline = !wrap && checkLineNumByCount(children, 1, direction);
    const keys: any = {
        fircicle: v ? "paddingBottom" : "paddingRight",
        seccircle: v ? "paddingTop" : "paddingLeft",
        offset: v ? "offsetLeft" : "offsetTop",
        size: v ? "width" : "height"
    }
    if (multiline) {
        // add bottom padding
        ele.style[keys.fircicle] = pad + "px";
        // lines > 2, add top padding
        const moreThenTwo = checkLineNumByCount(children, 2, direction);
        if (moreThenTwo) {
            ele.style[keys.seccircle] = pad + "px";
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
        children.map((value: any, index) => {
            const sameLine = value[keys.offset] === start;
            if (sameLine) {
                // 相同offset，缓存index
                idxAry.push(index);
            } else {
                // 不同offset，处理缓存数组，更新值
                if (idxAry.length) {
                    handleOrder();
                    reverse = !reverse;
                }
                start = value[keys.offset];
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
            if (direction === "horizontal") {
                value.style.height = columnSize + "px";
            }
        });
        ele.style[keys.size] = lines * columnSize + "px";
    } else {
        ele.style[keys.size] = columnSize + "px";
    }
};