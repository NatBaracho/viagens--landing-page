document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Intersection Observer para Animações de Fade-in (Surgimento na tela)
    // Seleciona todos os elementos que possuem a classe .fade-in
    const faders = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.15, // O elemento precisa estar 15% visível para animar
        rootMargin: "0px 0px -50px 0px" // Dispara um pouco antes do elemento cruzar o topo/base
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return; // Se não estiver na tela, não faz nada
            
            // Adiciona a classe que ativa a transição do CSS
            entry.target.classList.add('appear');
            // Para de observar o elemento após a animação rodar 1 vez (melhora a performance)
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // 2. ScrollSpy (Destacar item do menu baseado na seção atual)
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            // Pega a distância do topo e a altura da seção
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Verifica se o usuário scrollou até esta seção (com margem de erro pro menu fixo)
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // 3. Lógica avançada do Botão "Voltar ao Topo"
    const btnTopo = document.getElementById("btnTopo");

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btnTopo.classList.add("visible");
        } else {
            btnTopo.classList.remove("visible");
        }
    });
});