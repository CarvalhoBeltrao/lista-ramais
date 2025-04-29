document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const ramalItems = document.querySelectorAll('.ramal-item');
    const ramalSections = document.querySelectorAll('.ramal-section');

    function filterRamais() {
        const searchTerm = searchInput.value.toLowerCase();
        const categoryValue = categoryFilter.value;

        ramalSections.forEach(section => {
            section.classList.add('hidden');
        });

        ramalItems.forEach(item => {
            const ramalName = item.querySelector('.ramal-name').textContent.toLowerCase();
            const ramalNumber = item.querySelector('.ramal-number') ? 
                                item.querySelector('.ramal-number').textContent.toLowerCase() : '';
            const itemCategory = item.getAttribute('data-category');
            const itemSection = item.closest('.ramal-section')?.id || '';

            const matchesSearch = ramalName.includes(searchTerm) || 
                                  ramalNumber.includes(searchTerm) || 
                                  itemSection.includes(searchTerm);

            const matchesCategory = categoryValue === 'todos' || itemCategory === categoryValue;

            if (matchesSearch && matchesCategory) {
                item.classList.remove('hidden');
                const parentSection = item.closest('.ramal-section');
                parentSection.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });

        ramalSections.forEach(section => {
            const visibleItems = section.querySelectorAll('.ramal-item:not(.hidden)');
            if (visibleItems.length > 0) {
                section.classList.remove('hidden');
            } else {
                section.classList.add('hidden');
            }
        });
    }

    searchInput.addEventListener('input', filterRamais);
    categoryFilter.addEventListener('change', filterRamais);
});
