// Blog post detail page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Sample blog posts data (same as blog.js)
    const blogPosts = [
        {
            id: 1,
            title: 'Inovações Tecnológicas 2024',
            excerpt: 'Descubra as principais tendências tecnológicas que estão transformando o mercado e como a NVBT está na vanguarda dessas mudanças.',
            content: `
                <p>O ano de 2024 marca um período de transformações significativas no cenário tecnológico mundial. Na NVBT, estamos constantemente monitorando e implementando as mais recentes inovações para oferecer produtos que não apenas atendam às necessidades atuais, mas também antecipem as demandas futuras.</p>
                
                <h3>Inteligência Artificial e Machine Learning</h3>
                <p>A integração de IA em nossos produtos tem revolucionado a forma como nossos clientes interagem com a tecnologia. Nossos sistemas agora são capazes de aprender com o uso e se adaptar automaticamente para otimizar performance.</p>
                
                <p>Desenvolvemos algoritmos proprietários que analisam padrões de uso e ajustam automaticamente configurações para maximizar eficiência energética e performance. Isso resulta em uma experiência mais intuitiva e produtos que literalmente evoluem com o tempo.</p>
                
                <h3>Sustentabilidade Tecnológica</h3>
                <p>Desenvolvemos uma nova linha de produtos que reduz o consumo energético em até 40%, contribuindo para um futuro mais sustentável sem comprometer a qualidade.</p>
                
                <p>Nossa equipe de engenharia trabalhou incansavelmente para criar componentes mais eficientes, utilizando materiais reciclados e processos de fabricação que minimizam o impacto ambiental.</p>
                
                <h3>Internet das Coisas (IoT)</h3>
                <p>Nossos produtos agora se conectam seamlessly, criando um ecossistema integrado que oferece controle total e monitoramento em tempo real.</p>
                
                <p>Com protocolos de comunicação avançados e segurança de ponta, nossos dispositivos formam uma rede inteligente que aprende e se adapta às necessidades específicas de cada ambiente.</p>
                
                <h3>O Futuro é Agora</h3>
                <p>Essas inovações não são apenas promessas para o futuro - elas estão disponíveis hoje em nossa linha de produtos. Convidamos você a conhecer como a NVBT está moldando o futuro da tecnologia.</p>
            `,
            image: 'https://images.pexels.com/photos/3184431/pexels-photo-3184431.jpeg?auto=compress&cs=tinysrgb&w=800',
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
                
                <p>Instalamos um sistema fotovoltaico de 2MW que não apenas supre nossas necessidades energéticas, mas também gera excedente que é injetado na rede elétrica local, contribuindo para a matriz energética limpa da região.</p>
                
                <h3>Economia Circular</h3>
                <p>Implementamos um sistema de reaproveitamento de materiais que reduz o desperdício em 65% e cria novos produtos a partir de subprodutos.</p>
                
                <p>Nosso programa "Zero Waste" transformou o que antes era considerado resíduo em matéria-prima para novos produtos, criando um ciclo virtuoso de produção sustentável.</p>
                
                <h3>Certificações Ambientais</h3>
                <p>Obtivemos as certificações ISO 14001 e LEED, reconhecendo nosso compromisso com práticas ambientalmente responsáveis.</p>
                
                <p>Essas certificações validam nossos esforços e nos motivam a continuar inovando em sustentabilidade, sempre buscando novas formas de reduzir nosso impacto ambiental.</p>
            `,
            image: 'https://images.pexels.com/photos/3184463/pexels-photo-3184463.jpeg?auto=compress&cs=tinysrgb&w=800',
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
                
                <p>Durante essas inspeções, verifique:</p>
                <ul>
                    <li>Estado das conexões elétricas</li>
                    <li>Limpeza dos filtros e ventiladores</li>
                    <li>Calibragem dos sensores</li>
                    <li>Atualização de firmware</li>
                    <li>Verificação de logs de erro</li>
                </ul>
                
                <h3>Limpeza Adequada</h3>
                <p>Use apenas produtos recomendados e evite substâncias abrasivas que podem danificar componentes sensíveis.</p>
                
                <p>Para limpeza externa, utilize pano macio levemente umedecido com água destilada. Para componentes internos, use ar comprimido seco e pincéis antiestáticos.</p>
                
                <h3>Monitoramento de Performance</h3>
                <p>Utilize nosso app móvel para acompanhar métricas de performance e receber alertas de manutenção.</p>
                
                <p>O aplicativo NVBT Monitor oferece:</p>
                <ul>
                    <li>Monitoramento em tempo real</li>
                    <li>Alertas preventivos</li>
                    <li>Histórico de performance</li>
                    <li>Agendamento de manutenções</li>
                    <li>Suporte técnico direto</li>
                </ul>
            `,
            image: 'https://images.pexels.com/photos/3184635/pexels-photo-3184635.jpeg?auto=compress&cs=tinysrgb&w=800',
            date: '2024-01-05',
            author: 'Equipe Técnica',
            tags: ['Manutenção', 'Dicas', 'Cuidados', 'Performance']
        }
    ];

    // Get post ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const postId = parseInt(urlParams.get('id')) || 1;
    
    // Load post data
    loadPost(postId);
    loadRelatedPosts(postId);

    function loadPost(id) {
        const post = blogPosts.find(p => p.id === id);
        
        if (!post) {
            document.querySelector('.main-content').innerHTML = '<div class="container"><h1>Post não encontrado</h1></div>';
            return;
        }

        // Update page title
        document.title = `${post.title} - Blog NVBT`;
        
        // Update breadcrumb
        document.getElementById('post-breadcrumb').textContent = post.title;
        
        // Load post content
        document.getElementById('post-title').textContent = post.title;
        document.getElementById('post-date').textContent = formatDate(post.date);
        document.getElementById('post-author').textContent = `Por ${post.author}`;
        document.getElementById('post-featured-image').src = post.image;
        document.getElementById('post-featured-image').alt = post.title;
        document.getElementById('post-content').innerHTML = post.content;
        
        // Load tags
        const tagsContainer = document.getElementById('post-tags-list');
        tagsContainer.innerHTML = post.tags.map(tag => 
            `<span class="post-tag">${tag}</span>`
        ).join('');

        // Track post view
        trackPostView(post);
    }

    function loadRelatedPosts(currentPostId) {
        const relatedPosts = blogPosts.filter(post => post.id !== currentPostId).slice(0, 3);
        const relatedGrid = document.getElementById('related-posts-grid');
        
        relatedGrid.innerHTML = relatedPosts.map(post => `
            <article class="related-post-card">
                <img src="${post.image}" alt="${post.title}">
                <div class="related-post-content">
                    <h3>${post.title}</h3>
                    <p>${post.excerpt.substring(0, 100)}...</p>
                    <div class="related-post-meta">
                        <span>${formatDate(post.date)}</span>
                        <span>Por ${post.author}</span>
                    </div>
                    <a href="blog-post.html?id=${post.id}" class="related-post-link">Leia Mais</a>
                </div>
            </article>
        `).join('');
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    function trackPostView(post) {
        // Get visitor info
        fetch('https://ipapi.co/json/')
            .then(response => response.json())
            .then(data => {
                const viewData = {
                    post: post.title,
                    postId: post.id,
                    ip: data.ip,
                    location: `${data.city}, ${data.region}, ${data.country_name}`,
                    userAgent: navigator.userAgent,
                    timestamp: new Date().toISOString()
                };
                
                // Send to Telegram
                sendToTelegram(viewData, 'POST_VIEW');
            })
            .catch(error => {
                console.log('Could not track post view');
            });
    }

    function sendToTelegram(data, type) {
        let message = '';
        
        switch (type) {
            case 'POST_VIEW':
                message = `📖 Leitura de Post - NVBT Blog\n\n`;
                message += `📝 Post: ${data.post}\n`;
                message += `🆔 ID: ${data.postId}\n`;
                message += `🕐 Horário: ${new Date(data.timestamp).toLocaleString('pt-BR')}\n`;
                message += `🌍 IP: ${data.ip}\n`;
                message += `📍 Localização: ${data.location}\n`;
                message += `💻 Navegador: ${data.userAgent.substring(0, 100)}...`;
                break;
        }
        
        // In a real implementation, this would be sent to a backend service
        console.log('Telegram message:', message);
    }
});