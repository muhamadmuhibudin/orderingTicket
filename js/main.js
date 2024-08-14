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

// untuk penambahan container muncul ke kanan ketika di input

document.getElementById("origin").addEventListener("input", function () {
  const originValue = document.getElementById("origin").value;
  const destinationValue = document.getElementById("destination").value;

  if (originValue && !destinationValue) {
    document.getElementById("container2").classList.add("show1");
    document.getElementById("container3").classList.remove("show2");
  } else if (originValue && destinationValue) {
    document.getElementById("container2").classList.add("show1");
    document.getElementById("container3").classList.add("show2");
  } else {
    document.getElementById("container2").classList.remove("show1");
    document.getElementById("container3").classList.remove("show2");
  }
});

document.getElementById("destination").addEventListener("input", function () {
  const destinationValue = document.getElementById("destination").value;

  if (destinationValue) {
    document.getElementById("container3").classList.add("show2");
  } else {
    document.getElementById("container3").classList.remove("show2");
  }
});

// selesai container
