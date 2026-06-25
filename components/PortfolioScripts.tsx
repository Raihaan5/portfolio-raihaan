import { projects } from "@/data/projects";

export default function PortfolioScripts() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (() => {
            const projects = ${JSON.stringify(projects)};
            let offset = 0;

            const storage = {
              get(key) {
                try {
                  return window.localStorage.getItem(key);
                } catch {
                  return null;
                }
              },
              set(key, value) {
                try {
                  window.localStorage.setItem(key, value);
                } catch {}
              },
            };

            function setTheme(theme) {
              document.documentElement.dataset.theme = theme;
              storage.set("portfolio-theme", theme);
            }

            function renderProjects() {
              const cards = Array.from(document.querySelectorAll(".project-card"));
              if (!projects.length || !cards.length) return;

              cards.forEach((card, index) => {
                const project = projects[(index + offset) % projects.length];
                const shot = card.querySelector(".project-shot");
                const tag = card.querySelector(".project-shot span");
                const title = card.querySelector("h3");
                const text = card.querySelector("p");
                const chips = card.querySelector(".chips");
                const link = card.querySelector(".project-open-link");
                const image = card.querySelector(".project-image");
                const fakeUi = card.querySelector(".fake-ui");

                if (shot) shot.className = "project-shot " + project.variant;
                if (tag) tag.textContent = project.tag;
                if (title) title.textContent = project.title;
                if (text) text.textContent = project.text;
                if (chips) chips.innerHTML = project.tech.map((item) => "<b>" + item + "</b>").join("");
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
                    if (fakeUi) fakeUi.hidden = false;
                  }
                }
              });

              document.querySelectorAll(".pagination button").forEach((button, index) => {
                button.setAttribute("aria-current", String(index === offset));
              });
            }

            function sendContact(event) {
              event.preventDefault();
              const data = new FormData(event.currentTarget);
              const subject = String(data.get("subject") || "Novo contacto pelo portfolio");
              const body = [
                "Nome: " + String(data.get("name") || ""),
                "Email: " + String(data.get("email") || ""),
                "",
                String(data.get("message") || ""),
              ].join("\\n");

              window.location.href = "mailto:raihaanabubacar@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
            }

            function initPortfolioControls() {
              setTheme(storage.get("portfolio-theme") === "light" ? "light" : "dark");

              document.querySelector(".theme-toggle")?.addEventListener("click", () => {
                setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
              });

              document.querySelector(".carousel-arrow.left")?.addEventListener("click", () => {
                if (!projects.length) return;
                offset = (offset + projects.length - 1) % projects.length;
                renderProjects();
              });

              document.querySelector(".carousel-arrow.right")?.addEventListener("click", () => {
                if (!projects.length) return;
                offset = (offset + 1) % projects.length;
                renderProjects();
              });

              document.querySelectorAll(".pagination button").forEach((button, index) => {
                button.addEventListener("click", () => {
                  offset = index;
                  renderProjects();
                });
              });

              document.querySelector(".contact-form")?.addEventListener("submit", sendContact);
              renderProjects();
            }

            if (document.readyState === "loading") {
              document.addEventListener("DOMContentLoaded", initPortfolioControls);
            } else {
              initPortfolioControls();
            }
          })();
        `,
      }}
    />
  );
}
