(function () {
    "use strict";

    var data = window.SITE_DATA || { projects: [], releases: [] };
    var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    function el(tag, className, text) {
        var node = document.createElement(tag);
        if (className) node.className = className;
        if (text != null) node.textContent = text;
        return node;
    }

    function externalLink(label, url, className) {
        var a = el("a", className, label);
        a.href = url;
        a.target = "_blank";
        a.rel = "noopener";
        return a;
    }

    function projectUrl(p) {
        return "/projects/" + p.slug + "/";
    }

    // "2024-08-21" -> "Aug 21, 2024"; anything else ("Q1 2027") is shown as written.
    function formatDate(date) {
        var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date || "");
        return m ? MONTHS[parseInt(m[2], 10) - 1] + " " + parseInt(m[3], 10) + ", " + m[1] : date || "TBA";
    }

    function versionLabel(v) {
        return /^\d/.test(v) ? "v" + v : v;
    }

    /* ------------------------------------------------------------------
       Projects (home page)
       ------------------------------------------------------------------ */

    function renderProjects() {
        var list = document.getElementById("project-list");

        data.projects.forEach(function (p) {
            var item = el("article", "project");

            var head = el("div", "project-head");
            var title = el("h3");
            var link = el("a", "project-link", p.name);
            link.href = projectUrl(p);
            title.appendChild(link);
            head.appendChild(title);
            head.appendChild(el("span", "project-meta", p.kind + " · " + p.year));
            item.appendChild(head);

            item.appendChild(el("p", null, p.summary));

            list.appendChild(item);
        });
    }

    /* ------------------------------------------------------------------
       Releases: upcoming first, then newest to oldest
       ------------------------------------------------------------------ */

    function renderReleases(list, releases) {
        var upcoming = releases.filter(function (r) { return r.status === "upcoming"; });
        var shipped = releases
            .filter(function (r) { return r.status !== "upcoming"; })
            .sort(function (a, b) { return a.date < b.date ? 1 : -1; });

        upcoming.concat(shipped).forEach(function (r) {
            var isUpcoming = r.status === "upcoming";
            var li = el("li", "release" + (isUpcoming ? " is-upcoming" : ""));

            var time = el("time", "release-date", formatDate(r.date));
            if (/^\d{4}-\d{2}-\d{2}$/.test(r.date)) time.dateTime = r.date;
            li.appendChild(time);

            var body = el("div");
            var title = r.url ? externalLink("", r.url, "release-link") : el("span");
            title.appendChild(el("span", "release-title", r.project));
            if (r.version) title.appendChild(el("span", "release-version", versionLabel(r.version)));
            body.appendChild(title);
            if (isUpcoming) body.appendChild(el("span", "soon", "Soon"));
            li.appendChild(body);

            list.appendChild(li);
        });
    }

    /* ------------------------------------------------------------------
       Project page: /projects/<slug>/ with <body data-project="<slug>">
       ------------------------------------------------------------------ */

    // YouTube shows a thumbnail first; the player only loads when it is clicked.
    function renderVideo(m) {
        var video = el("div", "media media-video");
        var button = el("button", "video-poster");
        button.type = "button";
        button.setAttribute("aria-label", "Play: " + (m.title || "video"));
        var poster = el("img");
        poster.src = "https://i.ytimg.com/vi/" + m.id + "/hqdefault.jpg";
        poster.alt = "";
        button.appendChild(poster);
        button.appendChild(el("span", "play"));
        video.appendChild(button);

        button.addEventListener("click", function () {
            var frame = el("iframe");
            frame.src = "https://www.youtube-nocookie.com/embed/" + m.id + "?autoplay=1";
            frame.title = m.title || "Video";
            frame.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
            video.replaceChild(frame, button);
        });
        return video;
    }

    function renderMedia(m) {
        if (m.type === "youtube") return renderVideo(m);

        var img = el("img");
        img.src = m.src;
        img.alt = m.alt || "";
        // Known sizes reserve space so the page doesn't jump while images load.
        if (m.width && m.height) {
            img.width = m.width;
            img.height = m.height;
        }
        var figure = el("figure", "media");
        figure.appendChild(img);
        return figure;
    }

    function section(title, child) {
        var s = el("section", "section");
        s.appendChild(el("h2", null, title));
        s.appendChild(child);
        return s;
    }

    function renderProjectPage(slug) {
        var root = document.getElementById("project");
        var index = -1;
        data.projects.forEach(function (p, i) {
            if (p.slug === slug) index = i;
        });

        if (index < 0) {
            root.appendChild(el("h1", null, "Project not found"));
            return;
        }

        var p = data.projects[index];

        var intro = el("header", "project-intro");
        intro.appendChild(el("p", "project-meta", p.kind + " · " + p.year));
        intro.appendChild(el("h1", null, p.name));
        intro.appendChild(el("p", "project-summary", p.summary));
        if (p.links && p.links.length) {
            var links = el("ul", "pills");
            p.links.forEach(function (l) {
                var li = el("li");
                li.appendChild(externalLink(l.label, l.url));
                links.appendChild(li);
            });
            intro.appendChild(links);
        }
        root.appendChild(intro);

        if (p.media && p.media.length) {
            var gallery = el("div", "gallery");
            p.media.forEach(function (m) {
                gallery.appendChild(renderMedia(m));
            });
            root.appendChild(gallery);
        }

        if (p.details && p.details.length) {
            var details = el("ul", "details");
            p.details.forEach(function (d) {
                details.appendChild(el("li", null, d));
            });
            root.appendChild(section("Details", details));
        }

        // Only the latest shipped release; older ones stay in data.js as history.
        var releases = data.releases
            .filter(function (r) { return r.project === p.name && r.status !== "upcoming"; })
            .sort(function (a, b) { return a.date < b.date ? 1 : -1; })
            .slice(0, 1);
        if (releases.length) {
            var list = el("ol", "releases");
            renderReleases(list, releases);
            root.appendChild(section("Releases", list));
        }
    }

    document.getElementById("year").textContent = new Date().getFullYear();

    var projectSlug = document.body.dataset.project;
    if (projectSlug) {
        renderProjectPage(projectSlug);
    } else {
        renderProjects();
    }
})();
