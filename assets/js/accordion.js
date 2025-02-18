const accordions = document.querySelectorAll(".accordion-flex");

accordions.forEach(accordion => {
    accordion.addEventListener("click", () => {
        accordion.classList.toggle("ativo");

        const conteudo = accordion.querySelector(".accordion-conteudo");

        if (conteudo) {
            conteudo.style.display = conteudo.style.display === "inline-block" ? "none" : "inline-block";
        }
    });
});
