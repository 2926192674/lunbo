window.onload = function () {

  // 需求1：鼠标经过大盒子，展示左右按钮
  var content = document.querySelector('.content');
  var prev = document.querySelector('.arrow .prev');
  var next = document.querySelector('.arrow .next');
  content.onmouseenter = function () {
    prev.style.display = 'block';
    next.style.display = 'block';
    clearInterval(timer)
  }
  content.onmouseleave = function () {
    prev.style.display = 'none';
    next.style.display = 'none';
    clearInterval(timer)
    timer = setInterval(next.onclick, 2500)
  }

  // 需求2：点击小圆点滑动图片
  var olLis = document.querySelectorAll('ol li');
  var ulBox = document.querySelector('ul');
  // 获取单张图片的宽度
  var imgWidth = ulBox.children[0].offsetWidth;
  ulBox.style.width = ulBox.children.length * imgWidth + 'px';
  ulBox.style.left = -imgWidth + 'px';
  olLis.forEach(function (el, index) {
    el.onclick = function () {
      paiTa(index);
      // 移动的是ulBox的位置
      move(index);
      count = index;
    }
  })

  // 封装小圆点排他思想
  function paiTa (n) {
    olLis.forEach(function (item) {
      item.removeAttribute('class');
    })
    olLis[n].className = 'active';
  }
  // 封装图片移动
  function move (n) {
    ulBox.style.transition = 'left 0.35s ease-in-out';
    ulBox.style.left = -imgWidth * (n + 1) + 'px';
  }

  // 需求3：左右按钮触发滑动
  var count = 0;
  var flag = true;
  next.onclick = function () {
    if (flag) {
      flag = false;
      count++;
      move(count);
      if (count >= ulBox.children.length - 2) return paiTa(0);
      paiTa(count);
    }
  }
  prev.onclick = function () {
    if (flag) {
      flag = false;
      count--;
      move(count);
      if (count < 0) return paiTa(5);
      paiTa(count);
    }
  }

  // 监听最后一张结束和第一张跳转
  var lastIndex = ulBox.children.length - 2;
  ulBox.ontransitionend = function () {
    if (count < 0) {
      // 已经去往复制的最后一张了
      ulBox.style.transition = 'none';
      ulBox.style.left = -imgWidth * lastIndex + 'px';
      count = lastIndex - 1;
    } else if (count >= lastIndex) {
      // 已经去往复制的第一张了
      ulBox.style.transition = 'none';
      ulBox.style.left = -imgWidth + 'px';
      count = 0;
    }

    flag = true;
  }


  // 需求4：自动轮播
  var timer = setInterval(next.onclick, 2500);

}