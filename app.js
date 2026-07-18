const lessons = [
  { n: 1, group: "foundations", title: "Series Introduction", texts: "Philemon 1–25; 1 Corinthians 15:1–4; 2 Peter 3:15–16; Colossians 4:16", focus: "How to read Paul’s letters: Whole Bible, Whole Letter, Passage", next: "Acts 7:54–9:31; Galatians 1:11–24; Philippians 3:4–11" },
  { n: 2, group: "foundations", title: "Saul Before Paul", texts: "Acts 7:54–9:31; Galatians 1:11–24; Philippians 3:4–11", focus: "Zeal redirected by grace", next: "Acts 9:1–31; Acts 13:1–12; Romans 15:14–33" },
  { n: 3, group: "foundations", title: "Paul’s Calling and Mission", texts: "Acts 9:1–31; Acts 13:1–12; Romans 15:14–33", focus: "Apostle to the Gentiles", next: "Galatians 1–6 in one sitting; Acts 15" },
  { n: 4, group: "foundations", title: "Galatians, Part 1", texts: "Galatians 1–2; Acts 15", focus: "No other gospel", next: "Galatians 3–6" },
  { n: 5, group: "foundations", title: "Galatians, Part 2", texts: "Galatians 3–6", focus: "Grace, freedom, and life in the Spirit", next: "Acts 17:1–10; 1 Thessalonians 1–3" },
  { n: 6, group: "thessalonians", title: "1 Thessalonians, Part 1", texts: "Acts 17:1–10; 1 Thessalonians 1–3", focus: "The gospel received under pressure", next: "1 Thessalonians 4–5" },
  { n: 7, group: "thessalonians", title: "1 Thessalonians, Part 2", texts: "1 Thessalonians 4–5", focus: "Holy living and resurrection hope", next: "2 Thessalonians 1–3" },
  { n: 8, group: "thessalonians", title: "2 Thessalonians", texts: "2 Thessalonians 1–3", focus: "Confusion, endurance, and Christ’s return", next: "Acts 18:1–17; 1 Corinthians 1–4" },
  { n: 9, group: "corinthians", title: "1 Corinthians, Part 1", texts: "Acts 18:1–17; 1 Corinthians 1–4", focus: "Division and worldly wisdom", next: "1 Corinthians 5–7" },
  { n: 10, group: "corinthians", title: "1 Corinthians, Part 2", texts: "1 Corinthians 5–7", focus: "Holiness, sexuality, and marriage", next: "1 Corinthians 8–14" },
  { n: 11, group: "corinthians", title: "1 Corinthians, Part 3", texts: "1 Corinthians 8–14", focus: "Freedom, love, worship, and spiritual gifts", next: "1 Corinthians 15–16" },
  { n: 12, group: "corinthians", title: "1 Corinthians, Part 4", texts: "1 Corinthians 15–16", focus: "Resurrection hope", next: "2 Corinthians 1–7" },
  { n: 13, group: "corinthians", title: "2 Corinthians, Part 1", texts: "2 Corinthians 1–7", focus: "Suffering, weakness, and true ministry", next: "2 Corinthians 8–13" },
  { n: 14, group: "corinthians", title: "2 Corinthians, Part 2", texts: "2 Corinthians 8–13", focus: "Generosity, authority, and boasting in weakness", next: "Romans 1–4" },
  { n: 15, group: "romans", title: "Romans, Part 1", texts: "Romans 1–4", focus: "Sin, righteousness, and justification", next: "Romans 5–8" },
  { n: 16, group: "romans", title: "Romans, Part 2", texts: "Romans 5–8", focus: "Union with Christ, the Spirit, and assurance", next: "Romans 9–11" },
  { n: 17, group: "romans", title: "Romans, Part 3", texts: "Romans 9–11", focus: "Israel, Gentiles, election, and mercy", next: "Romans 12–16" },
  { n: 18, group: "romans", title: "Romans, Part 4", texts: "Romans 12–16", focus: "Gospel-shaped community", next: "Colossians 1–4; Philemon" },
  { n: 19, group: "prison", title: "Colossians and Philemon", texts: "Colossians 1–4; Philemon", focus: "Christ supreme; gospel reconciliation", next: "Philippians 1–4" },
  { n: 20, group: "prison", title: "Philippians", texts: "Philippians 1–4", focus: "Joy, humility, partnership, and perseverance", next: "Acts 19:1–20; Ephesians 1–3" },
  { n: 21, group: "prison", title: "Ephesians, Part 1", texts: "Acts 19:1–20; Ephesians 1–3", focus: "Grace, union with Christ, and one new people", next: "Ephesians 4–6" },
  { n: 22, group: "prison", title: "Ephesians, Part 2", texts: "Ephesians 4–6", focus: "Walking worthy: unity, maturity, holiness, and spiritual resistance", next: "1 Timothy 1–6; Titus 1–3" },
  { n: 23, group: "pastoral", title: "1 Timothy and Titus", texts: "1 Timothy 1–6; Titus 1–3", focus: "Guarding sound doctrine through godly churches", next: "2 Timothy 1–4" },
  { n: 24, group: "pastoral", title: "2 Timothy", texts: "2 Timothy 1–4", focus: "Guard the gospel and finish well", next: "Review the series and continue reading Paul’s letters as whole letters" }
];

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const open = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!open));
    siteNav.classList.toggle("is-open", !open);
  });
}

const currentPage = document.body.dataset.page;
const pageFiles = { home: "index.html", lessons: "lessons.html", schedule: "schedule.html", teachers: "teachers.html", reading: "reading.html" };
document.querySelectorAll(".site-nav a").forEach((link) => {
  if (link.getAttribute("href") === pageFiles[currentPage]) link.setAttribute("aria-current", "page");
});

const scheduleList = document.querySelector("#schedule-list");
const scheduleFilter = document.querySelector("#schedule-filter");

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
}

function renderSchedule(group = "all") {
  if (!scheduleList) return;
  const visible = lessons.filter((lesson) => group === "all" || lesson.group === group);
  scheduleList.innerHTML = visible.map((lesson) => `
    <article class="schedule-item">
      <span class="week" aria-label="Lesson ${lesson.n}">${lesson.n}</span>
      <div><span class="schedule-label">Lesson</span><h2>${escapeHtml(lesson.title)}</h2><p>${escapeHtml(lesson.focus)}</p></div>
      <div><span class="schedule-label">Primary texts</span><p><strong>${escapeHtml(lesson.texts)}</strong></p></div>
      <div><span class="schedule-label">Read before the next lesson</span><p>${escapeHtml(lesson.next)}</p></div>
    </article>`).join("");
}

if (scheduleList) {
  renderSchedule();
  scheduleFilter?.addEventListener("change", (event) => renderSchedule(event.target.value));
}
