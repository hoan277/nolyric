// Auto Reload CSS khỏi Cache
for (var link of document.querySelectorAll("link[rel=stylesheet]")) link.href = link.href.replace(/\?.*|$/, "?" + Date.now());
/**
 * Sao chép vào Clipboard.
 * @example copyToClipboard('Lorem ipsum');
 * @param {*} str Đoạn văn muốn copy
 */
const copyToClipboard = (str) => {
  const el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};
/**
 * Mô tả Ẩn DOM.
 * @example hide(element)
 * @param  {...any} el
 */
const hide = (...el) => [...el].forEach((e) => (e.style.display = "none"));
/**
 * Cuộn trang lên đầu.
 *
 * @example scrollToTop();
 */
const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};
/**
 * Kiểm tra là điện thoại hay máy tính.
 *
 * @example getDeviceType();
 */
const getDeviceType = () => (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? "Mobile" : "Desktop");

/**
 * Lấy tất cả các giá trị GET trên đường dẫn hiện tại.
 *
 * @example  getURLParameters('http://url.com/page?param_1=Hello&param_2=World');
 * @returns  Object { param_1: 'Hello', param_2: 'World' }
 */

const getURLParameters = (url) => (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce((a, v) => ((a[v.slice(0, v.indexOf("="))] = v.slice(v.indexOf("=") + 1)), a), {});
/**
 * Biến tất cả các control trong form thành Object
 *
 * @example formToObject(document.querySelector('#form'));
 * @param {*} form
 * @returns Object
 */
const formToObject = (form) =>
  Array.from(new FormData(form)).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: value,
    }),
    {}
  );
/**
 * Biến tất cả các control trong form thành Query string
 * @param {*} form
 */
const serializeForm = (form) => Array.from(new FormData(form), (field) => field.map(encodeURIComponent).join("=")).join("&");
/**
 * Chuyển Object thành Query string
 * @param {*} queryParameters
 */
const objectToQueryString = (queryParameters) => {
  return queryParameters
    ? Object.entries(queryParameters).reduce((queryString, [key, val], index) => {
        const symbol = queryString.length === 0 ? "?" : "&";
        queryString += typeof val === "string" ? `${symbol}${key}=${val}` : "";
        return queryString;
      }, "")
    : "";
};
/**
 * Delay(Gọi hàm sau n giây) bất đồng bộ
 * @example delay(2000).then(()=>console.log('Hi!'));
 */
// const delay = promisify((d, cb) => setTimeout(cb, d));
// const promisify = func => (...args) =>
//     new Promise((resolve, reject) =>
//         func(...args, (err, result) => (err ? reject(err) : resolve(result)))
//     );
/**
 * Đếm số ngày
 * @param {*} startDate Ngày bắt đầu
 * @param {*} endDate Ngày kết thúc
 */
const countDate = (startDate, endDate) => (startDate - endDate) / (1000 * 3600 * 24);
/**
 * Kiểm tra xem tab của trình duyệt có đang được Focus hay không
 */
const checkIsTabFocus = () => !document.hidden;
/**
 * Trả về số lượng phần tử hoặc số ký tự của một chuỗi.
 * @example getSizeOfParam('abc'); hoặc getSizeOfParam(array);
 * @param {*} val
 */
const getSizeOfParam = (val) => (Array.isArray(val) ? val.length : val && typeof val === "object" ? val.size || val.length || Object.keys(val).length : typeof val === "string" ? new Blob([val]).size : 0);
/**
 *
 * @example dayOfYear(new Date()); // 272
 * @param {*} date Ngày muốn kiểm tra
 * @returns Trả về kết quả là số ngày thứ bao nhiêu của năm
 */
const dayOfYear = (date) => Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
/**
 * Tính giai thừa của số truyền vào
 * @param {*} n  Không được truyền số âm
 * @returns Int
 */

/**
 * Tạo 10 chuỗi số + chữ ngẫu nhiên
 */
const genRandomAlphaNum = () => {
  var rdmString = "";
  for (; rdmString.length < 10; rdmString += Math.random().toString(36).substr(2));
  return rdmString.substr(0, 10);
};
const HC_Repeat = (time = 30, element) => {
  var temp = time;
  setInterval(function () {
    $(element).html("Tải lại dữ liệu (" + time-- + "s)");
    if (time == -1) {
      time = temp;
    }
  }, 1000);
};
/**
 * Đọc số thành chữ (Vietnamese)
 */
const n2w = (function () {
  var t = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"],
    r = function (r, n) {
      var o = "",
        a = Math.floor(r / 10),
        e = r % 10;
      return a > 1 ? ((o = " " + t[a] + " mươi"), 1 == e && (o += " mốt")) : 1 == a ? ((o = " mười"), 1 == e && (o += " một")) : n && e > 0 && (o = " lẻ"), 5 == e && a >= 1 ? (o += " lăm") : 4 == e && a >= 1 ? (o += " tư") : (e > 1 || (1 == e && 0 == a)) && (o += " " + t[e]), o;
    },
    n = function (n, o) {
      var a = "",
        e = Math.floor(n / 100),
        n = n % 100;
      return o || e > 0 ? ((a = " " + t[e] + " trăm"), (a += r(n, !0))) : (a = r(n, !1)), a;
    },
    o = function (t, r) {
      var o = "",
        a = Math.floor(t / 1e6),
        t = t % 1e6;
      a > 0 && ((o = n(a, r) + " triệu"), (r = !0));
      var e = Math.floor(t / 1e3),
        t = t % 1e3;
      return e > 0 && ((o += n(e, r) + " ngàn"), (r = !0)), t > 0 && (o += n(t, r)), o;
    };
  return {
    doc: function (r) {
      if (0 == r) return t[0];
      var n = "",
        a = "";
      do (ty = r % 1e9), (r = Math.floor(r / 1e9)), (n = r > 0 ? o(ty, !0) + a + n : o(ty, !1) + a + n), (a = " tỷ");
      while (r > 0);
      return n.trim();
    },
  };
})();
/**
 * Hàm chuyển đổi số thành tiền
 * @param {*} num Số tiền muốn chuyển đổi
 */
const toVnd = (num) => {
  return n2w.doc(num);
};
/**
 * Hàm định dạng tiền theo locale và currency
 * @param {*} number 123
 * @param {*} currency á12
 * @param {*} locale ádas
 */
const addVnd = (number, currency = "VND", locale = "vi-VN") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(number);
};

function calculateColumn(index) {
  var total = 0;
  $("table tr").each(function () {
    var value = parseInt($("td", this).eq(2).text());
    if (!isNaN(value)) {
      total += value;
    }
  });
  $("table tfoot th").eq(1).text(secondsToDhms(total));
}
$("table thead th").each(function (i) {
  calculateColumn(i);
});

function secondsToDhms(seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor(seconds % 60);

  var dDisplay = d > 0 ? d + (d == 1 ? " ngày, " : " ngày, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " giờ, " : " giờ, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " phút, " : " phút, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " giây" : " giây") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
}

!(function (t, i) {
  "object" == typeof exports && "object" == typeof module ? (module.exports = i()) : "function" == typeof define && define.amd ? define("hoanchu", [], i) : "object" == typeof exports ? (exports.hoanchu = i()) : (t.hoanchu = i());
})(window, function () {
  return (function (t) {
    var i = {};
    function o(n) {
      if (i[n]) return i[n].exports;
      var e = (i[n] = { i: n, l: !1, exports: {} });
      return t[n].call(e.exports, e, e.exports, o), (e.l = !0), e.exports;
    }
    return (
      (o.m = t),
      (o.c = i),
      (o.d = function (t, i, n) {
        o.o(t, i) || Object.defineProperty(t, i, { enumerable: !0, get: n });
      }),
      (o.r = function (t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t, "__esModule", { value: !0 });
      }),
      (o.t = function (t, i) {
        if ((1 & i && (t = o(t)), 8 & i)) return t;
        if (4 & i && "object" == typeof t && t && t.__esModule) return t;
        var n = Object.create(null);
        if ((o.r(n), Object.defineProperty(n, "default", { enumerable: !0, value: t }), 2 & i && "string" != typeof t))
          for (var e in t)
            o.d(
              n,
              e,
              function (i) {
                return t[i];
              }.bind(null, e)
            );
        return n;
      }),
      (o.n = function (t) {
        var i =
          t && t.__esModule
            ? function () {
                return t.default;
              }
            : function () {
                return t;
              };
        return o.d(i, "a", i), i;
      }),
      (o.o = function (t, i) {
        return Object.prototype.hasOwnProperty.call(t, i);
      }),
      (o.p = ""),
      o((o.s = 7))
    );
  })([
    function (t, i, o) {
      "use strict";
      Object.defineProperty(i, "__esModule", { value: !0 }),
        (Number.isInteger =
          Number.isInteger ||
          function (t) {
            return "number" == typeof t && isFinite(t) && Math.floor(t) === t;
          });
      var n = (function () {
        function t(i, o) {
          if (((this.nodes = []), (this.pseudoSelector = ""), (this.callbacks = {}), o || (o = document), "string" == typeof i))
            if ("<" === i[0] && ">" === i[i.length - 1]) this.nodes = [t.createNode(i)];
            else {
              if (-1 !== i.search(/(:before|:after)$/gi)) {
                var n = i.match(/(:before|:after)$/gi);
                (i = i.split(n[0])[0]), (this.pseudoSelector = n[0]);
              }
              this.nodes = [].slice.call(o.querySelectorAll(i));
            }
          else i instanceof NodeList ? (this.nodes = i.length > 1 ? [].slice.call(i) : [i]) : (i instanceof HTMLDocument || i instanceof Window || i instanceof HTMLElement) && (this.nodes = [i]);
        }
        return (
          (t.select = function (i, o) {
            return new t(i, o);
          }),
          (t.create = function (i) {
            return new t(t.createNode(i));
          }),
          (t.prototype.attr = function (t, i) {
            return void 0 != i
              ? (this.each(this.nodes, function (o) {
                  o.setAttribute(t, i);
                }),
                this)
              : this.getLastNode().getAttribute(t);
          }),
          (t.prototype.append = function (i) {
            var o;
            return (
              (o = i instanceof t ? i.get() : i),
              this.each(this.nodes, function (t) {
                t.appendChild(o);
              }),
              this
            );
          }),
          (t.prototype.parent = function () {
            return new t(this.getLastNode().parentNode);
          }),
          (t.prototype.each = function (t, i) {
            t instanceof Function && ((i = t), (t = this.nodes));
            for (var o = 0; o < t.length; o++) i.call(this.nodes[o], this.nodes[o], o);
            return this;
          }),
          (t.prototype.hasClass = function (t) {
            return this.getLastNode().classList.contains(t);
          }),
          (t.prototype.addClass = function (t) {
            if (t) {
              var i = t.split(" ");
              this.each(this.nodes, function (t) {
                for (var o in i) t.classList.add(i[o]);
              });
            }
            return this;
          }),
          (t.prototype.removeClass = function (t) {
            var i = t.split(" ");
            return (
              this.each(this.nodes, function (t) {
                for (var o in i) t.classList.remove(i[o]);
              }),
              this
            );
          }),
          (t.prototype.find = function (i) {
            return new t(i, this.getLastNode());
          }),
          (t.prototype.trigger = function (t, i) {
            var o = new CustomEvent(t, { detail: i });
            return (
              this.each(this.nodes, function (t) {
                t.dispatchEvent(o);
              }),
              this
            );
          }),
          (t.prototype.text = function (t) {
            return (
              this.each(this.nodes, function (i) {
                i.innerText = t;
              }),
              this
            );
          }),
          (t.prototype.css = function (i, o) {
            if (void 0 === o) {
              var n = this.getLastNode(),
                e = null;
              if (((i = t.convertToJsProperty(i)), "function" != typeof n.getBoundingClientRect || this.pseudoSelector || (e = n.getBoundingClientRect()[i]), !e)) {
                var s = getComputedStyle(n, this.pseudoSelector)[i];
                s.search("px") && (e = parseInt(s, 10));
              }
              if (isNaN(e)) throw "Undefined css property: " + i;
              return e;
            }
            return (
              Number.isInteger(o) && (o += "px"),
              this.nodes.length > 1
                ? this.each(this.nodes, function (t) {
                    t.style[i] = o;
                  })
                : (this.nodes[0].style[i] = o),
              this
            );
          }),
          (t.prototype.on = function (t, i) {
            var o = this;
            return (
              this.each(this.nodes, function (n) {
                var e = function (t) {
                  i.call(n, t);
                };
                (o.callbacks[t] = e), n.addEventListener(t, e);
              }),
              this
            );
          }),
          (t.prototype.off = function (t) {
            var i = this.callbacks[t];
            return (
              this.each(this.nodes, function (o) {
                o.removeEventListener(t, i, !1);
              }),
              this
            );
          }),
          (t.prototype.val = function (t) {
            return void 0 === t
              ? this.getLastNode().value
              : (this.each(this.nodes, function (i) {
                  i.value = t;
                }),
                this);
          }),
          (t.prototype.is = function (t) {
            return this.getLastNode().tagName.toLowerCase() === t;
          }),
          (t.prototype.get = function (t) {
            return void 0 === t && (t = 0), this.nodes[t];
          }),
          (t.prototype.length = function () {
            return this.nodes.length;
          }),
          (t.prototype.hide = function () {
            return (
              this.each(this.nodes, function (i) {
                t.select(i).css("display", "none");
              }),
              this
            );
          }),
          (t.prototype.show = function () {
            return (
              this.each(this.nodes, function (i) {
                t.select(i).css("display", "");
              }),
              this
            );
          }),
          (t.prototype.empty = function () {
            return (
              this.each(this.nodes, function (i) {
                t.select(i).get().innerHTML = "";
              }),
              this
            );
          }),
          (t.prototype.html = function (t) {
            this.each(this.nodes, function (i) {
              i.innerHTML = t;
            });
          }),
          (t.prototype.remove = function () {
            this.each(this.nodes, function (t) {
              t.remove();
            });
          }),
          (t.prototype.insertBefore = function (t) {
            var i = this.resolveElement(t);
            return (
              this.each(this.nodes, function (t) {
                t.parentNode.insertBefore(i, i.previousSibling);
              }),
              this
            );
          }),
          (t.prototype.insertAfter = function (t) {
            var i = this.resolveElement(t);
            return (
              this.each(this.nodes, function (t) {
                t.parentNode.insertBefore(i, t.nextSibling);
              }),
              this
            );
          }),
          (t.prototype.resolveElement = function (i) {
            var o;
            return t.isHtml(i) ? (o = t.createNode(i)) : i instanceof HTMLElement ? (o = i) : i instanceof t && (o = i.get()), o;
          }),
          (t.prototype.closest = function (i) {
            return t.select(this.getLastNode().closest(i));
          }),
          (t.prototype.data = function (t) {
            return this.attr("data-" + t);
          }),
          (t.prototype.width = function (t) {
            return void 0 !== t ? (this.css("width", t), this) : this.getLastNode() === window ? parseInt(this.getLastNode().innerWidth, 10) : parseInt(this.css("width"), 10);
          }),
          (t.prototype.height = function (t) {
            return void 0 !== t ? (this.css("height", t), this) : this.getLastNode() === window ? parseInt(this.getLastNode().innerHeight, 10) : parseInt(this.css("height"), 10);
          }),
          (t.prototype.position = function () {
            return { top: Number(this.getLastNode().getBoundingClientRect().top), bottom: Number(this.getLastNode().getBoundingClientRect().bottom), left: Number(this.getLastNode().getBoundingClientRect().left), right: Number(this.getLastNode().getBoundingClientRect().right) };
          }),
          (t.prototype.offset = function () {
            return { top: Number(this.getLastNode().offsetTop), left: Number(this.getLastNode().offsetLeft) };
          }),
          (t.createNode = function (t) {
            if ("<" === t[0] && ">" === t[t.length - 1]) {
              var i = document.createElement("div");
              return (i.innerHTML = t), i.firstChild;
            }
            return document.createElement(t);
          }),
          (t.isHtml = function (t) {
            return "<" === t[0] && ">" === t[t.length - 1];
          }),
          (t.convertToJsProperty = function (t) {
            return (t =
              (t = (t = t.toLowerCase().replace("-", " ")).replace(/(^| )(\w)/g, function (t) {
                return t.toUpperCase();
              }))
                .charAt(0)
                .toLowerCase() + t.slice(1)).replace(" ", "");
          }),
          (t.prototype.getLastNode = function () {
            return this.nodes[this.nodes.length - 1];
          }),
          t
        );
      })();
      i.default = n;
    },
    function (t, i, o) {
      "use strict";
      Object.defineProperty(i, "__esModule", { value: !0 });
      var n = o(0),
        e = (function () {
          function t(t, i) {
            (this.notification = t), (this.margin = i);
          }
          return (
            (t.prototype.calculate = function () {
              var i = this,
                o = this.margin;
              n.default.select(".growl-notification.position-" + t.position).each(function (t) {
                n.default.select(t).css("top", o).css("right", i.margin), (o += n.default.select(t).height() + i.margin);
              });
            }),
            (t.prototype.instances = function () {
              var i = [];
              return (
                n.default.select(".growl-notification.position-" + t.position).each(function (t) {
                  i.push(n.default.select(t));
                }),
                i
              );
            }),
            (t.position = "top-right"),
            t
          );
        })();
      i.TopRightPosition = e;
    },
    function (t, i, o) {
      "use strict";
      Object.defineProperty(i, "__esModule", { value: !0 });
      var n = o(0),
        e = (function () {
          function t(t, i) {
            (this.notification = t), (this.margin = i);
          }
          return (
            (t.prototype.calculate = function () {
              var i = this,
                o = this.margin;
              n.default.select(".growl-notification.position-" + t.position).each(function (t) {
                var e = n.default.select(t);
                e.css("top", o).css("left", "calc(50% - " + Math.ceil(e.width() / 2) + "px)"), (o += e.height() + i.margin);
              });
            }),
            (t.prototype.instances = function () {
              var i = [];
              return (
                n.default.select(".growl-notification.position-" + t.position).each(function (t) {
                  i.push(n.default.select(t));
                }),
                i
              );
            }),
            (t.position = "top-center"),
            t
          );
        })();
      i.TopCenterPosition = e;
    },
    function (t, i, o) {
      "use strict";
      Object.defineProperty(i, "__esModule", { value: !0 });
      var n = o(0),
        e = (function () {
          function t(t, i) {
            (this.notification = t), (this.margin = i);
          }
          return (
            (t.prototype.calculate = function () {
              var i = this,
                o = this.margin;
              n.default.select(".growl-notification.position-" + t.position).each(function (t) {
                var e = n.default.select(t);
                e.css("bottom", o).css("right", i.margin), (o += e.height() + i.margin);
              });
            }),
            (t.prototype.instances = function () {
              var i = [];
              return (
                n.default.select(".growl-notification.position-" + t.position).each(function (t) {
                  i.push(n.default.select(t));
                }),
                i
              );
            }),
            (t.position = "bottom-right"),
            t
          );
        })();
      i.BottomRightPosition = e;
    },
    function (t, i, o) {
      "use strict";
      Object.defineProperty(i, "__esModule", { value: !0 });
      var n = o(0),
        e = (function () {
          function t(t, i) {
            (this.notification = t), (this.margin = i);
          }
          return (
            (t.prototype.calculate = function () {
              var i = this,
                o = this.margin;
              n.default.select(".growl-notification.position-" + t.position).each(function (t) {
                var e = n.default.select(t);
                e.css("top", o).css("left", i.margin), (o += e.height() + i.margin);
              });
            }),
            (t.prototype.instances = function () {
              var i = [];
              return (
                n.default.select(".growl-notification.position-" + t.position).each(function (t) {
                  i.push(n.default.select(t));
                }),
                i
              );
            }),
            (t.position = "top-left"),
            t
          );
        })();
      i.TopLeftPosition = e;
    },
    function (t, i, o) {
      "use strict";
      Object.defineProperty(i, "__esModule", { value: !0 });
      var n = o(0),
        e = (function () {
          function t(t, i) {
            (this.notification = t), (this.margin = i);
          }
          return (
            (t.prototype.calculate = function () {
              var i = this,
                o = this.margin;
              n.default.select(".growl-notification.position-" + t.position).each(function (t) {
                var e = n.default.select(t);
                e.css("bottom", o).css("left", "calc(50% - " + Math.ceil(e.width() / 2) + "px)"), (o += e.height() + i.margin);
              });
            }),
            (t.prototype.instances = function () {
              var i = [];
              return (
                n.default.select(".growl-notification.position-" + t.position).each(function (t) {
                  i.push(n.default.select(t));
                }),
                i
              );
            }),
            (t.position = "bottom-center"),
            t
          );
        })();
      i.BottomCenterPosition = e;
    },
    function (t, i, o) {
      "use strict";
      Object.defineProperty(i, "__esModule", { value: !0 });
      var n = o(0),
        e = (function () {
          function t(t, i) {
            (this.notification = t), (this.margin = i);
          }
          return (
            (t.prototype.calculate = function () {
              var i = this,
                o = this.margin;
              n.default.select(".growl-notification.position-" + t.position).each(function (t) {
                var e = n.default.select(t);
                e.css("bottom", o).css("left", i.margin), (o += e.height() + i.margin);
              });
            }),
            (t.prototype.instances = function () {
              var i = [];
              return (
                n.default.select(".growl-notification.position-" + t.position).each(function (t) {
                  i.push(n.default.select(t));
                }),
                i
              );
            }),
            (t.position = "bottom-left"),
            t
          );
        })();
      i.BottomLeftPosition = e;
    },
    function (t, i, o) {
      "use strict";
      o(10), o(15), o(17);
      var n = o(8),
        e = o(9),
        s = o(0),
        r = o(2),
        c = o(1),
        a = o(4),
        u = o(5),
        l = o(6),
        f = o(3),
        p = (function () {
          function t(i) {
            void 0 === i && (i = {}), (this.options = e.all([t.defaultOptions, t.globalOptions, i])), (this.options.animation.close && "none" != this.options.animation.close) || (this.options.animationDuration = 0), (this.notification = s.default.create("div")), (this.body = s.default.select("body")), (this.template = t.template), (this.position = n.PositionFactory.newInstance(this.options.position, this.notification, this.options.margin)), t.instances.push(this);
          }
          return (
            Object.defineProperty(t, "defaultOptions", {
              get: function () {
                return { margin: 20, type: "default", title: "", description: "", image: { visible: !1, customImage: "" }, closeTimeout: 0, closeWith: ["click", "button"], animation: { open: "slide-in", close: "slide-out" }, animationDuration: 0.2, position: "top-right", showBorder: !1, showButtons: !1, buttons: { action: { text: "Ok", callback: function () {} }, cancel: { text: "Cancel", callback: function () {} } }, showProgress: !1 };
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t, "template", {
              get: function () {
                return '<span class="growl-notification__close">\n                  <span class="growl-notification__close-icon"></span>\n                </span>\n                <div class="growl-notification__progress">\n                    <div class="growl-notification__progress-bar"></div>\n                </div>\n               <div class="growl-notification__body">\n                 {{ image }}\n                 <div class="growl-notification__content">\n                   <div class="growl-notification__title">{{ title }}</div>\n                   <div class="growl-notification__desc">{{ description }}</div>\n                 </div>\n                </div>\n                <div class="growl-notification__buttons">\n                    <span class="growl-notification__button growl-notification__button--action">Ok</span>\n                    <span class="growl-notification__button growl-notification__button--cancel">Cancel</span>\n                </div>';
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.showToast = function (i) {
              void 0 === i && (i = {});
              var o = new t(i).show(),
                n = 0,
                e = [];
              return (
                o.position.instances().forEach(function (i) {
                  t.hasOverflow(o, n) && (e.push(i), (n += i.height() + o.options.margin));
                }),
                e.forEach(function (t) {
                  t.remove();
                }),
                o.position.calculate(),
                o
              );
            }),
            (t.hasOverflow = function (t, i) {
              void 0 === i && (i = 0);
              var o = !1,
                n = s.default.select(window).height();
              return t.position instanceof r.TopCenterPosition || t.position instanceof c.TopRightPosition || t.position instanceof a.TopLeftPosition ? t.getContent().offset().top + t.getContent().height() + t.options.margin - i >= n && (o = !0) : (t.position instanceof u.BottomCenterPosition || t.position instanceof f.BottomRightPosition || t.position instanceof l.BottomLeftPosition) && t.getContent().offset().top + i <= 0 && (o = !0), o;
            }),
            (t.closeAll = function () {
              (t.instances = []),
                s.default.select(".growl-notification").each(function (t) {
                  s.default.select(t).remove();
                });
            }),
            (t.prototype.show = function () {
              return this.addNotification(), this.initPosition(), this.bindEvents(), this;
            }),
            (t.prototype.close = function () {
              var t = this;
              this.notification
                .removeClass("animation-" + this.options.animation.open)
                .addClass("animation-" + this.options.animation.close)
                .addClass("growl-notification--closed"),
                setTimeout(function () {
                  t.remove(), t.position.calculate();
                }, 1e3 * this.options.animationDuration);
            }),
            (t.prototype.remove = function () {
              var i = t.instances.indexOf(this);
              return t.instances.splice(i, 1), this.notification.remove(), this;
            }),
            (t.prototype.getContent = function () {
              return this.notification;
            }),
            (t.prototype.addNotification = function () {
              var t = this.options,
                i = this.template.replace("{{ title }}", t.title);
              (i = i.replace("{{ description }}", t.description)),
                (i = this.options.image.visible ? (this.options.image.customImage ? i.replace("{{ image }}", '<div class="growl-notification__image growl-notification__image--custom"><img src="' + this.options.image.customImage + '" alt=""></div>') : i.replace("{{ image }}", '<div class="growl-notification__image"></div>')) : i.replace("{{ image }}", "")),
                this.notification
                  .addClass("growl-notification")
                  .addClass("growl-notification--" + t.type)
                  .addClass(t.template)
                  .addClass("animation-" + t.animation.open)
                  .addClass("position-" + t.position),
                t.image && this.notification.addClass("growl-notification--image"),
                this.notification.html(i),
                t.title || this.notification.find(".growl-notification__title").remove(),
                t.width && this.notification.width(t.width),
                t.zIndex && this.notification.css("z-index", t.zIndex),
                t.showProgress && t.closeTimeout > 0 && (this.notification.find(".growl-notification__progress").addClass("is-visible"), this.notification.addClass("has-progress")),
                t.showButtons && (this.notification.find(".growl-notification__buttons").addClass("is-visible"), this.notification.find(".growl-notification__button--action").text(t.buttons.action.text), this.notification.find(".growl-notification__button--cancel").text(t.buttons.cancel.text)),
                this.body.append(this.notification),
                t.showProgress && t.closeTimeout > 0 && this.calculateProgress();
            }),
            (t.prototype.initPosition = function () {
              this.position.calculate();
            }),
            (t.prototype.calculateProgress = function () {
              var t = this,
                i = Math.ceil(Number(this.options.closeTimeout) / 100),
                o = 1,
                n = setInterval(function () {
                  o >= 100 ? clearInterval(n) : (t.notification.find(".growl-notification__progress-bar").css("width", o + "%"), o++);
                }, i);
            }),
            (t.prototype.bindEvents = function () {
              var t = this;
              if (this.options.closeWith.indexOf("click") > -1)
                this.notification.addClass("growl-notification--close-on-click").on("click", function () {
                  return t.close();
                });
              else if (this.options.closeWith.indexOf("button") > -1) {
                this.notification.find(".growl-notification__close").on("click", function () {
                  return t.close();
                });
              }
              this.options.showButtons &&
                (this.notification.find(".growl-notification__button--action").on("click", function (i) {
                  t.options.buttons.action.callback.apply(t), t.close(), i.stopPropagation();
                }),
                this.notification.find(".growl-notification__button--cancel").on("click", function (i) {
                  t.options.buttons.cancel.callback.apply(t), t.close(), i.stopPropagation();
                }));
              this.options.closeTimeout &&
                this.options.closeTimeout > 0 &&
                setTimeout(function () {
                  return t.close();
                }, this.options.closeTimeout);
            }),
            (t.setGlobalOptions = function (i) {
              t.globalOptions = i;
            }),
            (t.globalOptions = {}),
            (t.instances = []),
            t
          );
        })();
      t.exports = p;
    },
    function (t, i, o) {
      "use strict";
      Object.defineProperty(i, "__esModule", { value: !0 });
      var n = o(1),
        e = o(2),
        s = o(3),
        r = o(4),
        c = o(5),
        a = o(6),
        u = (function () {
          function t() {}
          return (
            (t.newInstance = function (t, i, o) {
              var u = null;
              return t === n.TopRightPosition.position ? (u = n.TopRightPosition) : t === e.TopCenterPosition.position ? (u = e.TopCenterPosition) : t === s.BottomRightPosition.position ? (u = s.BottomRightPosition) : t === r.TopLeftPosition.position ? (u = r.TopLeftPosition) : t === c.BottomCenterPosition.position ? (u = c.BottomCenterPosition) : t === a.BottomLeftPosition.position && (u = a.BottomLeftPosition), new u(i, o);
            }),
            t
          );
        })();
      i.PositionFactory = u;
    },
    function (t, i, o) {
      t.exports = (function () {
        "use strict";
        var t = function (t) {
            return (
              (function (t) {
                return !!t && "object" == typeof t;
              })(t) &&
              !(function (t) {
                var o = Object.prototype.toString.call(t);
                return (
                  "[object RegExp]" === o ||
                  "[object Date]" === o ||
                  (function (t) {
                    return t.$$typeof === i;
                  })(t)
                );
              })(t)
            );
          },
          i = "function" == typeof Symbol && Symbol.for ? Symbol.for("react.element") : 60103;
        function o(t, i) {
          return !1 !== i.clone && i.isMergeableObject(t)
            ? e(
                (function (t) {
                  return Array.isArray(t) ? [] : {};
                })(t),
                t,
                i
              )
            : t;
        }
        function n(t, i, n) {
          return t.concat(i).map(function (t) {
            return o(t, n);
          });
        }
        function e(i, s, r) {
          ((r = r || {}).arrayMerge = r.arrayMerge || n), (r.isMergeableObject = r.isMergeableObject || t);
          var c = Array.isArray(s),
            a = Array.isArray(i),
            u = c === a;
          return u
            ? c
              ? r.arrayMerge(i, s, r)
              : (function (t, i, n) {
                  var s = {};
                  return (
                    n.isMergeableObject(t) &&
                      Object.keys(t).forEach(function (i) {
                        s[i] = o(t[i], n);
                      }),
                    Object.keys(i).forEach(function (r) {
                      n.isMergeableObject(i[r]) && t[r] ? (s[r] = e(t[r], i[r], n)) : (s[r] = o(i[r], n));
                    }),
                    s
                  );
                })(i, s, r)
            : o(s, r);
        }
        return (
          (e.all = function (t, i) {
            if (!Array.isArray(t)) throw new Error("first argument should be an array");
            return t.reduce(function (t, o) {
              return e(t, o, i);
            }, {});
          }),
          e
        );
      })();
    },
    function (t, i) {},
    ,
    ,
    ,
    ,
    function (t, i) {},
    ,
    function (t, i) {},
  ]);
});
hoanchu.setGlobalOptions({ buttons: { action: { text: "Apply" }, cancel: { text: "Dismiss" } } });
function getDefaultOptions() {
  var animation = "none"; /*slide, fade*/
  var animationOptions = {
    open: animation + "-in",
    close: animation + "-out",
  };
  if (animation === "none") {
    animationOptions = {
      open: false,
      close: false,
    };
  }
  return (options = {
    title: "Default title",
    type: "default",
    image: { visible: true },
    description: "Default description",
    position: "top-right",
    closeTimeout: 0,
    closeWith: ["click"],
    animation: animationOptions,
    showButtons: true,
    template: "light",
    buttons: {
      action: {
        callback: function (notification) {
          console.log("action button");
        },
      },
    },
    showProgress: true,
  });
}
function addCssToDocument(css) {
  var style = document.createElement("style");
  style.innerText = css;
  style.id = "hc-toast-style";
  document.head.appendChild(style);
  document.write();
}
let hcStyle =
  " @font-face {font-family: 'Open Sans';font-style: normal;font-weight: 400;src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v18/mem8YaGs126MiZpBA-UFWJ0bbck.woff2) format('woff2');unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;}@font-face {font-family: 'Open Sans';font-style: normal;font-weight: 400;src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v18/mem8YaGs126MiZpBA-UFUZ0bbck.woff2) format('woff2');unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;}@font-face {font-family: 'Open Sans';font-style: normal;font-weight: 400;src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v18/mem8YaGs126MiZpBA-UFWZ0bbck.woff2) format('woff2');unicode-range: U+1F00-1FFF;}@font-face {font-family: 'Open Sans';font-style: normal;font-weight: 400;src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v18/mem8YaGs126MiZpBA-UFVp0bbck.woff2) format('woff2');unicode-range: U+0370-03FF;}@font-face {font-family: 'Open Sans';font-style: normal;font-weight: 400;src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v18/mem8YaGs126MiZpBA-UFWp0bbck.woff2) format('woff2');unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;}@font-face {font-family: 'Open Sans';font-style: normal;font-weight: 400;src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v18/mem8YaGs126MiZpBA-UFW50bbck.woff2) format('woff2');unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;}@font-face {font-family: 'Open Sans';font-style: normal;font-weight: 400;src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v18/mem8YaGs126MiZpBA-UFVZ0b.woff2) format('woff2');unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;}@font-face {font-family: 'Open Sans';font-style: normal;font-weight: 600;src: local('Open Sans SemiBold'), local('OpenSans-SemiBold'), url(https://fonts.gstatic.com/s/opensans/v18/mem5YaGs126MiZpBA-UNirkOX-hpOqc.woff2) format('woff2');unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;}@font-face {font-family: 'Open Sans';font-style: normal;font-weight: 600;src: local('Open Sans SemiBold'), local('OpenSans-SemiBold'), url(https://fonts.gstatic.com/s/opensans/v18/mem5YaGs126MiZpBA-UNirkOVuhpOqc.woff2) format('woff2');unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;}@font-face {font-family: 'Open Sans';font-style: normal;font-weight: 600;src: local('Open Sans SemiBold'), local('OpenSans-SemiBold'), url(https://fonts.gstatic.com/s/opensans/v18/mem5YaGs126MiZpBA-UNirkOXuhpOqc.woff2) format('woff2');unicode-range: U+1F00-1FFF;}@font-face {font-family: 'Open Sans';font-style: normal;font-weight: 600;src: local('Open Sans SemiBold'), local('OpenSans-SemiBold'), url(https://fonts.gstatic.com/s/opensans/v18/mem5YaGs126MiZpBA-UNirkOUehpOqc.woff2) format('woff2');unicode-range: U+0370-03FF;}@font-face {font-family: 'Open Sans';font-style: normal;font-weight: 600;src: local('Open Sans SemiBold'), local('OpenSans-SemiBold'), url(https://fonts.gstatic.com/s/opensans/v18/mem5YaGs126MiZpBA-UNirkOXehpOqc.woff2) format('woff2');unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;}@font-face {font-family: 'Open Sans';font-style: normal;font-weight: 600;src: local('Open Sans SemiBold'), local('OpenSans-SemiBold'), url(https://fonts.gstatic.com/s/opensans/v18/mem5YaGs126MiZpBA-UNirkOXOhpOqc.woff2) format('woff2');unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;}@font-face {font-family: 'Open Sans';font-style: normal;font-weight: 600;src: local('Open Sans SemiBold'), local('OpenSans-SemiBold'), url(https://fonts.gstatic.com/s/opensans/v18/mem5YaGs126MiZpBA-UNirkOUuhp.woff2) format('woff2');unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;}.dark.growl-notification{background:#363636}.dark .growl-notification__buttons{border-top:1px solid hsla(0,0%,100%,.1)}.dark .growl-notification__button{color:#000}.dark .growl-notification__button:hover{background:hsla(0,0%,100%,.05);color:#fff}.dark .growl-notification__button--cancel,.growl-notification__button--cancel:hover{color:hsla(0,0%,100%,.6)}.dark .growl-notification__close-icon{filter: invert(1);background-image:url(assets/images/hc_info.png);background-repeat:no-repeat;background-size:100%;display:inline-flex;height:18px;opacity:.6;width:18px}.dark .growl-notification__close-icon:hover{opacity:.8}.dark .growl-notification__button+.growl-notification__button{border-left:1px solid hsla(0,0%,100%,.1)}.dark .growl-notification--closed{z-index:1055}.dark .growl-notification__title{color:#fff;font-size:18px;font-weight:600;margin-top:-2px}.dark .growl-notification__desc{color:#fff}.dark .growl-notification__title+.growl-notification__desc{color:hsla(0,0%,100%,.8)}.light.growl-notification{background:#fff}.light .growl-notification__buttons{border-top:1px solid rgba(0,0,0,.1)}.light .growl-notification__button{color:#000}.light .growl-notification__button:hover{background:rgba(0,0,0,.02);color:#000}.light .growl-notification__button--cancel,.light.growl-notification__button--cancel:hover{color:#ff0048}.light .growl-notification__button+.growl-notification__button{border-left:1px solid rgba(0,0,0,.1)}.light .growl-notification__close-icon{background-image:url(assets/images/hc_error.png)}.light .growl-notification__close-icon:hover{opacity:.6}.light .growl-notification--closed{z-index:1055}.light .growl-notification__title{color:#000;font-size:18px;font-weight:600;margin-top:-2px}.light .growl-notification__desc{color:#000}.light .growl-notification__title+.growl-notification__desc{color:rgba(0,0,0,.6)}.light .growl-notification__desc,.light .growl-notification__title{color:#000}body{font-family:'Open Sans'}.growl-notification{border-radius:4px;box-shadow:0 0 30px 0 rgba(0,0,0,.1);min-height:56px;position:fixed;width:320px;z-index:1056}.growl-notification:before{border-radius:4px 0 0 4px;bottom:0;content:'';left:0;position:absolute;top:0;width:4px}.growl-notification__progress{border-radius:4px 4px 0 0;display:none;height:4px}.growl-notification__progress.is-visible{display:flex}.growl-notification__progress-bar{border-radius:4px 4px 0 0;height:4px;width:0}.growl-notification__body{align-items:center;display:flex;min-height:56px;padding:13px 25px}.growl-notification__buttons{display:none}.growl-notification__buttons.is-visible{display:flex}.growl-notification__button{align-items:center;display:flex;flex-grow:1;font-size:14px;font-weight:600;justify-content:center;min-height:39px;min-width:50%;text-align:center}.growl-notification__button:hover{text-decoration:none}.growl-notification__close{cursor:pointer;font-size:12px;line-height:12px;position:absolute;right:8px;top:8px;transition:color .1s}.growl-notification__close-icon{background-repeat:no-repeat;background-size:100%;display:inline-flex;height:18px;width:18px}.growl-notification--closed{z-index:1055}.growl-notification__title{font-size:18px;font-weight:600;margin-top:-2px}.growl-notification--close-on-click{cursor:pointer}.growl-notification--default:before{background:#b2b2b2}.growl-notification--default .growl-notification__progress{background:hsla(0,0%,69.8%,.15)}.growl-notification--default .growl-notification__progress-bar{background:hsla(0,0%,69.8%,.3)}.growl-notification--info:before{background:#269af1}.growl-notification--info .growl-notification__progress{background:rgba(38,154,241,.15)}.growl-notification--info .growl-notification__progress-bar{background:rgba(38,154,241,.3)}.growl-notification--success:before{background:#8bc34a}.growl-notification--success .growl-notification__progress{background:rgba(139,195,74,.15)}.growl-notification--success .growl-notification__progress-bar{background:rgba(139,195,74,.3)}.growl-notification--warning:before{background:#ffc107}.growl-notification--warning .growl-notification__progress{background:rgba(255,193,7,.15)}.growl-notification--warning .growl-notification__progress-bar{background:rgba(255,193,7,.3)}.growl-notification--danger:before,.growl-notification--error:before{background:#ff3d00}.growl-notification--danger .growl-notification__progress,.growl-notification--error .growl-notification__progress{background:rgba(255,61,0,.15)}.growl-notification--danger .growl-notification__progress-bar,.growl-notification--error .growl-notification__progress-bar{background:rgba(255,61,0,.3)}.growl-notification--image{width:88%}.growl-notification__image{background-position:50%;background-repeat:no-repeat;height:46px;margin-right:17px;min-width:40px}.growl-notification__image--custom{background:0 0!important;height:auto}.growl-notification--default .growl-notification__image{background-image:url(assets/images/hc_noti.png)}.growl-notification--info .growl-notification__image{background-image:url(assets/images/hc_info.png)}.growl-notification--success .growl-notification__image{background-image:url(assets/images/hc_success.png)}.growl-notification--warning .growl-notification__image{background-image:url(assets/images/hc_warning.png)}.growl-notification--danger .growl-notification__image,.growl-notification--error .growl-notification__image{background-image:url(assets/images/hc_error.png);background-size:90%}.growl-notification.position-bottom-right.animation-slide-in,.growl-notification.position-top-right.animation-slide-in{animation:position-right-slide-in .2s forwards;transform:translateX(100%)}.growl-notification.position-bottom-right.animation-slide-out,.growl-notification.position-top-right.animation-slide-out{animation:position-right-slide-out .2s forwards;margin-right:-20px;transform:translateX(0)}.growl-notification.position-top-center.animation-slide-in{animation:position-top-slide-in .2s forwards;transform:translateY(-100%)}.growl-notification.position-top-center.animation-slide-out{animation:position-top-slide-out .2s forwards;margin-top:-20px;transform:translateY(0)}.growl-notification.position-bottom-center.animation-slide-in{animation:position-bottom-slide-in .2s forwards;transform:translateY(100%)}.growl-notification.position-bottom-center.animation-slide-out{animation:position-bottom-slide-out .2s forwards;margin-bottom:-20px;transform:translateY(0)}.growl-notification.position-bottom-left.animation-slide-in,.growl-notification.position-top-left.animation-slide-in{animation:position-left-slide-in .2s forwards;transform:translateX(-100%)}.growl-notification.position-bottom-left.animation-slide-out,.growl-notification.position-top-left.animation-slide-out{animation:position-left-slide-out .2s forwards;margin-left:-20px;transform:translateX(0)}.growl-notification.position-top-center,.growl-notification.position-top-left,.growl-notification.position-top-right{transition:top .2s}.growl-notification.position-bottom-center,.growl-notification.position-bottom-left,.growl-notification.position-bottom-right{transition:bottom .2s}.growl-notification.animation-fade-in{animation:fade-in .2s forwards;opacity:0}.growl-notification.animation-fade-out{animation:fade-out .2s forwards}@keyframes position-right-slide-in{to{transform:translateX(0)}}@keyframes position-right-slide-out{to{transform:translateX(100%)}}@keyframes position-left-slide-in{to{transform:translateX(0)}}@keyframes position-left-slide-out{to{transform:translateX(-100%)}}@keyframes position-top-slide-in{to{transform:translateY(0)}}@keyframes position-top-slide-out{to{transform:translateY(-100%)}}@keyframes position-bottom-slide-in{to{transform:translateY(0)}}@keyframes position-bottom-slide-out{to{transform:translateY(100%)}}@keyframes fade-in{to{opacity:1}}@keyframes fade-out{to{opacity:0}}@keyframes yoyo {from { transform: rotate(  0deg); }to   { transform: rotate(360deg); }}.growl-notification__image{animation-duration: .3s;animation-iteration-count: 1;animation-name: yoyo;animation-timing-function: linear;}.growl-notification__desc{word-break: break-all;}";
addCssToDocument(hcStyle);

function hcShowToast(title = "Default title", description = "Default description", type = "default", closeTimeout = 3000, template = "dark", showButtons = false) {
  var options = getDefaultOptions();
  options.title = title;
  options.description = description;
  options.type = type;
  options.template = template;
  options.closeTimeout = closeTimeout;
  options.showButtons = showButtons;
  hoanchu.showToast(options);
}
function hcTimeSrtToSecond(srt) {
  if (srt == "") {
    return;
  }
  var arr = srt.split(":");
  var hours = arr[0];
  var minutes = arr[1];
  var seconds = arr[2].replace(",", ".");
  return parseFloat(hours) * 60 * 60 + parseFloat(minutes) * 60 + parseFloat(seconds);
}
function hcEncodeHTML(str) {
  str = str.replace(/¢/g, "&cent;");
  str = str.replace(/¥/g, "&yen;");
  str = str.replace(/£/g, "&pound;");
  str = str.replace(/€/g, "&euro;");
  str = str.replace(/©/g, "&copy;");
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

function hcSecondToTimeSrt(seconds) {
  return [parseInt(seconds / 60 / 60), parseInt((seconds / 60) % 60), parseInt(seconds % 60)].join(":").replace(/\b(\d)\b/g, "0$1");
}

function fromNow(date, nowDate = Date.now(), rft = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" })) {
  const SECOND = 1000;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  const WEEK = 7 * DAY;
  const MONTH = 30 * DAY;
  const YEAR = 365 * DAY;
  const intervals = [
    { ge: YEAR, divisor: YEAR, unit: "year" },
    { ge: MONTH, divisor: MONTH, unit: "month" },
    { ge: WEEK, divisor: WEEK, unit: "week" },
    { ge: DAY, divisor: DAY, unit: "day" },
    { ge: HOUR, divisor: HOUR, unit: "hour" },
    { ge: MINUTE, divisor: MINUTE, unit: "minute" },
    { ge: 30 * SECOND, divisor: SECOND, unit: "seconds" },
    { ge: 0, divisor: 1, text: "just now" },
  ];
  const now = typeof nowDate === "object" ? nowDate.getTime() : new Date(nowDate).getTime();
  const diff = now - (typeof date === "object" ? date : new Date(date)).getTime();
  const diffAbs = Math.abs(diff);
  for (const interval of intervals) {
    if (diffAbs >= interval.ge) {
      const x = Math.round(Math.abs(diff) / interval.divisor);
      const isFuture = diff < 0;
      return interval.unit ? rft.format(isFuture ? x : -x, interval.unit) : interval.text;
    }
  }
}