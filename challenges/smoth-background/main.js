// 获取需要操作的元素
const menuItems = document.querySelectorAll(".menu-item")
const highlight = document.querySelector(".highlight")

menuItems.forEach((item) => {
    item.addEventListener("mouseenter", e => {
        // 获取所有 item 的宽度
        let menuWidth = window.getComputedStyle(e.target).getPropertyValue("width")
        // 获取 item 距离最左侧的距离，用于计算滑动距离
        let menuLeft = e.target.offsetLeft
        if (e.fromElement.classList.contains("menu-item")) { //判断鼠标是否从菜单进入
            // 设置背景框样式
            highlight.style = `
            width:${menuWidth};
            transform:translateX(${menuLeft}px);
            transition-duration:250ms;`
        }else{
            // 设置背景框样式
            highlight.style = `
            width:${menuWidth};
            transform:translateX(${menuLeft}px);
            transition-duration:0;`
        }
    })
})
