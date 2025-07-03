document.addEventListener('DOMContentLoaded', () => {
    // Executa apenas se estiver na página de sustentabilidade
    const sustainabilityPage = document.querySelector('.sustainability-layout');
    if (!sustainabilityPage) return;

    const navItems = document.querySelectorAll('.sustainability-nav-item');
    const contentItems = document.querySelectorAll('.tab-content');

    const switchTab = (tabId) => {
        // Atualiza os botões de navegação
        navItems.forEach(item => {
            item.classList.toggle('active', item.dataset.tab === tabId);
        });

        // Atualiza os painéis de conteúdo
        contentItems.forEach(content => {
            content.classList.toggle('active', content.id === `tab-content-${tabId}`);
        });

        // Atualiza a URL hash sem pular a página
        history.pushState(null, null, `#${tabId}`);
    };

    // Event listener para cliques nos botões de navegação
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const tabId = item.dataset.tab;
            switchTab(tabId);
        });
    });

    // Verifica se há uma hash na URL ao carregar a página
    const currentHash = window.location.hash.substring(1);
    const validTabs = Array.from(navItems).map(item => item.dataset.tab);

    if (currentHash && validTabs.includes(currentHash)) {
        switchTab(currentHash);
    } else {
        // Se não houver hash válida, ativa a primeira aba como padrão
        switchTab('principle');
    }
});