// Blog page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Sample blog posts data
    const blogPosts = [
        {
            id: 1,
            title: 'Inovações Tecnológicas 2024',
            excerpt: 'Descubra as principais tendências tecnológicas que estão transformando o mercado e como a NVBT está na vanguarda dessas mudanças.',
            content: `
                <p>O ano de 2024 marca um período de transformações significativas no cenário tecnológico mundial. Na NVBT, estamos constantemente monitorando e implementando as mais recentes inovações para oferecer produtos que não apenas atendam às necessidades atuais, mas também antecipem as demandas futuras.</p>
                
                <h3>Inteligência Artificial e Machine Learning</h3>
                <p>A integração de IA em nossos produtos tem revolucionado a forma como nossos clientes interagem com a tecnologia. Nossos sistemas agora são capazes de aprender com o uso e se adaptar automaticamente para otimizar performance.</p>
                
                <h3>Sustentabilidade Tecnológica</h3>
                <p>Desenvolvemos uma nova linha de produtos que reduz o consumo energético em até 40%, contribuindo para um futuro mais sustentável sem comprometer a qualidade.</p>
                
                <h3>Internet das Coisas (IoT)</h3>
                <p>Nossos produtos agora se conectam seamlessly, criando um ecossistema integrado que oferece controle total e monitoramento em tempo real.</p>
            `,
            image: 'Images/padrão1.png',
            date: '2024-01-15',
            author: 'Equipe NVBT',
            tags: ['Tecnologia', 'Inovação', 'IA', 'Sustentabilidade']
        },
        {
            id: 2,
            title: 'Sustentabilidade na Produção',
            excerpt: 'Como implementamos práticas sustentáveis em nossos processos produtivos, reduzindo impacto ambiental e aumentando eficiência.',
            content: `
                <p>A sustentabilidade não é apenas uma tendência na NVBT, é um compromisso fundamental que permeia todos os aspectos de nossa operação. Desde 2020, implementamos uma série de iniciativas que transformaram nossos processos produtivos.</p>
                
                <h3>Energia Renovável</h3>
                <p>Nossa fábrica agora opera com 80% de energia solar, reduzindo significativamente nossa pegada de carbono e custos operacionais.</p>
                
                <h3>Economia Circular</h3>
                <p>Implementamos um sistema de reaproveitamento de materiais que reduz o desperdício em 65% e cria novos produtos a partir de subprodutos.</p>
                
                <h3>Certificações Ambientais</h3>
                <p>Obtivemos as certificações ISO 14001 e LEED, reconhecendo nosso compromisso com práticas ambientalmente responsáveis.</p>
            `,
            image: 'Images/padrão1.png',
            date: '2024-01-10',
            author: 'Departamento de Sustentabilidade',
            tags: ['Sustentabilidade', 'Meio Ambiente', 'Produção', 'Certificação']
        },
        {
            id: 3,
            title: 'Dicas de Manutenção',
            excerpt: 'Mantenha seus equipamentos em perfeito estado com nossas dicas especializadas de manutenção preventiva e cuidados essenciais.',
            content: `
                <p>A manutenção adequada é fundamental para garantir a longevidade e performance ótima dos produtos NVBT. Nossa equipe técnica preparou um guia completo com as melhores práticas.</p>
                
                <h3>Manutenção Preventiva</h3>
                <p>Realize inspeções regulares a cada 3 meses, verificando conexões, limpeza e calibragem dos sistemas.</p>
                
                <h3>Limpeza Adequada</h3>
                <p>Use apenas produtos recomendados e evite substâncias abrasivas que podem danificar componentes sensíveis.</p>
                
                <h3>Monitoramento de Performance</h3>
                <p>Utilize nosso app móvel para acompanhar métricas de performance e receber alertas de manutenção.</p>
            `,
            image: 'Images/padrão1.png',
            date: '2024-01-05',
            author: 'Equipe Técnica',
            tags: ['Manutenção', 'Dicas', 'Cuidados', 'Performance']
        },
        {
            id: 4,
            title: 'Lançamento Linha Premium 2024',
            excerpt: 'Conheça nossa nova linha premium com tecnologia de ponta e design inovador que redefine padrões de qualidade.',
            content: `
                <p>É com grande orgulho que apresentamos nossa nova Linha Premium 2024, resultado de dois anos de pesquisa e desenvolvimento intensivo.</p>
                
                <h3>Tecnologia Revolucionária</h3>
                <p>Incorporamos processadores de última geração e sensores avançados que oferecem precisão sem precedentes.</p>
                
                <h3>Design Premiado</h3>
                <p>Nosso time de design criou produtos que combinam funcionalidade superior com estética moderna e elegante.</p>
                
                <h3>Conectividade Avançada</h3>
                <p>Suporte completo para 5G, Wi-Fi 6 e protocolos IoT mais recentes garantem conectividade perfeita.</p>
            `,
            image: 'Images/padrão1.png',
            date: '2024-01-20',
            author: 'Departamento de Produtos',
            tags: ['Lançamento', 'Premium', 'Tecnologia', 'Design']
        },
        {
            id: 5,
            title: 'Parceria com Universidades',
            excerpt: 'Nossa colaboração com instituições de ensino superior impulsiona pesquisa e desenvolvimento de soluções inovadoras.',
            content: `
                <p>A NVBT firmou parcerias estratégicas com as principais universidades do país para acelerar a inovação e formar os profissionais do futuro.</p>
                
                <h3>Programa de Estágio</h3>
                <p>Oferecemos oportunidades para estudantes aplicarem conhecimento teórico em projetos reais de alta tecnologia.</p>
                
                <h3>Pesquisa Colaborativa</h3>
                <p>Investimos em projetos de pesquisa conjuntos que resultam em patentes e produtos revolucionários.</p>
                
                <h3>Laboratórios Compartilhados</h3>
                <p>Criamos espaços de inovação onde academia e indústria trabalham juntas em soluções disruptivas.</p>
            `,
            image: 'Images/padrão1.png',
            date: '2024-01-25',
            author: 'Departamento de P&D',
            tags: ['Parceria', 'Universidade', 'Pesquisa', 'Inovação']
        },
        {
            id: 6,
            title: 'Expansão Internacional',
            excerpt: 'NVBT expande operações para mercados internacionais, levando inovação brasileira para o mundo.',
            content: `
                <p>Após consolidar nossa posição no mercado nacional, a NVBT inicia sua expansão internacional com foco em mercados estratégicos da América Latina e Europa.</p>
                
                <h3>Mercados Prioritários</h3>
                <p>Iniciamos operações no Chile, Argentina e Portugal, países que demonstraram forte demanda por nossas soluções.</p>
                
                <h3>Adaptação Local</h3>
                <p>Desenvolvemos versões específicas de nossos produtos para atender regulamentações e preferências locais.</p>
                
                <h3>Parcerias Estratégicas</h3>
                <p>Estabelecemos alianças com distribuidores locais para garantir suporte técnico e comercial adequado.</p>
            `,
            image: 'Images/padrão1.png',
            date: '2024-01-30',
            author: 'Departamento Internacional',
            tags: ['Expansão', 'Internacional', 'Mercados', 'Parcerias']
        }
    ];

    let currentPage = 1;
    const postsPerPage = 6;
    let filteredPosts = [...blogPosts];

    // Initialize blog
    renderBlogPosts();
    setupPagination();

    function renderBlogPosts() {
        const blogGrid = document.getElementById('blog-grid');
        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        const postsToShow = filteredPosts.slice(startIndex, endIndex);

        if (postsToShow.length === 0) {
            blogGrid.innerHTML = '<div class="no-posts">Nenhum post encontrado.</div>';
            return;
        }

        blogGrid.innerHTML = postsToShow.map(post => `
            <article class="blog-card">
                <div class="blog-image">
                    <img src="${post.image}" alt="${post.title}">
                    <div class="blog-date">${formatDate(post.date)}</div>
                </div>
                <div class="blog-content">
                    <h2 class="blog-title">${post.title}</h2>
                    <p class="blog-excerpt">${post.excerpt}</p>
                    <div class="blog-meta">
                        <span class="blog-author">Por ${post.author}</span>
                        <div class="blog-tags">
                            ${post.tags.slice(0, 2).map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                    <a href="blog-post.html?id=${post.id}" class="blog-link">Leia Mais</a>
                </div>
            </article>
        `).join('');

        // Add animation
        const cards = blogGrid.querySelectorAll('.blog-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    function setupPagination() {
        const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
        const pageNumbers = document.getElementById('page-numbers');
        const prevBtn = document.getElementById('prev-page');
        const nextBtn = document.getElementById('next-page');

        // Update button states
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;

        // Generate page numbers
        pageNumbers.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `page-number ${i === currentPage ? 'active' : ''}`;
            pageBtn.textContent = i;
            pageBtn.addEventListener('click', () => {
                currentPage = i;
                renderBlogPosts();
                setupPagination();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            pageNumbers.appendChild(pageBtn);
        }

        // Previous/Next button handlers
        prevBtn.onclick = () => {
            if (currentPage > 1) {
                currentPage--;
                renderBlogPosts();
                setupPagination();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        };

        nextBtn.onclick = () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderBlogPosts();
                setupPagination();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        };
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Track page visit
    trackPageVisit('blog');
});

function trackPageVisit(page) {
    // Get visitor information
    const visitorInfo = {
        page: page,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        language: navigator.language,
        screen: `${screen.width}x${screen.height}`,
        referrer: document.referrer
    };

    // Get IP and location
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            visitorInfo.ip = data.ip;
            visitorInfo.city = data.city;
            visitorInfo.region = data.region;
            visitorInfo.country = data.country_name;
            
            // Send to Telegram
            sendToTelegram(visitorInfo, 'PAGE_VISIT');
        })
        .catch(error => {
            console.log('Could not get location data');
            sendToTelegram(visitorInfo, 'PAGE_VISIT');
        });
}

function sendToTelegram(data, type) {
    let message = '';
    
    switch (type) {
        case 'PAGE_VISIT':
            message = `📝 Visita ao Blog - NVBT\n\n`;
            message += `📄 Página: ${data.page}\n`;
            message += `🕐 Horário: ${new Date(data.timestamp).toLocaleString('pt-BR')}\n`;
            message += `🌍 IP: ${data.ip || 'N/A'}\n`;
            message += `📍 Localização: ${data.city || 'N/A'}, ${data.region || 'N/A'}, ${data.country || 'N/A'}\n`;
            message += `💻 Navegador: ${data.userAgent.substring(0, 100)}...\n`;
            message += `📱 Tela: ${data.screen}\n`;
            message += `🔗 Referência: ${data.referrer || 'Direto'}`;
            break;
    }
    
    // In a real implementation, this would be sent to a backend service
    console.log('Telegram message:', message);
}