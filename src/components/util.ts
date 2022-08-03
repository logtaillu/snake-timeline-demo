export const adjustPosition = (ele: HTMLUListElement, columnW: number) => {
    const children = Array.from(ele.children) as HTMLLIElement[];
    // reset
    children.map((value, index) => {
        value.style.order = index.toString();
        value.dataset.circle = "";
    });
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
};