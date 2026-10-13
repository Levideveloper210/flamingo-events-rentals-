// Change the number here if the WhatsApp line changes (0911 454 0253 in international format).
const WHATSAPP_NUMBER = "2349114540253";
const HELLO = "Hello Flamingo Events and Rentals, I would like to ask about an event.";
const wa = (t) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t)}`;

document.querySelectorAll("[data-wa]").forEach((a) => {
  a.href = wa(HELLO); a.target = "_blank"; a.rel = "noopener";
});

const btn = document.querySelector(".menu");
const nav = document.getElementById("nav");
btn.addEventListener("click", () => btn.setAttribute("aria-expanded", nav.classList.toggle("open")));
nav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") { nav.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); }
});

document.getElementById("enquiry").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const name = (f.get("name") || "").trim();
  const phone = (f.get("phone") || "").trim();
  const err = document.getElementById("err");
  if (!name || !phone) { err.hidden = false; return; }
  err.hidden = true;
  const needs = f.getAll("need");
  const lines = [
    "Hello Flamingo Events and Rentals, I would like to ask about an event.",
    `Name: ${name}`, `Phone: ${phone}`,
    f.get("date") ? `Date: ${f.get("date")}` : "",
    needs.length ? `I need: ${needs.join(", ")}` : "",
    f.get("message") ? `Details: ${f.get("message").trim()}` : "",
  ].filter(Boolean);
  window.open(wa(lines.join("\n")), "_blank", "noopener");
});

document.getElementById("yr").textContent = new Date().getFullYear();
