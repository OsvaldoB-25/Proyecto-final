
    function initTailwind() 
    {
    }

    const skills = [
      { name: "React / Next.js", level: 95, icon: "⚛️" },
      { name: "TypeScript", level: 90, icon: "🔷" },
      { name: "Tailwind CSS", level: 98, icon: "🌊" },
      { name: "Node.js", level: 88, icon: "🟢" },
      { name: "Python", level: 75, icon: "🐍" },
      { name: "PostgreSQL", level: 82, icon: "🐘" },
      { name: "AWS", level: 70, icon: "☁️" },
      { name: "Figma", level: 85, icon: "🎨" }
    ];

    function renderSkills() 
    {
      const container = document.getElementById('skills-container');
      container.innerHTML = skills.map(skill => `
        <div class="bg-zinc-800 rounded-3xl p-8 hover:bg-zinc-700 transition-all card-hover">
          <div class="text-4xl mb-6">${skill.icon}</div>
          <h4 class="font-semibold mb-4">${skill.name}</h4>
          <div class="h-2 bg-zinc-700 rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all" 
                 style="width: ${skill.level}%"></div>
          </div>
          <div class="text-right text-xs text-zinc-400 mt-1">${skill.level}%</div>
        </div>
      `).join('');
    }

    let projects = [
      {
        id: 1,
        title: "Ecommerce Nebula",
        description: "Plataforma de comercio electrónico con carrito avanzado y pagos integrados.",
        image: "https://picsum.photos/id/201/600/400",
        tech: ["Next.js", "Stripe", "Tailwind"],
        link: "#"
      },
      {
        id: 2,
        title: "TaskFlow - Gestión de proyectos",
        description: "Aplicación SaaS para gestión de equipos con tiempo real.",
        image: "https://picsum.photos/id/237/600/400",
        tech: ["React", "Firebase", "Recharts"],
        link: "#"
      },
      {
        id: 3,
        title: "FitTrack Mobile",
        description: "App de seguimiento de fitness con análisis de datos.",
        image: "https://picsum.photos/id/251/600/400",
        tech: ["React Native", "Supabase"],
        link: "#"
      }
    ];

    function renderProjects() 
    {
      const container = document.getElementById('projects-grid');
      container.innerHTML = projects.map(project => `
        <div onclick="showProjectModal(${project.id})" 
             class="bg-zinc-800 rounded-3xl overflow-hidden cursor-pointer card-hover">
          <img src="${project.image}" class="w-full h-52 object-cover">
          <div class="p-8">
            <h3 class="font-semibold text-xl mb-3">${project.title}</h3>
            <p class="text-zinc-400 text-sm line-clamp-3 mb-6">${project.description}</p>
            <div class="flex flex-wrap gap-2">
              ${project.tech.map(t => `<span class="text-xs bg-zinc-700 px-3 py-1 rounded-full">${t}</span>`).join('')}
            </div>
          </div>
        </div>
      `).join('');
    }

    function showProjectModal(id) 
    {
      const project = projects.find(p => p.id === id);
      if (!project) return;

      const modalContent = document.getElementById('modal-content');
      modalContent.innerHTML = `
        <img src="${project.image}" class="w-full h-80 object-cover rounded-2xl mb-8">
        <h2 class="text-3xl font-bold mb-4">${project.title}</h2>
        <p class="text-zinc-300 mb-8">${project.description}</p>
        
        <div class="flex gap-3 mb-10">
          ${project.tech.map(t => `<span class="px-5 py-2 bg-zinc-700 text-sm rounded-2xl">${t}</span>`).join('')}
        </div>
        
        <a href="${project.link}" target="_blank"
           class="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:bg-zinc-200 transition-colors">
          Ver proyecto en vivo
          <i class="fas fa-external-link-alt"></i>
        </a>
      `;
      
      document.getElementById('project-modal').classList.remove('hidden');
      document.getElementById('project-modal').classList.add('flex');
    }

    function closeModal() 
    {
      const modal = document.getElementById('project-modal');
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }

    async function fetchRandomProjects() 
    {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=6');
        const data = await response.json();
        
        projects = data.slice(0, 3).map((item, index) => ({
          id: index + 1,
          title: `Proyecto Demo ${index + 1}`,
          description: item.title.substring(0, 120) + "...",
          image: item.url,
          tech: ["API", "JS", "Tailwind"],
          link: "#"
        }));
        
        renderProjects();
        
        const notif = document.createElement('div');
        notif.className = "fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-3 z-[200]";
        notif.innerHTML = `✅ Proyectos actualizados desde API`;
        document.body.appendChild(notif);
        
        setTimeout(() => 
        {
          notif.style.transition = "all 0.4s";
          notif.style.opacity = "0";
          setTimeout(() => notif.remove(), 400);
        }, 2800);
      } catch (e) {
        alert("Error al consumir la API");
      }
    }

    function toggleMobileMenu() 
    {
      const menu = document.getElementById('mobile-menu');
      const icon = document.getElementById('menu-icon');
      
      if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        menu.classList.add('hidden');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
      }
    }

    function toggleDarkMode() 
    {
      alert("¡Ya estás en modo oscuro! 🌙 Este portafolio está optimizado para dark mode.");
    }

    function setupForm() 
    {
      const form = document.getElementById('contact-form');
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        
        if (name.trim() === '') 
        {
          alert("Por favor ingresa tu nombre");
          return;
        }
        
        const btn = form.querySelector('button');
        const originalText = btn.textContent;
        
        btn.innerHTML = `
          <span class="inline-block animate-spin mr-2">⟳</span>
          Enviando...
        `;
        btn.disabled = true;
        
        setTimeout(() => {
          alert(`¡Gracias ${name}! Tu mensaje ha sido recibido. (Demo)`);
          form.reset();
          btn.innerHTML = originalText;
          btn.disabled = false;
        }, 1600);
      });
    }

    function setupScrollAnimations() 
    {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      }, { threshold: 0.1 });
      
      document.querySelectorAll('section').forEach(section => {
        section.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
        section.style.opacity = "0";
        section.style.transform = "translateY(40px)";
        observer.observe(section);
      });
    }

    function setupKeyboard() 
    {
      document.addEventListener('keydown', (e) => {
        if (e.key === "/" && document.getElementById('project-modal').classList.contains('hidden')) {
          e.preventDefault();
          fetchRandomProjects();
        }
      });
    }

    function init() 
    {
      initTailwind();
      renderSkills();
      renderProjects();
      setupForm();
      setupScrollAnimations();
      setupKeyboard();
      
      document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") 
        {
          const modal = document.getElementById('project-modal');
          if (!modal.classList.contains('hidden')) closeModal();
        }
      });
      
      console.log('%c✅ Portafolio cargado correctamente', 'color: #60a5fa; font-family: monospace;');
    }

    window.onload = init;