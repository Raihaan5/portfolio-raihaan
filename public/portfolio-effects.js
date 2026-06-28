(function () {
  if (window.__portfolioEffectsReady) return;
  window.__portfolioEffectsReady = true;

  var offset = 0;

  var storage = {
    get: function (key) {
      try {
        return window.localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    set: function (key, value) {
      try {
        window.localStorage.setItem(key, value);
      } catch {}
    },
  };

  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    storage.set("portfolio-theme", theme);
  }

  function getProjects() {
    var carousel = document.querySelector(".project-carousel");
    if (!carousel || !carousel.dataset.projects) return [];

    try {
      return JSON.parse(carousel.dataset.projects);
    } catch {
      return [];
    }
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function renderProjects() {
    var projects = getProjects();
    var cards = Array.from(document.querySelectorAll(".project-card"));
    if (!projects.length || !cards.length) return;

    cards.forEach(function (card, index) {
      var project = projects[(index + offset) % projects.length];
      var shot = card.querySelector(".project-shot");
      var tag = card.querySelector(".project-shot span");
      var title = card.querySelector("h3");
      var text = card.querySelector("p");
      var chips = card.querySelector(".chips");
      var link = card.querySelector(".project-open-link");
      var image = card.querySelector(".project-image");
      var fakeUi = card.querySelector(".fake-ui");

      if (shot) shot.className = "project-shot " + project.variant;
      if (tag) tag.textContent = project.tag;
      if (title) title.textContent = project.title;
      if (text) text.textContent = project.text;
      if (chips) {
        chips.innerHTML = project.tech.map(function (item) {
          return "<b>" + escapeHtml(item) + "</b>";
        }).join("");
      }
      if (link) {
        link.href = project.link;
        link.setAttribute("aria-label", "Abrir " + project.title);
      }
      if (image) {
        if (project.image) {
          image.src = project.image;
          image.alt = project.title;
          image.hidden = false;
          if (fakeUi) fakeUi.hidden = true;
        } else {
          image.hidden = true;
          image.removeAttribute("src");
          image.alt = "";
          if (fakeUi) fakeUi.hidden = false;
        }
      }
    });

    document.querySelectorAll(".pagination button").forEach(function (button, index) {
      button.setAttribute("aria-current", String(index === offset));
    });
  }

  function updateScrollState() {
    var maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    var progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    document.documentElement.style.setProperty("--scroll-progress", String(progress));
    document.documentElement.style.setProperty("--scroll-y", String(window.scrollY));

    document.querySelectorAll("[data-parallax]").forEach(function (target) {
      var speed = Number(target.getAttribute("data-parallax") || "0.08");
      var rect = target.getBoundingClientRect();
      var center = rect.top + rect.height / 2 - window.innerHeight / 2;
      target.style.setProperty("--parallax-y", String(center * speed * -1));
    });
  }

  function initScrollEffects() {
    var revealTargets = [
      ".site-section",
      ".stats-panel",
      ".hero-copy",
      ".hero-visual",
      ".section-heading",
      ".about-art",
      ".stat-card",
      ".tech-panel",
      ".tech-tile",
      ".fact-card",
      ".project-card",
      ".service-card",
      ".timeline-item",
      ".contact-copy",
      ".contact-form",
      ".mail-art",
    ];

    document.querySelectorAll(revealTargets.join(",")).forEach(function (element, index) {
      element.classList.add("reveal-on-scroll");
      element.style.setProperty("--reveal-delay", Math.min(index % 8, 7) * 55 + "ms");
    });

    document.querySelectorAll(".hero-visual, .about-art, .mail-art").forEach(function (element, index) {
      element.setAttribute("data-parallax", index === 0 ? "0.045" : "0.03");
    });

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal-on-scroll").forEach(function (element) {
        element.classList.add("is-visible");
      });
      updateScrollState();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });

    document.querySelectorAll(".reveal-on-scroll").forEach(function (element) {
      observer.observe(element);
    });

    var sections = Array.from(document.querySelectorAll("section[id]"));
    var navLinks = Array.from(document.querySelectorAll(".navlinks a"));
    var sectionObserver = new IntersectionObserver(function (entries) {
      var visible = entries
        .filter(function (entry) { return entry.isIntersecting; })
        .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; })[0];

      if (!visible) return;

      var activeHref = "#" + visible.target.id;
      navLinks.forEach(function (link) {
        link.classList.toggle("active", link.getAttribute("href") === activeHref);
      });
    }, { rootMargin: "-35% 0px -50% 0px", threshold: [0.15, 0.35, 0.6] });

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });

    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        updateScrollState();
        ticking = false;
      });
    }, { passive: true });

    updateScrollState();
  }

  async function sendContact(event) {
    event.preventDefault();

    var form = event.currentTarget;
    var button = form.querySelector("button[type='submit']");
    var status = form.querySelector(".form-status");
    var data = Object.fromEntries(new FormData(form).entries());

    if (status) {
      status.textContent = "Enviando mensagem...";
      status.dataset.state = "loading";
    }

    if (button) {
      button.disabled = true;
      button.textContent = "Enviando...";
    }

    try {
      var response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      var result = await response.json().catch(function () {
        return {};
      });

      if (!response.ok) {
        throw new Error(result.message || "Não foi possível enviar a mensagem.");
      }

      form.reset();
      if (status) {
        status.textContent = "Mensagem enviada com sucesso. Vou responder em breve!";
        status.dataset.state = "success";
      }
    } catch (error) {
      if (status) {
        status.textContent = error instanceof Error ? error.message : "Não foi possível enviar. Tente novamente.";
        status.dataset.state = "error";
      }
    } finally {
      if (button) {
        button.disabled = false;
        button.innerHTML = "Enviar Mensagem <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m22 2-7 20-4-9-9-4Z'/><path d='M22 2 11 13'/></svg>";
      }
    }
  }

  function init() {
    setTheme(storage.get("portfolio-theme") === "light" ? "light" : "dark");

    var themeButton = document.querySelector(".theme-toggle");
    if (themeButton) {
      themeButton.addEventListener("click", function () {
        setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
      });
    }

    var projects = getProjects();
    var leftArrow = document.querySelector(".carousel-arrow.left");
    var rightArrow = document.querySelector(".carousel-arrow.right");

    if (leftArrow) {
      leftArrow.addEventListener("click", function () {
        if (!projects.length) return;
        offset = (offset + projects.length - 1) % projects.length;
        renderProjects();
      });
    }

    if (rightArrow) {
      rightArrow.addEventListener("click", function () {
        if (!projects.length) return;
        offset = (offset + 1) % projects.length;
        renderProjects();
      });
    }

    document.querySelectorAll(".pagination button").forEach(function (button, index) {
      button.addEventListener("click", function () {
        offset = index;
        renderProjects();
      });
    });

    var contactForm = document.querySelector(".contact-form");
    if (contactForm) {
      contactForm.addEventListener("submit", sendContact);
    }

    initScrollEffects();
    renderProjects();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
