/*
 * @Author: allen.wong 
 * @Date: 2018-07-02 15:09:09 
 * @Last Modified by: allen.wong
 * @Last Modified time: 2018-10-22 16:43:12
 */

var config = {
  type: 'toast',
  title: '标题',
  tip: '提示',
  icon: 'success',
  tip_align: 'center',
  delay: 2000,
  ok_text: '确定',
  ok_color: '',
  cbok: function(obj) {},
  cbok_param: {},
  cl_text: '取消',
  cl_color: '',
  cbcl: function(obj) {},
  cbcl_param: {},
  cbcm: function(obj) {},
  cbcm_param: {}
}

var popup = {
  config: {
    type: 'toast',
    title: '标题',
    tip: '提示',
    icon: 'success',
    tip_align: 'center',
    delay: 2000,
    ok_text: '确定',
    ok_color: '',
    cbok: function(obj) {},
    cbok_param: {},
    cl_text: '取消',
    cl_color: '',
    cbcl: function(obj) {},
    cbcl_param: {},
    cbcm: function(obj) {},
    cbcm_param: {}
  },
  getConfig: function(param) {
    var final = this.config
    if (param) {
      for (var key in param) {
        final[key] = param[key]
      }
      return final
    } else {
      return config
    }
  },
  insertElement: function(param) {
    var final = this.getConfig(param)
    var el = ''
    switch (final.type) {
      case 'loading':
        var popup_t = document.createElement('div')
        popup_t.className = 'popup'
        popup_t.id = 'popup'
        popup_t.innerHTML =
          '<div class="loading">' +
          this.dealIcon(final) +
          '<div class="pop-tip">' +
          final.tip +
          '</div></div>'
        document.body.appendChild(popup_t)
        break
      case 'toast':
        var popup_t = document.createElement('div')
        popup_t.className = 'popup'
        popup_t.id = 'popup'
        popup_t.innerHTML =
          '<div class="toast">' +
          this.dealIcon(final) +
          '<div class="pop-tip">' +
          final.tip +
          '</div></div>'
        document.body.appendChild(popup_t)
        if (final) {
          this.delay(final)
        }
        break
      case 'alert':
        var popup_t = document.createElement('div')
        popup_t.className = 'popup'
        popup_t.id = 'popup'
        popup_t.innerHTML =
          '<div class="pop-box alert"><div class="pop-title">' +
          final.title +
          '</div>' +
          this.dealTip(final) +
          '<div class="pop-btns">' +
          this.dealBtn(final) +
          '</div></div>'
        document.body.appendChild(popup_t)
        this.btnEvent(final)
        break
      case 'confirm':
        var popup_t = document.createElement('div')
        popup_t.className = 'popup'
        popup_t.id = 'popup'
        popup_t.innerHTML =
          '<div class="pop-box confirm"><div class="pop-title">' +
          final.title +
          '</div>' +
          this.dealTip(final) +
          '<div class="pop-btns">' +
          this.dealBtn(final) +
          '</div></div>'
        document.body.appendChild(popup_t)
        this.btnEvent(final)
        break
      case 'prompt':
        break
    }
    return el
  },
  dealIcon: function(param) {
    var icon = param.icon
    var iconText = ''
    if (param.type === 'toast') {
      switch (icon) {
        case 'success':
          iconText = `<svg width="50" height="50" viewbox="0 0 50 50" class="toastSvg"><circle class="toastCircle" cx="25" cy="25" r="23" stroke-width="2" stroke="#ffffff" fill="none" transform="matrix(0,-1,1,0,0,0)" stroke-dasharray="0 30"></circle><line class="sucLineLeft" stroke-linecap="round" x1="15" y1="23"x2="21" y2="31" style="stroke:#fff;stroke-width:0" stroke-dasharray="0 40"/></line><line class="sucLineRight" stroke-linecap="round" x1="22" y1="31" x2="35" y2="18" style="stroke:#fff;stroke-width:0" stroke-dasharray="0 40"/></line></svg>`
          break
        case 'warn':
          iconText = `<svg width="50" height="50" viewbox="0 0 50 50" class="toastSvg"><circle class="toastCircle" cx="25" cy="25" r="23" stroke-width="2" stroke="#ffffff" fill="none" transform="matrix(0,-1,1,0,0,0)" stroke-dasharray="0 30"></circle><line class="tipLineTop" stroke-linecap="round" x1="25" y1="15" x2="25" y2="16" style="stroke:#fff;stroke-width:2" stroke-dasharray="0 40"/><line class="tipLineBottom" x1="25" y1="20" x2="25" y2="35" style="stroke:#fff;stroke-width:2" stroke-dasharray="0 40"/></svg>`
          break
        case 'error':
          iconText = `<svg width="50" height="50" viewbox="0 0 50 50" class="toastSvg"><circle class="toastCircle" cx="25" cy="25" r="23" stroke-width="2" stroke="#ffffff" fill="none" transform="matrix(0,-1,1,0,0,0)" stroke-dasharray="0 30"></circle><line class="failLineLeft" stroke-linecap="round" x1="18" y1="18" x2="32" y2="32" style="stroke:#fff;stroke-width:0" stroke-dasharray="0 40"/><line class="failLineRight" stroke-linecap="round" x1="32" y1="18" x2="18" y2="32" style="stroke:#fff;stroke-width:0" stroke-dasharray="0 40"/></svg>`
          break
        default:
          iconText = `<div class="pop-icon" style="background:url(${icon}) no-repeat 50%;background-size:10vw 10vw;"></div>`
          break
      }
    } else if (param.type === 'loading') {
      if (icon !== 'success' && icon !== 'warn' && icon !== 'error') {
        iconText = `<div class="pop-icon" style="background:url(${icon}) no-repeat 50%;background-size:10vw 10vw;"></div>`
      } else {
        iconText =
          '<div class="pop-icon"><embed src="https://public.pannacloud.com/img/loading/loading5.svg" width="25" height="25" type="image/svg+xml" pluginspage="http://www.adobe.com/svg/viewer/install/"/></div>'
      }
    }
    return iconText
  },
  delay: function(param) {
    var self = this
    if (param.delay > 1000) {
      setTimeout(function() {
        self.hide(param)
      }, param.delay)
    }
  },
  dealTip: function(param) {
    if (param.tip_align === 'left') {
      return `<div class="pop-tip" style="text-align:left;">${param.tip}</div>`
    } else if (param.tip_align === 'right') {
      return `<div class="pop-tip" style="text-align:right;">${param.tip}</div>`
    } else {
      return `<div class="pop-tip"">${param.tip}</div>`
    }
  },
  dealBtn: function(param) {
    if (param.type === 'alert') {
      if (param.ok_color) {
        return `<button class="pop-btn pop-ok" style="color:${
          param.ok_color
        }">${param.ok_text}</button>`
      } else {
        return `<button class="pop-btn pop-ok">${param.ok_text}</button>`
      }
    } else if (param.type === 'confirm') {
      var okText = ''
      var clText = ''
      if (param.ok_color) {
        okText = `<button class="pop-btn pop-ok" style="color:${
          param.ok_color
        }">${param.ok_text}</button>`
      } else {
        okText = `<button class="pop-btn pop-ok">${param.ok_text}</button>`
      }
      if (param.cl_color) {
        clText = `<button class="pop-btn pop-cl" style="color:${
          param.cl_color
        }">${param.cl_text}</button>`
      } else {
        clText = `<button class="pop-btn pop-cl">${param.cl_text}</button>`
      }
      return okText + clText
    }
  },
  btnEvent: function(param) {
    var self = this
    if (param.type === 'alert') {
      var dom = document.getElementById('popup')
      var btn = this.getByClass(dom, 'pop-btn pop-ok')
      btn[0].removeEventListener(
        'click',
        function() {
          self.popupOk(param)
        },
        false
      )
      btn[0].addEventListener(
        'click',
        function() {
          self.popupOk(param)
        },
        false
      )
    } else if (param.type === 'confirm') {
      var dom = document.getElementById('popup')
      var btn = this.getByClass(dom, 'pop-btn pop-ok')
      btn[0].removeEventListener(
        'click',
        function() {
          self.popupOk(param)
        },
        false
      )
      btn[0].addEventListener(
        'click',
        function() {
          self.popupOk(param)
        },
        false
      )
      var dom2 = document.getElementById('popup')
      var btn2 = this.getByClass(dom, 'pop-btn pop-cl')
      btn2[0].removeEventListener(
        'click',
        function() {
          self.popupCl(param)
        },
        false
      )
      btn2[0].addEventListener(
        'click',
        function() {
          self.popupCl(param)
        },
        false
      )
    }
  },
  anim: function(param) {
    if (param.icon === 'error') {
      setTimeout(function() {
        document
          .getElementsByClassName('toastCircle')[0]
          .classList.add('toastCircleM')
        document
          .getElementsByClassName('failLineLeft')[0]
          .classList.add('failLineM')
        document
          .getElementsByClassName('failLineRight')[0]
          .classList.add('failLineM')
      }, 100)
    } else if (param.icon === 'success' || !param.icon) {
      setTimeout(function() {
        document
          .getElementsByClassName('toastCircle')[0]
          .classList.add('toastCircleM')
        document
          .getElementsByClassName('sucLineLeft')[0]
          .classList.add('sucLineM')
        document
          .getElementsByClassName('sucLineRight')[0]
          .classList.add('sucLineM')
      }, 100)
    } else if (param.icon === 'warn') {
      setTimeout(function() {
        document
          .getElementsByClassName('toastCircle')[0]
          .classList.add('toastCircleM')
        document
          .getElementsByClassName('tipLineTop')[0]
          .classList.add('tipLineM')
        document
          .getElementsByClassName('tipLineBottom')[0]
          .classList.add('tipLineM2')
      }, 100)
    }
  },
  show: function(param) {
    var nowConfig = this.getConfig(param)
    if (document.getElementById('popup')) {
      this.insertElement(nowConfig)
      if (param.type == 'toast') {
        this.anim(nowConfig)
      }
    } else {
      this.hide(nowConfig)
      this.insertElement(nowConfig)
      if (param.type == 'toast') {
        this.anim(nowConfig)
      }
    }
  },
  hide: function(param) {
    var nowConfig = this.getConfig(param)
    var ele = document.getElementById('popup')
    if (ele) {
      document.body.removeChild(ele)
      nowConfig.cbcm(nowConfig.cbcm_param)
    }
  },
  popupOk: function(param) {
    param.cbok(param.cbok_param)
    this.hide()
  },
  popupCl: function(param) {
    param.cbcl(param.cbcl_param)
    this.hide()
  },
  getByClass: function(oParent, sClass) {
    var aResult = []
    var aEle = oParent.getElementsByTagName('*')
    for (var i = 0; i < aEle.length; i++) {
      if (aEle[i].className == sClass) {
        aResult.push(aEle[i])
      }
    }

    return aResult
  }
}

window.popup = popup
