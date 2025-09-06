// script.js
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("searchBtn");
  const input = document.getElementById("search");

  if (btn && input) {
    btn.addEventListener("click", () => {
      alert(`Buscando: ${input.value}`);
    });
  }
});
