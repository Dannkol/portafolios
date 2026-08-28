// Lightweight i18n helpers for the static (file-based) locale routing:
// English lives at the site root, Spanish under /es/...

export type Lang = "en" | "es";

export const UI: Record<Lang, Record<string, string>> = {
  en: {
    resume: "Resume",
    blog: "Blog",
    switchLang: "ES",
    switchLangAria: "Cambiar a español",
    cvLabel: "Curriculum Vitae",
    cvUpdated: "Last updated July 2026",
    print: "Print / Save PDF",
    printAria: "Print or save this CV as PDF",
    blogKicker: "Writing & projects",
    blogTitle: "Blog",
    blogIntro: "Notes on the things I build — AI clones, hackathon projects and full-stack experiments.",
    blogEmpty: "No posts yet — check back soon.",
    backToBlog: "Back to blog",
  },
  es: {
    resume: "CV",
    blog: "Blog",
    switchLang: "EN",
    switchLangAria: "Switch to English",
    cvLabel: "Curriculum Vitae",
    cvUpdated: "Última actualización: julio de 2026",
    print: "Imprimir / Guardar PDF",
    printAria: "Imprimir o guardar este CV como PDF",
    blogKicker: "Artículos y proyectos",
    blogTitle: "Blog",
    blogIntro: "Notas sobre lo que construyo — clones de IA, proyectos de hackathon y experimentos full-stack.",
    blogEmpty: "Aún no hay publicaciones — vuelve pronto.",
    backToBlog: "Volver al blog",
  },
};

function stripTrailingSlash(path: string): string {
  return path.replace(/\/+$/, "") || "/";
}

/** Resolve the current language from a pathname (routes are the source of truth). */
export function langFromPath(pathname: string): Lang {
  const p = stripTrailingSlash(pathname);
  return p === "/es" || p.startsWith("/es/") ? "es" : "en";
}

/** Given the current pathname, return the counterpart URL in the other language. */
export function alternatePath(pathname: string): string {
  const p = stripTrailingSlash(pathname); // "" style normalized
  if (p === "/es") return "/";
  if (p === "/") return "/es";
  if (p.startsWith("/es/")) return p.slice(3) || "/"; // drop /es
  return "/es" + p; // prepend /es to en routes
}

/** Format an ISO date for the active locale. */
export function formatDate(dateString: string, lang: Lang = "en"): string {
  return new Date(dateString).toLocaleDateString(lang === "es" ? "es-ES" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
