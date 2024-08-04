window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 0) {
    navbar.classList.add("active");
  } else {
    navbar.classList.remove("active");
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const navbarNav = document.querySelector(".navbar-nav");
  const underline = document.createElement("div");
  underline.classList.add("underline");
  navbarNav.appendChild(underline);

  navbarNav.addEventListener("mousemove", function (event) {
    const target = event.target.closest("a");
    if (target) {
      const rect = target.getBoundingClientRect();
      underline.style.width = `${rect.width}px`;
      underline.style.left = `${target.offsetLeft}px`;
    }
  });

  navbarNav.addEventListener("mouseleave", function () {
    underline.style.width = "0";
  });
});