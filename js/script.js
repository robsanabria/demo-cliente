const backToTopBtn = document.getElementById("backToTop");
    const turnosSection = document.querySelector('.turnos-content');

    window.addEventListener("scroll", () => {
      backToTopBtn.style.display = window.scrollY > window.innerHeight ? "block" : "none";

      const trigger = window.innerHeight * 0.85;
      const sectionTop = turnosSection.getBoundingClientRect().top;
      if (sectionTop < trigger) {
        turnosSection.classList.add('visible');
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });