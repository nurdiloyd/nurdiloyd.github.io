(function () {
    "use strict";

    var data = window.SITE_DATA || { projects: [], releases: [] };
    var root = document.documentElement;
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    function el(tag, className, text) {
        var node = document.createElement(tag);
        if (className) node.className = className;
        if (text != null) node.textContent = text;
        return node;
    }

    function pad(n) {
        return n < 10 ? "0" + n : String(n);
    }

    function clamp(v, min, max) {
        return Math.min(max, Math.max(min, v));
    }

    function externalLink(label, url, className) {
        var a = el("a", className, label);
        a.href = url;
        if (!/^mailto:/.test(url)) {
            a.target = "_blank";
            a.rel = "noopener";
        }
        return a;
    }

    /* ------------------------------------------------------------------
       Work index
       ------------------------------------------------------------------ */

    function renderWork() {
        var list = document.getElementById("work-list");
        document.getElementById("work-count").textContent = pad(data.projects.length) + " projects";

        data.projects.forEach(function (p, i) {
            var id = "project-" + (i + 1);
            var li = el("li", "reveal");
            li.style.transitionDelay = i * 60 + "ms";

            var row = el("button", "work-row");
            row.type = "button";
            row.setAttribute("aria-expanded", "false");
            row.setAttribute("aria-controls", id);
            row.appendChild(el("span", "num mono", pad(i + 1)));
            row.appendChild(el("span", "name", p.name));
            row.appendChild(el("span", "kind mono", p.kind));
            row.appendChild(el("span", "year mono", p.year));
            row.appendChild(el("span", "plus"));
            if (p.media) row.dataset.media = i;

            var body = el("div", "work-body");
            body.id = id;
            body.inert = true;
            var inner = el("div", "work-body-inner");
            var detail = el("div", "work-detail");

            if (p.media) {
                var fig = el("figure", "media" + (p.media.contain ? " contain" : ""));
                var img = el("img");
                img.alt = p.media.alt || "";
                img.dataset.src = p.media.src;
                fig.appendChild(img);
                detail.appendChild(fig);
            }

            detail.appendChild(el("p", "summary", p.summary));

            var meta = el("ul", "meta");
            (p.stack || []).forEach(function (s) {
                var tag = el("li", "tag mono", s);
                meta.appendChild(tag);
            });
            detail.appendChild(meta);

            var links = el("div", "links");
            (p.links || []).forEach(function (l) {
                links.appendChild(externalLink(l.label, l.url, "arrow-link"));
            });
            detail.appendChild(links);

            inner.appendChild(detail);
            body.appendChild(inner);
            li.appendChild(row);
            li.appendChild(body);
            list.appendChild(li);

            row.addEventListener("click", function () {
                var open = row.getAttribute("aria-expanded") !== "true";
                row.setAttribute("aria-expanded", String(open));
                body.classList.toggle("is-open", open);
                body.inert = !open;
                if (open) {
                    var lazy = body.querySelector("img[data-src]");
                    if (lazy) {
                        lazy.src = lazy.dataset.src;
                        lazy.removeAttribute("data-src");
                    }
                    hidePreview();
                }
            });
        });
    }

    /* ------------------------------------------------------------------
       Cursor-following preview
       ------------------------------------------------------------------ */

    var preview = document.querySelector(".preview");
    var previewImg = preview.querySelector("img");
    var lastX = 0;
    var tilt = 0;

    function hidePreview() {
        preview.classList.remove("is-visible");
    }

    function setupPreview() {
        if (!finePointer) return;
        var list = document.getElementById("work-list");

        list.addEventListener("pointerover", function (e) {
            var row = e.target.closest(".work-row");
            if (!row || row.dataset.media == null || row.getAttribute("aria-expanded") === "true") {
                hidePreview();
                return;
            }
            var media = data.projects[row.dataset.media].media;
            if (previewImg.getAttribute("src") !== media.src) previewImg.src = media.src;
            preview.classList.toggle("contain", !!media.contain);
            preview.classList.add("is-visible");
        });

        list.addEventListener("pointerleave", hidePreview);

        window.addEventListener("pointermove", function (e) {
            if (!preview.classList.contains("is-visible")) {
                lastX = e.clientX;
                return;
            }
            var w = preview.offsetWidth;
            var h = preview.offsetHeight;
            var x = e.clientX + 32;
            if (x + w > window.innerWidth - 16) x = e.clientX - w - 32;
            var y = clamp(e.clientY - h / 2, 16, window.innerHeight - h - 16);
            tilt = reducedMotion ? 0 : clamp(tilt * 0.6 + (e.clientX - lastX) * 0.5, -8, 8);
            lastX = e.clientX;
            preview.style.setProperty("--x", x + "px");
            preview.style.setProperty("--y", y + "px");
            preview.style.setProperty("--r", tilt.toFixed(2) + "deg");
        });

        window.addEventListener("scroll", hidePreview, { passive: true });
    }

    /* ------------------------------------------------------------------
       Releases
       ------------------------------------------------------------------ */

    function formatDay(date) {
        var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
        return m ? MONTHS[parseInt(m[2], 10) - 1] + " " + parseInt(m[3], 10) : date;
    }

    function versionLabel(v) {
        return /^\d/.test(v) ? "v" + v : v;
    }

    function renderReleases() {
        var nextUp = document.getElementById("next-up");
        var log = document.getElementById("release-log");

        data.releases
            .filter(function (r) { return r.status === "upcoming"; })
            .forEach(function (r) {
                var card = el(r.url ? "a" : "div", "next-up reveal");
                if (r.url) {
                    card.href = r.url;
                    card.target = "_blank";
                    card.rel = "noopener";
                    card.style.textDecoration = "none";
                }
                card.appendChild(el("span", "soon mono", "Soon"));
                var text = el("div");
                text.appendChild(el("div", "title", r.project + (r.version ? " " + versionLabel(r.version) : "")));
                if (r.notes) text.appendChild(el("p", null, r.notes));
                card.appendChild(text);
                card.appendChild(el("span", "mono", r.date || "TBA"));
                nextUp.appendChild(card);
            });

        var shipped = data.releases
            .filter(function (r) { return r.status !== "upcoming"; })
            .sort(function (a, b) { return a.date < b.date ? 1 : -1; });

        var groups = {};
        var years = [];
        shipped.forEach(function (r) {
            var y = r.date.slice(0, 4);
            if (!groups[y]) {
                groups[y] = [];
                years.push(y);
            }
            groups[y].push(r);
        });

        years.forEach(function (y) {
            var block = el("div", "release-year reveal");
            block.appendChild(el("h3", null, y));
            var ol = el("ol");
            groups[y].forEach(function (r) {
                var li = el("li");
                var a = el(r.url ? "a" : "div", "release");
                if (r.url) {
                    a.href = r.url;
                    a.target = "_blank";
                    a.rel = "noopener";
                }
                var time = el("time", "mono", formatDay(r.date));
                time.dateTime = r.date;
                a.appendChild(time);
                var what = el("span", "what", r.project);
                what.appendChild(el("span", "ver mono", versionLabel(r.version)));
                a.appendChild(what);
                if (r.url) a.appendChild(el("span", "go", "↗"));
                if (r.notes) a.appendChild(el("span", "notes", r.notes));
                li.appendChild(a);
                ol.appendChild(li);
            });
            block.appendChild(ol);
            log.appendChild(block);
        });
    }

    /* ------------------------------------------------------------------
       Hero: index line, word reveal, letters that thicken near the pointer
       ------------------------------------------------------------------ */

    function renderHeroMeta() {
        var years = data.projects.map(function (p) { return parseInt(p.year, 10); }).filter(Boolean);
        var now = new Date().getFullYear();
        if (years.length) {
            document.getElementById("hero-range").textContent =
                "Index " + Math.min.apply(null, years) + " — " + now + " · " + data.projects.length + " projects";
        }

        var latest = data.releases
            .filter(function (r) { return r.status !== "upcoming"; })
            .sort(function (a, b) { return a.date < b.date ? 1 : -1; })[0];
        var upcoming = data.releases.filter(function (r) { return r.status === "upcoming"; })[0];
        var link = document.getElementById("hero-latest");
        if (upcoming) link.textContent = "Next: " + upcoming.project + " ↓";
        else if (latest) link.textContent = "Latest: " + latest.project + " " + versionLabel(latest.version) + " ↓";
    }

    function splitHero() {
        var title = document.querySelector(".hero-title");
        var words = [];

        Array.prototype.forEach.call(title.childNodes, function (node) {
            var italic = node.nodeType === 1 && node.tagName === "EM";
            node.textContent.split(" ").forEach(function (w) {
                if (w) words.push({ text: w, italic: italic });
            });
        });

        var wrap = el("span");
        wrap.setAttribute("aria-hidden", "true");
        words.forEach(function (w, i) {
            var word = el("span", "word");
            var inner = el("span", "word-inner");
            inner.style.setProperty("--i", i);
            var target = inner;
            if (w.italic) {
                target = el("em");
                inner.appendChild(target);
            }
            Array.prototype.forEach.call(w.text, function (c) {
                target.appendChild(el("span", "ch", c));
            });
            word.appendChild(inner);
            wrap.appendChild(word);
            if (i < words.length - 1) wrap.appendChild(document.createTextNode(" "));
        });

        title.textContent = "";
        title.appendChild(wrap);
        return Array.prototype.slice.call(title.querySelectorAll(".ch"));
    }

    function setupHeroType(chars) {
        if (reducedMotion) return;

        var pointer = null;
        var frame = 0;

        function paint() {
            frame = 0;
            var radius = Math.max(180, window.innerWidth * 0.18);
            chars.forEach(function (ch) {
                var t = 0;
                if (pointer) {
                    var r = ch.getBoundingClientRect();
                    var d = Math.hypot(pointer.x - (r.left + r.width / 2), pointer.y - (r.top + r.height / 2));
                    t = clamp(1 - d / radius, 0, 1);
                    t = t * t * (3 - 2 * t);
                }
                ch.style.setProperty("--w", Math.round(300 + 560 * t));
                ch.style.setProperty("--s", Math.round(100 * t));
            });
        }

        function schedule() {
            if (!frame) frame = requestAnimationFrame(paint);
        }

        // One sweep across the title after it reveals, so touch visitors see it too.
        function sweep() {
            var title = document.querySelector(".hero-title").getBoundingClientRect();
            var start = performance.now();
            var duration = 1800;
            (function step(now) {
                if (pointer && !pointer.sweep) return;
                var p = clamp((now - start) / duration, 0, 1);
                pointer = {
                    x: title.left - 200 + (title.width + 400) * p,
                    y: title.top + title.height * (0.25 + 0.5 * p),
                    sweep: true
                };
                paint();
                if (p < 1) requestAnimationFrame(step);
                else {
                    pointer = null;
                    paint();
                }
            })(start);
        }

        setTimeout(sweep, 1100);

        if (!finePointer) return;

        window.addEventListener("pointermove", function (e) {
            pointer = { x: e.clientX, y: e.clientY };
            schedule();
        });
        document.addEventListener("pointerleave", function () {
            pointer = null;
            schedule();
        });
        window.addEventListener("scroll", schedule, { passive: true });
    }

    /* ------------------------------------------------------------------
       Scroll: reveals, header state, active nav link
       ------------------------------------------------------------------ */

    function setupScroll() {
        var reveals = document.querySelectorAll(".reveal");
        if ("IntersectionObserver" in window) {
            var io = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-in");
                        io.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
            reveals.forEach(function (r) { io.observe(r); });
        } else {
            reveals.forEach(function (r) { r.classList.add("is-in"); });
        }

        var header = document.querySelector(".site-header");
        var navLinks = document.querySelectorAll(".site-nav a");
        var sections = document.querySelectorAll("section[id]");

        function onScroll() {
            header.classList.toggle("is-scrolled", window.scrollY > 8);

            // Active link: the last section whose top has passed the middle of the screen,
            // or the last one when scrolled to the bottom.
            var active = "";
            var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
            sections.forEach(function (s) {
                if (atBottom || s.getBoundingClientRect().top < window.innerHeight * 0.5) active = s.id;
            });
            navLinks.forEach(function (a) {
                a.classList.toggle("is-active", a.getAttribute("href") === "#" + active);
            });
        }
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
    }

    /* ------------------------------------------------------------------
       Theme toggle with a circular reveal
       ------------------------------------------------------------------ */

    function setupTheme() {
        var button = document.querySelector(".theme-toggle");
        var systemDark = window.matchMedia("(prefers-color-scheme: dark)");

        function current() {
            return root.dataset.theme || (systemDark.matches ? "dark" : "light");
        }

        function apply(theme) {
            root.dataset.theme = theme;
            try {
                localStorage.setItem("theme", theme);
            } catch (e) {}
            document.querySelectorAll('meta[name="theme-color"]').forEach(function (m) {
                m.content = theme === "dark" ? "#11110f" : "#f3f0e8";
            });
        }

        button.addEventListener("click", function () {
            var next = current() === "dark" ? "light" : "dark";
            if (!document.startViewTransition || reducedMotion) {
                apply(next);
                return;
            }
            var r = button.getBoundingClientRect();
            var x = r.left + r.width / 2;
            var y = r.top + r.height / 2;
            var end = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
            var transition = document.startViewTransition(function () { apply(next); });
            transition.ready.then(function () {
                root.animate(
                    { clipPath: ["circle(0px at " + x + "px " + y + "px)", "circle(" + end + "px at " + x + "px " + y + "px)"] },
                    { duration: 700, easing: "cubic-bezier(0.2, 0.7, 0.1, 1)", pseudoElement: "::view-transition-new(root)" }
                );
            });
        });
    }

    /* ------------------------------------------------------------------ */

    document.getElementById("year").textContent = new Date().getFullYear();
    renderWork();
    renderReleases();
    renderHeroMeta();
    setupPreview();
    setupHeroType(splitHero());
    setupScroll();
    setupTheme();

    // Two frames so the hidden start state is painted before the reveal transition.
    requestAnimationFrame(function () {
        requestAnimationFrame(function () {
            root.classList.add("is-loaded");
            document.querySelectorAll(".hero .reveal").forEach(function (r) { r.classList.add("is-in"); });
        });
    });
})();
