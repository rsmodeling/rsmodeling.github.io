(function () {
  var REG_URL = "https://www.hyterp.cn/website/3212/index.html";
  var NAV = [
    { href: "/", label: "首页", id: "home" },
    { href: "/notices.html", label: "通知", id: "notices" },
    { href: "/forums.html", label: "历届会议", id: "forums" },
    { href: "/about.html", label: "关于", id: "about" },
    { href: "/contact.html", label: "联系", id: "contact" }
  ];

  function path() {
    var p = window.location.pathname || "/";
    if (p.length > 1 && p.charAt(p.length - 1) === "/") {
      p = p.slice(0, -1);
    }
    return p;
  }

  function currentId(p) {
    if (p === "/" || p === "/index.html") return "home";
    if (p.indexOf("/notices") === 0) return "notices";
    if (p.indexOf("/forums") === 0) return "forums";
    if (p.indexOf("/about") === 0) return "about";
    if (p.indexOf("/contact") === 0) return "contact";
    return "";
  }

  function navItems(active) {
    return NAV.map(function (item) {
      var cls = item.id === active ? " active" : "";
      return (
        '<li><a class="' +
        cls.trim() +
        '" href="' +
        item.href +
        '"' +
        (item.id === active ? ' aria-current="page"' : "") +
        ">" +
        item.label +
        "</a></li>"
      );
    }).join("");
  }

  function injectHeader() {
    var mount = document.getElementById("site-header");
    if (!mount) return;
    var active = currentId(path());
    mount.innerHTML =
      '<a class="skip-link" href="#main">跳到正文</a>' +
      '<header class="site-nav" id="top-nav">' +
      '<div class="container nav-inner">' +
      '<a class="brand" href="/">' +
      '<img src="/assets/img/logonav.png" width="36" height="36" alt="">' +
      "<span>遥感建模论坛</span></a>" +
      '<button class="nav-toggle" type="button" aria-label="打开菜单" aria-expanded="false" aria-controls="site-menu">' +
      "<span></span><span></span><span></span></button>" +
      '<ul class="nav-links" id="site-menu">' +
      navItems(active) +
      "</ul></div></header>";

    var nav = mount.querySelector(".site-nav");
    var toggle = mount.querySelector(".nav-toggle");
    if (!nav || !toggle) return;

    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "关闭菜单" : "打开菜单");
    }

    toggle.addEventListener("click", function () {
      setOpen(!nav.classList.contains("is-open"));
    });

    mount.querySelectorAll(".nav-links a").forEach(function (link) {
      link.addEventListener("click", function () {
        setOpen(false);
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 768) setOpen(false);
    });
  }

  function injectFooter() {
    var mount = document.getElementById("site-footer");
    if (!mount) return;
    var year = new Date().getFullYear();
    mount.innerHTML =
      '<footer class="site-footer">' +
      '<div class="container">' +
      '<div class="footer-grid">' +
      "<div><h3>论坛简介</h3>" +
      "<p>遥感建模论坛（RSMF）坚持小而精的深度研讨，深化遥感建模理论探索，促进学术界交流。</p></div>" +
      "<div><h3>快速链接</h3><ul class=\"footer-links\">" +
      '<li><a href="/">首页</a></li>' +
      '<li><a href="/notices.html">通知</a></li>' +
      '<li><a href="/forums/2026.html">RSMF-2026</a></li>' +
      '<li><a href="' +
      REG_URL +
      '" target="_blank" rel="noopener">会议注册</a></li>' +
      "</ul></div>" +
      "<div><h3>联系方式</h3>" +
      '<p><a href="mailto:rsmodeling@126.com">rsmodeling@126.com</a><br>' +
      '<a href="https://rsmodeling.org/">rsmodeling.org</a></p>' +
      "<p>高同学 18810617130<br>郭同学 13995286291<br>黄同学 15051724208</p>" +
      "</div></div>" +
      '<p class="footer-copy">© 2024–' +
      year +
      " 遥感建模论坛 RSMF</p>" +
      "</div></footer>";
  }

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  ready(function () {
    injectHeader();
    injectFooter();
  });
})();
