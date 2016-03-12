/*!
 * Bootstrap.js by @fat & @mdo
 * Copyright 2012 Twitter, Inc.
 * http://www.apache.org/licenses/LICENSE-2.0.txt
 */
!
function(e) {
	"use strict";
	e(function() {
		e.support.transition = function() {
			var e = function() {
					var e = document.createElement("bootstrap"),
						t = {
							WebkitTransition: "webkitTransitionEnd",
							MozTransition: "transitionend",
							OTransition: "oTransitionEnd otransitionend",
							transition: "transitionend"
						},
						n;
					for (n in t) if (e.style[n] !== undefined) return t[n]
				}();
			return e && {
				end: e
			}
		}()
	})
}(window.jQuery), !
function(e) {
	"use strict";
	var t = '[data-dismiss="alert"]',
		n = function(n) {
			e(n).on("click", t, this.close)
		};
	n.prototype.close = function(t) {
		function s() {
			i.trigger("closed").remove()
		}
		var n = e(this),
			r = n.attr("data-target"),
			i;
		r || (r = n.attr("href"), r = r && r.replace(/.*(?=#[^\s]*$)/, "")), i = e(r), t && t.preventDefault(), i.length || (i = n.hasClass("alert") ? n : n.parent()), i.trigger(t = e.Event("close"));
		if (t.isDefaultPrevented()) return;
		i.removeClass("in"), e.support.transition && i.hasClass("fade") ? i.on(e.support.transition.end, s) : s()
	};
	var r = e.fn.alert;
	e.fn.alert = function(t) {
		return this.each(function() {
			var r = e(this),
				i = r.data("alert");
			i || r.data("alert", i = new n(this)), typeof t == "string" && i[t].call(r)
		})
	}, e.fn.alert.Constructor = n, e.fn.alert.noConflict = function() {
		return e.fn.alert = r, this
	}, e(document).on("click.alert.data-api", t, n.prototype.close)
}(window.jQuery), !
function(e) {
	"use strict";
	var t = function(t, n) {
			this.$element = e(t), this.options = e.extend({}, e.fn.button.defaults, n)
		};
	t.prototype.setState = function(e) {
		var t = "disabled",
			n = this.$element,
			r = n.data(),
			i = n.is("input") ? "val" : "html";
		e += "Text", r.resetText || n.data("resetText", n[i]()), n[i](r[e] || this.options[e]), setTimeout(function() {
			e == "loadingText" ? n.addClass(t).attr(t, t) : n.removeClass(t).removeAttr(t)
		}, 0)
	}, t.prototype.toggle = function() {
		var e = this.$element.closest('[data-toggle="buttons-radio"]');
		e && e.find(".active").removeClass("active"), this.$element.toggleClass("active")
	};
	var n = e.fn.button;
	e.fn.button = function(n) {
		return this.each(function() {
			var r = e(this),
				i = r.data("button"),
				s = typeof n == "object" && n;
			i || r.data("button", i = new t(this, s)), n == "toggle" ? i.toggle() : n && i.setState(n)
		})
	}, e.fn.button.defaults = {
		loadingText: "loading..."
	}, e.fn.button.Constructor = t, e.fn.button.noConflict = function() {
		return e.fn.button = n, this
	}, e(document).on("click.button.data-api", "[data-toggle^=button]", function(t) {
		var n = e(t.target);
		n.hasClass("btn") || (n = n.closest(".btn")), n.button("toggle")
	})
}(window.jQuery), !
function(e) {
	"use strict";
	var t = function(t, n) {
			this.$element = e(t), this.$indicators = this.$element.find(".carousel-indicators"), this.options = n, this.options.pause == "hover" && this.$element.on("mouseenter", e.proxy(this.pause, this)).on("mouseleave", e.proxy(this.cycle, this))
		};
	t.prototype = {
		cycle: function(t) {
			return t || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(e.proxy(this.next, this), this.options.interval)), this
		},
		getActiveIndex: function() {
			return this.$active = this.$element.find(".item.active"), this.$items = this.$active.parent().children(), this.$items.index(this.$active)
		},
		to: function(t) {
			var n = this.getActiveIndex(),
				r = this;
			if (t > this.$items.length - 1 || t < 0) return;
			return this.sliding ? this.$element.one("slid", function() {
				r.to(t)
			}) : n == t ? this.pause().cycle() : this.slide(t > n ? "next" : "prev", e(this.$items[t]))
		},
		pause: function(t) {
			return t || (this.paused = !0), this.$element.find(".next, .prev").length && e.support.transition.end && (this.$element.trigger(e.support.transition.end), this.cycle(!0)), clearInterval(this.interval), this.interval = null, this
		},
		next: function() {
			if (this.sliding) return;
			return this.slide("next")
		},
		prev: function() {
			if (this.sliding) return;
			return this.slide("prev")
		},
		slide: function(t, n) {
			var r = this.$element.find(".item.active"),
				i = n || r[t](),
				s = this.interval,
				o = t == "next" ? "left" : "right",
				u = t == "next" ? "first" : "last",
				a = this,
				f;
			this.sliding = !0, s && this.pause(), i = i.length ? i : this.$element.find(".item")[u](), f = e.Event("slide", {
				relatedTarget: i[0],
				direction: o
			});
			if (i.hasClass("active")) return;
			this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), this.$element.one("slid", function() {
				var t = e(a.$indicators.children()[a.getActiveIndex()]);
				t && t.addClass("active")
			}));
			if (e.support.transition && this.$element.hasClass("slide")) {
				this.$element.trigger(f);
				if (f.isDefaultPrevented()) return;
				i.addClass(t), i[0].offsetWidth, r.addClass(o), i.addClass(o), this.$element.one(e.support.transition.end, function() {
					i.removeClass([t, o].join(" ")).addClass("active"), r.removeClass(["active", o].join(" ")), a.sliding = !1, setTimeout(function() {
						a.$element.trigger("slid")
					}, 0)
				})
			} else {
				this.$element.trigger(f);
				if (f.isDefaultPrevented()) return;
				r.removeClass("active"), i.addClass("active"), this.sliding = !1, this.$element.trigger("slid")
			}
			return s && this.cycle(), this
		}
	};
	var n = e.fn.carousel;
	e.fn.carousel = function(n) {
		return this.each(function() {
			var r = e(this),
				i = r.data("carousel"),
				s = e.extend({}, e.fn.carousel.defaults, typeof n == "object" && n),
				o = typeof n == "string" ? n : s.slide;
			i || r.data("carousel", i = new t(this, s)), typeof n == "number" ? i.to(n) : o ? i[o]() : s.interval && i.pause().cycle()
		})
	}, e.fn.carousel.defaults = {
		interval: 5e3,
		pause: "hover"
	}, e.fn.carousel.Constructor = t, e.fn.carousel.noConflict = function() {
		return e.fn.carousel = n, this
	}, e(document).on("click.carousel.data-api", "[data-slide], [data-slide-to]", function(t) {
		var n = e(this),
			r, i = e(n.attr("data-target") || (r = n.attr("href")) && r.replace(/.*(?=#[^\s]+$)/, "")),
			s = e.extend({}, i.data(), n.data()),
			o;
		i.carousel(s), (o = n.attr("data-slide-to")) && i.data("carousel").pause().to(o).cycle(), t.preventDefault()
	})
}(window.jQuery), !
function(e) {
	"use strict";
	var t = function(t, n) {
			this.$element = e(t), this.options = e.extend({}, e.fn.collapse.defaults, n), this.options.parent && (this.$parent = e(this.options.parent)), this.options.toggle && this.toggle()
		};
	t.prototype = {
		constructor: t,
		dimension: function() {
			var e = this.$element.hasClass("width");
			return e ? "width" : "height"
		},
		show: function() {
			var t, n, r, i;
			if (this.transitioning || this.$element.hasClass("in")) return;
			t = this.dimension(), n = e.camelCase(["scroll", t].join("-")), r = this.$parent && this.$parent.find("> .accordion-group > .in");
			if (r && r.length) {
				i = r.data("collapse");
				if (i && i.transitioning) return;
				r.collapse("hide"), i || r.data("collapse", null)
			}
			this.$element[t](0), this.transition("addClass", e.Event("show"), "shown"), e.support.transition && this.$element[t](this.$element[0][n])
		},
		hide: function() {
			var t;
			if (this.transitioning || !this.$element.hasClass("in")) return;
			t = this.dimension(), this.reset(this.$element[t]()), this.transition("removeClass", e.Event("hide"), "hidden"), this.$element[t](0)
		},
		reset: function(e) {
			var t = this.dimension();
			return this.$element.removeClass("collapse")[t](e || "auto")[0].offsetWidth, this.$element[e !== null ? "addClass" : "removeClass"]("collapse"), this
		},
		transition: function(t, n, r) {
			var i = this,
				s = function() {
					n.type == "show" && i.reset(), i.transitioning = 0, i.$element.trigger(r)
				};
			this.$element.trigger(n);
			if (n.isDefaultPrevented()) return;
			this.transitioning = 1, this.$element[t]("in"), e.support.transition && this.$element.hasClass("collapse") ? this.$element.one(e.support.transition.end, s) : s()
		},
		toggle: function() {
			this[this.$element.hasClass("in") ? "hide" : "show"]()
		}
	};
	var n = e.fn.collapse;
	e.fn.collapse = function(n) {
		return this.each(function() {
			var r = e(this),
				i = r.data("collapse"),
				s = e.extend({}, e.fn.collapse.defaults, r.data(), typeof n == "object" && n);
			i || r.data("collapse", i = new t(this, s)), typeof n == "string" && i[n]()
		})
	}, e.fn.collapse.defaults = {
		toggle: !0
	}, e.fn.collapse.Constructor = t, e.fn.collapse.noConflict = function() {
		return e.fn.collapse = n, this
	}, e(document).on("click.collapse.data-api", "[data-toggle=collapse]", function(t) {
		var n = e(this),
			r, i = n.attr("data-target") || t.preventDefault() || (r = n.attr("href")) && r.replace(/.*(?=#[^\s]+$)/, ""),
			s = e(i).data("collapse") ? "toggle" : n.data();
		n[e(i).hasClass("in") ? "addClass" : "removeClass"]("collapsed"), e(i).collapse(s)
	})
}(window.jQuery), !
function(e) {
	"use strict";

	function r() {
		e(t).each(function() {
			i(e(this)).removeClass("open")
		})
	}
	function i(t) {
		var n = t.attr("data-target"),
			r;
		n || (n = t.attr("href"), n = n && /#/.test(n) && n.replace(/.*(?=#[^\s]*$)/, "")), r = n && e(n);
		if (!r || !r.length) r = t.parent();
		return r
	}
	var t = "[data-toggle=dropdown]",
		n = function(t) {
			var n = e(t).on("click.dropdown.data-api", this.toggle);
			e("html").on("click.dropdown.data-api", function() {
				n.parent().removeClass("open")
			})
		};
	n.prototype = {
		constructor: n,
		toggle: function(t) {
			var n = e(this),
				s, o;
			if (n.is(".disabled, :disabled")) return;
			return s = i(n), o = s.hasClass("open"), r(), o || s.toggleClass("open"), n.focus(), !1
		},
		keydown: function(n) {
			var r, s, o, u, a, f;
			if (!/(38|40|27)/.test(n.keyCode)) return;
			r = e(this), n.preventDefault(), n.stopPropagation();
			if (r.is(".disabled, :disabled")) return;
			u = i(r), a = u.hasClass("open");
			if (!a || a && n.keyCode == 27) return n.which == 27 && u.find(t).focus(), r.click();
			s = e("[role=menu] li:not(.divider):visible a", u);
			if (!s.length) return;
			f = s.index(s.filter(":focus")), n.keyCode == 38 && f > 0 && f--, n.keyCode == 40 && f < s.length - 1 && f++, ~f || (f = 0), s.eq(f).focus()
		}
	};
	var s = e.fn.dropdown;
	e.fn.dropdown = function(t) {
		return this.each(function() {
			var r = e(this),
				i = r.data("dropdown");
			i || r.data("dropdown", i = new n(this)), typeof t == "string" && i[t].call(r)
		})
	}, e.fn.dropdown.Constructor = n, e.fn.dropdown.noConflict = function() {
		return e.fn.dropdown = s, this
	}, e(document).on("click.dropdown.data-api", r).on("click.dropdown.data-api", ".dropdown form", function(e) {
		e.stopPropagation()
	}).on("click.dropdown-menu", function(e) {
		e.stopPropagation()
	}).on("click.dropdown.data-api", t, n.prototype.toggle).on("keydown.dropdown.data-api", t + ", [role=menu]", n.prototype.keydown)
}(window.jQuery), !
function(e) {
	"use strict";
	var t = function(t, n) {
			this.options = n, this.$element = e(t).delegate('[data-dismiss="modal"]', "click.dismiss.modal", e.proxy(this.hide, this)), this.options.remote && this.$element.find(".modal-body").load(this.options.remote)
		};
	t.prototype = {
		constructor: t,
		toggle: function() {
			return this[this.isShown ? "hide" : "show"]()
		},
		show: function() {
			var t = this,
				n = e.Event("show");
			this.$element.trigger(n);
			if (this.isShown || n.isDefaultPrevented()) return;
			this.isShown = !0, this.escape(), this.backdrop(function() {
				var n = e.support.transition && t.$element.hasClass("fade");
				t.$element.parent().length || t.$element.appendTo(document.body), t.$element.show(), n && t.$element[0].offsetWidth, t.$element.addClass("in").attr("aria-hidden", !1), t.enforceFocus(), n ? t.$element.one(e.support.transition.end, function() {
					t.$element.focus().trigger("shown")
				}) : t.$element.focus().trigger("shown")
			})
		},
		hide: function(t) {
			t && t.preventDefault();
			var n = this;
			t = e.Event("hide"), this.$element.trigger(t);
			if (!this.isShown || t.isDefaultPrevented()) return;
			this.isShown = !1, this.escape(), e(document).off("focusin.modal"), this.$element.removeClass("in").attr("aria-hidden", !0), e.support.transition && this.$element.hasClass("fade") ? this.hideWithTransition() : this.hideModal()
		},
		enforceFocus: function() {
			var t = this;
			e(document).on("focusin.modal", function(e) {
				t.$element[0] !== e.target && !t.$element.has(e.target).length && t.$element.focus()
			})
		},
		escape: function() {
			var e = this;
			this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.modal", function(t) {
				t.which == 27 && e.hide()
			}) : this.isShown || this.$element.off("keyup.dismiss.modal")
		},
		hideWithTransition: function() {
			var t = this,
				n = setTimeout(function() {
					t.$element.off(e.support.transition.end), t.hideModal()
				}, 500);
			this.$element.one(e.support.transition.end, function() {
				clearTimeout(n), t.hideModal()
			})
		},
		hideModal: function() {
			var e = this;
			this.$element.hide(), this.backdrop(function() {
				e.removeBackdrop(), e.$element.trigger("hidden")
			})
		},
		removeBackdrop: function() {
			this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
		},
		backdrop: function(t) {
			var n = this,
				r = this.$element.hasClass("fade") ? "fade" : "";
			if (this.isShown && this.options.backdrop) {
				var i = e.support.transition && r;
				this.$backdrop = e('<div class="modal-backdrop ' + r + '" />').appendTo(document.body), this.$backdrop.click(this.options.backdrop == "static" ? e.proxy(this.$element[0].focus, this.$element[0]) : e.proxy(this.hide, this)), i && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in");
				if (!t) return;
				i ? this.$backdrop.one(e.support.transition.end, t) : t()
			} else!this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), e.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(e.support.transition.end, t) : t()) : t && t()
		}
	};
	var n = e.fn.modal;
	e.fn.modal = function(n) {
		return this.each(function() {
			var r = e(this),
				i = r.data("modal"),
				s = e.extend({}, e.fn.modal.defaults, r.data(), typeof n == "object" && n);
			i || r.data("modal", i = new t(this, s)), typeof n == "string" ? i[n]() : s.show && i.show()
		})
	}, e.fn.modal.defaults = {
		backdrop: !0,
		keyboard: !0,
		show: !0
	}, e.fn.modal.Constructor = t, e.fn.modal.noConflict = function() {
		return e.fn.modal = n, this
	}, e(document).on("click.modal.data-api", '[data-toggle="modal"]', function(t) {
		var n = e(this),
			r = n.attr("href"),
			i = e(n.attr("data-target") || r && r.replace(/.*(?=#[^\s]+$)/, "")),
			s = i.data("modal") ? "toggle" : e.extend({
				remote: !/#/.test(r) && r
			}, i.data(), n.data());
		t.preventDefault(), i.modal(s).one("hide", function() {
			n.focus()
		})
	})
}(window.jQuery), !
function(e) {
	"use strict";
	var t = function(e, t) {
			this.init("tooltip", e, t)
		};
	t.prototype = {
		constructor: t,
		init: function(t, n, r) {
			var i, s, o, u, a;
			this.type = t, this.$element = e(n), this.options = this.getOptions(r), this.enabled = !0, o = this.options.trigger.split(" ");
			for (a = o.length; a--;) u = o[a], u == "click" ? this.$element.on("click." + this.type, this.options.selector, e.proxy(this.toggle, this)) : u != "manual" && (i = u == "hover" ? "mouseenter" : "focus", s = u == "hover" ? "mouseleave" : "blur", this.$element.on(i + "." + this.type, this.options.selector, e.proxy(this.enter, this)), this.$element.on(s + "." + this.type, this.options.selector, e.proxy(this.leave, this)));
			this.options.selector ? this._options = e.extend({}, this.options, {
				trigger: "manual",
				selector: ""
			}) : this.fixTitle()
		},
		getOptions: function(t) {
			return t = e.extend({}, e.fn[this.type].defaults, this.$element.data(), t), t.delay && typeof t.delay == "number" && (t.delay = {
				show: t.delay,
				hide: t.delay
			}), t
		},
		enter: function(t) {
			var n = e.fn[this.type].defaults,
				r = {},
				i;
			this._options && e.each(this._options, function(e, t) {
				n[e] != t && (r[e] = t)
			}, this), i = e(t.currentTarget)[this.type](r).data(this.type);
			if (!i.options.delay || !i.options.delay.show) return i.show();
			clearTimeout(this.timeout), i.hoverState = "in", this.timeout = setTimeout(function() {
				i.hoverState == "in" && i.show()
			}, i.options.delay.show)
		},
		leave: function(t) {
			var n = e(t.currentTarget)[this.type](this._options).data(this.type);
			this.timeout && clearTimeout(this.timeout);
			if (!n.options.delay || !n.options.delay.hide) return n.hide();
			n.hoverState = "out", this.timeout = setTimeout(function() {
				n.hoverState == "out" && n.hide()
			}, n.options.delay.hide)
		},
		show: function() {
			var t, n, r, i, s, o, u = e.Event("show");
			if (this.hasContent() && this.enabled) {
				this.$element.trigger(u);
				if (u.isDefaultPrevented()) return;
				t = this.tip(), this.setContent(), this.options.animation && t.addClass("fade"), s = typeof this.options.placement == "function" ? this.options.placement.call(this, t[0], this.$element[0]) : this.options.placement, t.detach().css({
					top: 0,
					left: 0,
					display: "block"
				}), this.options.container ? t.appendTo(this.options.container) : t.insertAfter(this.$element), n = this.getPosition(), r = t[0].offsetWidth, i = t[0].offsetHeight;
				switch (s) {
				case "bottom":
					o = {
						top: n.top + n.height,
						left: n.left + n.width / 2 - r / 2
					};
					break;
				case "top":
					o = {
						top: n.top - i,
						left: n.left + n.width / 2 - r / 2
					};
					break;
				case "left":
					o = {
						top: n.top + n.height / 2 - i / 2,
						left: n.left - r
					};
					break;
				case "right":
					o = {
						top: n.top + n.height / 2 - i / 2,
						left: n.left + n.width
					}
				}
				this.applyPlacement(o, s), this.$element.trigger("shown")
			}
		},
		applyPlacement: function(e, t) {
			var n = this.tip(),
				r = n[0].offsetWidth,
				i = n[0].offsetHeight,
				s, o, u, a;
			n.offset(e).addClass(t).addClass("in"), s = n[0].offsetWidth, o = n[0].offsetHeight, t == "top" && o != i && (e.top = e.top + i - o, a = !0), t == "bottom" || t == "top" ? (u = 0, e.left < 0 && (u = e.left * -2, e.left = 0, n.offset(e), s = n[0].offsetWidth, o = n[0].offsetHeight), this.replaceArrow(u - r + s, s, "left")) : this.replaceArrow(o - i, o, "top"), a && n.offset(e)
		},
		replaceArrow: function(e, t, n) {
			this.arrow().css(n, e ? 50 * (1 - e / t) + "%" : "")
		},
		setContent: function() {
			var e = this.tip(),
				t = this.getTitle();
			e.find(".tooltip-inner")[this.options.html ? "html" : "text"](t), e.removeClass("fade in top bottom left right")
		},
		hide: function() {
			function i() {
				var t = setTimeout(function() {
					n.off(e.support.transition.end).detach()
				}, 500);
				n.one(e.support.transition.end, function() {
					clearTimeout(t), n.detach()
				})
			}
			var t = this,
				n = this.tip(),
				r = e.Event("hide");
			this.$element.trigger(r);
			if (r.isDefaultPrevented()) return;
			return n.removeClass("in"), e.support.transition && this.$tip.hasClass("fade") ? i() : n.detach(), this.$element.trigger("hidden"), this
		},
		fixTitle: function() {
			var e = this.$element;
			(e.attr("title") || typeof e.attr("data-original-title") != "string") && e.attr("data-original-title", e.attr("title") || "").attr("title", "")
		},
		hasContent: function() {
			return this.getTitle()
		},
		getPosition: function() {
			var t = this.$element[0];
			return e.extend({}, typeof t.getBoundingClientRect == "function" ? t.getBoundingClientRect() : {
				width: t.offsetWidth,
				height: t.offsetHeight
			}, this.$element.offset())
		},
		getTitle: function() {
			var e, t = this.$element,
				n = this.options;
			return e = t.attr("data-original-title") || (typeof n.title == "function" ? n.title.call(t[0]) : n.title), e
		},
		tip: function() {
			return this.$tip = this.$tip || e(this.options.template)
		},
		arrow: function() {
			return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
		},
		validate: function() {
			this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
		},
		enable: function() {
			this.enabled = !0
		},
		disable: function() {
			this.enabled = !1
		},
		toggleEnabled: function() {
			this.enabled = !this.enabled
		},
		toggle: function(t) {
			var n = t ? e(t.currentTarget)[this.type](this._options).data(this.type) : this;
			n.tip().hasClass("in") ? n.hide() : n.show()
		},
		destroy: function() {
			this.hide().$element.off("." + this.type).removeData(this.type)
		}
	};
	var n = e.fn.tooltip;
	e.fn.tooltip = function(n) {
		return this.each(function() {
			var r = e(this),
				i = r.data("tooltip"),
				s = typeof n == "object" && n;
			i || r.data("tooltip", i = new t(this, s)), typeof n == "string" && i[n]()
		})
	}, e.fn.tooltip.Constructor = t, e.fn.tooltip.defaults = {
		animation: !0,
		placement: "top",
		selector: !1,
		template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
		trigger: "hover focus",
		title: "",
		delay: 0,
		html: !1,
		container: !1
	}, e.fn.tooltip.noConflict = function() {
		return e.fn.tooltip = n, this
	}
}(window.jQuery), !
function(e) {
	"use strict";
	var t = function(e, t) {
			this.init("popover", e, t)
		};
	t.prototype = e.extend({}, e.fn.tooltip.Constructor.prototype, {
		constructor: t,
		setContent: function() {
			var e = this.tip(),
				t = this.getTitle(),
				n = this.getContent();
			e.find(".popover-title")[this.options.html ? "html" : "text"](t), e.find(".popover-content")[this.options.html ? "html" : "text"](n), e.removeClass("fade top bottom left right in")
		},
		hasContent: function() {
			return this.getTitle() || this.getContent()
		},
		getContent: function() {
			var e, t = this.$element,
				n = this.options;
			return e = (typeof n.content == "function" ? n.content.call(t[0]) : n.content) || t.attr("data-content"), e
		},
		tip: function() {
			return this.$tip || (this.$tip = e(this.options.template)), this.$tip
		},
		destroy: function() {
			this.hide().$element.off("." + this.type).removeData(this.type)
		}
	});
	var n = e.fn.popover;
	e.fn.popover = function(n) {
		return this.each(function() {
			var r = e(this),
				i = r.data("popover"),
				s = typeof n == "object" && n;
			i || r.data("popover", i = new t(this, s)), typeof n == "string" && i[n]()
		})
	}, e.fn.popover.Constructor = t, e.fn.popover.defaults = e.extend({}, e.fn.tooltip.defaults, {
		placement: "right",
		trigger: "click",
		content: "",
		template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
	}), e.fn.popover.noConflict = function() {
		return e.fn.popover = n, this
	}
}(window.jQuery), !
function(e) {
	"use strict";

	function t(t, n) {
		var r = e.proxy(this.process, this),
			i = e(t).is("body") ? e(window) : e(t),
			s;
		this.options = e.extend({}, e.fn.scrollspy.defaults, n), this.$scrollElement = i.on("scroll.scroll-spy.data-api", r), this.selector = (this.options.target || (s = e(t).attr("href")) && s.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.$body = e("body"), this.refresh(), this.process()
	}
	t.prototype = {
		constructor: t,
		refresh: function() {
			var t = this,
				n;
			this.offsets = e([]), this.targets = e([]), n = this.$body.find(this.selector).map(function() {
				var n = e(this),
					r = n.data("target") || n.attr("href"),
					i = /^#\w/.test(r) && e(r);
				return i && i.length && [
					[i.position().top + (!e.isWindow(t.$scrollElement.get(0)) && t.$scrollElement.scrollTop()), r]
				] || null
			}).sort(function(e, t) {
				return e[0] - t[0]
			}).each(function() {
				t.offsets.push(this[0]), t.targets.push(this[1])
			})
		},
		process: function() {
			var e = this.$scrollElement.scrollTop() + this.options.offset,
				t = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight,
				n = t - this.$scrollElement.height(),
				r = this.offsets,
				i = this.targets,
				s = this.activeTarget,
				o;
			if (e >= n) return s != (o = i.last()[0]) && this.activate(o);
			for (o = r.length; o--;) s != i[o] && e >= r[o] && (!r[o + 1] || e <= r[o + 1]) && this.activate(i[o])
		},
		activate: function(t) {
			var n, r;
			this.activeTarget = t, e(this.selector).parent(".active").removeClass("active"), r = this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]', n = e(r).parent("li").addClass("active"), n.parent(".dropdown-menu").length && (n = n.closest("li.dropdown").addClass("active")), n.trigger("activate")
		}
	};
	var n = e.fn.scrollspy;
	e.fn.scrollspy = function(n) {
		return this.each(function() {
			var r = e(this),
				i = r.data("scrollspy"),
				s = typeof n == "object" && n;
			i || r.data("scrollspy", i = new t(this, s)), typeof n == "string" && i[n]()
		})
	}, e.fn.scrollspy.Constructor = t, e.fn.scrollspy.defaults = {
		offset: 10
	}, e.fn.scrollspy.noConflict = function() {
		return e.fn.scrollspy = n, this
	}, e(window).on("load", function() {
		e('[data-spy="scroll"]').each(function() {
			var t = e(this);
			t.scrollspy(t.data())
		})
	})
}(window.jQuery), !
function(e) {
	"use strict";
	var t = function(t) {
			this.element = e(t)
		};
	t.prototype = {
		constructor: t,
		show: function() {
			var t = this.element,
				n = t.closest("ul:not(.dropdown-menu)"),
				r = t.attr("data-target"),
				i, s, o;
			r || (r = t.attr("href"), r = r && r.replace(/.*(?=#[^\s]*$)/, ""));
			if (t.parent("li").hasClass("active")) return;
			i = n.find(".active:last a")[0], o = e.Event("show", {
				relatedTarget: i
			}), t.trigger(o);
			if (o.isDefaultPrevented()) return;
			s = e(r), this.activate(t.parent("li"), n), this.activate(s, s.parent(), function() {
				t.trigger({
					type: "shown",
					relatedTarget: i
				})
			})
		},
		activate: function(t, n, r) {
			function o() {
				i.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), t.addClass("active"), s ? (t[0].offsetWidth, t.addClass("in")) : t.removeClass("fade"), t.parent(".dropdown-menu") && t.closest("li.dropdown").addClass("active"), r && r()
			}
			var i = n.find("> .active"),
				s = r && e.support.transition && i.hasClass("fade");
			s ? i.one(e.support.transition.end, o) : o(), i.removeClass("in")
		}
	};
	var n = e.fn.tab;
	e.fn.tab = function(n) {
		return this.each(function() {
			var r = e(this),
				i = r.data("tab");
			i || r.data("tab", i = new t(this)), typeof n == "string" && i[n]()
		})
	}, e.fn.tab.Constructor = t, e.fn.tab.noConflict = function() {
		return e.fn.tab = n, this
	}, e(document).on("click.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(t) {
		t.preventDefault(), e(this).tab("show")
	})
}(window.jQuery), !
function(e) {
	"use strict";
	var t = function(t, n) {
			this.options = e.extend({}, e.fn.affix.defaults, n), this.$window = e(window).on("scroll.affix.data-api", e.proxy(this.checkPosition, this)).on("click.affix.data-api", e.proxy(function() {
				setTimeout(e.proxy(this.checkPosition, this), 1)
			}, this)), this.$element = e(t), this.checkPosition()
		};
	t.prototype.checkPosition = function() {
		if (!this.$element.is(":visible")) return;
		var t = e(document).height(),
			n = this.$window.scrollTop(),
			r = this.$element.offset(),
			i = this.options.offset,
			s = i.bottom,
			o = i.top,
			u = "affix affix-top affix-bottom",
			a;
		typeof i != "object" && (s = o = i), typeof o == "function" && (o = i.top()), typeof s == "function" && (s = i.bottom()), a = this.unpin != null && n + this.unpin <= r.top ? !1 : s != null && r.top + this.$element.height() >= t - s ? "bottom" : o != null && n <= o ? "top" : !1;
		if (this.affixed === a) return;
		this.affixed = a, this.unpin = a == "bottom" ? r.top - n : null, this.$element.removeClass(u).addClass("affix" + (a ? "-" + a : ""))
	};
	var n = e.fn.affix;
	e.fn.affix = function(n) {
		return this.each(function() {
			var r = e(this),
				i = r.data("affix"),
				s = typeof n == "object" && n;
			i || r.data("affix", i = new t(this, s)), typeof n == "string" && i[n]()
		})
	}, e.fn.affix.Constructor = t, e.fn.affix.defaults = {
		offset: 0
	}, e.fn.affix.noConflict = function() {
		return e.fn.affix = n, this
	}, e(window).on("load", function() {
		e('[data-spy="affix"]').each(function() {
			var t = e(this),
				n = t.data();
			n.offset = n.offset || {}, n.offsetBottom && (n.offset.bottom = n.offsetBottom), n.offsetTop && (n.offset.top = n.offsetTop), t.affix(n)
		})
	})
}(window.jQuery);