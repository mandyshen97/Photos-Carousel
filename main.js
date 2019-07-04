/**
 * 1. 实现图片自动向右轮播，当轮播到第四张时，反向向左轮播，到第四张时再向右轮播，循环往复。
 *    自动循环：定时器 setInterval()
 *    向左（向右）：方向，用布尔值表示。
 *    轮播到第几张，也就是轮播几次，用一个变量conunt表示。
 *    向右轮播一张，也就是将ul_img整体向左移动一个图片的宽度，通过transform来移动。
 * 2. 实现点击向左（向右）的箭头，图片向左（向右）轮播一张。
 *    判断方向，判断轮播的次数，如果是3次，则显示第一张图。
 * 3. 实现点击下方第n个按钮，图片显示第n张。
 */
window.onload = function () {
  // 定义动画执行的方向，false为向右，true为向左
  var isgo = false
  // 定义动画执行的次数count
  var count = 0
  // 定义计时器对象
  var timer

  // 获取ul_img
  var ul_img = document.getElementsByClassName('ul_img')[0]
  // 获取所有li_img图片元素
  var li_img = document.getElementsByClassName('li_img')
  // 获取所有箭头元素
  var arrow = document.getElementsByClassName('arrow')
  // 获取所有按钮元素
  var btn = document.getElementsByClassName('btn')

  // 1.定时器，每2秒执行一次，实现自动轮播
  showtime()
  function showtime() {
    timer = setInterval(function () {
      if (isgo == false) {
        count++
        ul_img.style.transform = "translate(" + -800 * count + "px)"
        if (count >= li_img.length - 1) {
          count = li_img.length - 1
          isgo = true
        }
      }
      else {
        count--
        ul_img.style.transform = "translate(" + -800 * count + "px)"
        if (count <= 0) {
          count = 0
          isgo = false
        }
      }
      // 每次点击都将所有按钮置为灰色，将count对应的按钮置为青色
      for (var a = 0; a < btn.length; a++) {
        btn[a].style.backgroundColor = "grey"
      }
      btn[count].style.backgroundColor = "aqua"
    }, 2000)
  }

  // 2.实现鼠标进入左右方向键操作
  for (let i = 0; i < arrow.length; i++) {
    // 鼠标悬停时停止自动轮播定时器
    arrow[i].onmouseover = function () {
      clearInterval(timer)
    }
    // 鼠标离开时添加自动轮播定时器
    arrow[i].onmouseout = function () {
      showtime()
    }
    // 鼠标点击时向左或向右轮播一张
    arrow[i].onclick = function () {
      // 区分左右
      if (this.title == 0) {
        count++
        if (count > 3) {
          count = 0
        }
      } else {
        count--
        if (count < 0) {
          count = 3
        }
      }
      ul_img.style.transform = "translate(" + -800 * count + "px)"
      // 每次点击都将所有按钮置为灰色，将count对应的按钮置为青色
      for (var a = 0; a < btn.length; a++) {
        btn[a].style.backgroundColor = "grey"
      }
      btn[count].style.backgroundColor = "aqua"
    }
  }

  // 3.实现点击下方第n个按钮，显示第n张图片
  for (let i = 0; i < btn.length; i++) {
    // 鼠标悬停时停止自动轮播定时器
    btn[i].onmouseover = function () {
      clearInterval(timer)
    }
    btn[i].onclick = function () {
      // 每次点击都将所有按钮置为灰色，将count对应的按钮置为青色
      for (var a = 0; a < btn.length; a++) {
        btn[a].style.backgroundColor = "grey"
      }
      btn[i].style.backgroundColor = "aqua"
      // 如果是第3个按钮，则自动轮播时向左
      if (i == 3) {
        isgo = true
      }
      // 如果是第0个按钮，则自动轮播时向右
      if (i == 0) {
        isgo = false
      }
      count = i;
      ul_img.style.transform = "translate(" + -800 * count + "px)"
    }
    btn[i].onmouseout = function () {
      showtime()
    }
  }




}
