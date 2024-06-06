document.addEventListener('DOMContentLoaded', function() {
    const favoriteContainer = document.getElementById('favorite-goods');
    const favoriteCountElement = document.getElementById('favorite-count');

    function renderFavoriteGoods() {
        const favoriteItems = getFavoriteItems();
        const favoriteData = window.DATA.filter(item => favoriteItems.includes(item.name));
        favoriteContainer.innerHTML = '';
        
        if (favoriteData.length === 0) {
            favoriteContainer.innerHTML = '<p class="favourite-text">Еще не добавлено ни одной квартиры или машиноместа</p>';
            return;
        }

        favoriteData.forEach(item => {
            const goodDiv = document.createElement('div');
            goodDiv.classList.add('single-goods');
            goodDiv.dataset.zone = item.zone;
            goodDiv.dataset.size = item.size;
            goodDiv.dataset.price = item.cost;
            goodDiv.dataset.area = item.area;

            goodDiv.innerHTML = `
                <h3>${item.name}</h3>
                <img src="${item.image}" alt="${item.name}">
                <p>Стоимость: ${item.cost} млн P</p>
                <p>Площадь: ${item.area} м2</p>
                <button class="remove-favorite-button" data-id="${item.name}">Удалить из избранного</button>
            `;
            favoriteContainer.appendChild(goodDiv);
        });

        favoriteContainer.querySelectorAll('.remove-favorite-button').forEach(button => {
            button.addEventListener('click', removeFromFavorite);
        });
    }

    function getFavoriteItems() {
        const cookies = document.cookie.split('; ');
        const favoriteCookie = cookies.find(row => row.startsWith('favorite='));
        return favoriteCookie ? JSON.parse(decodeURIComponent(favoriteCookie.split('=')[1])) : [];
    }

    function setFavoriteItems(items) {
        const encodedItems = encodeURIComponent(JSON.stringify(items));
        document.cookie = `favorite=${encodedItems}; path=/; max-age=${60*60*24*30}`;
    }

    function removeFromFavorite(event) {
        const itemName = event.target.dataset.id;
        let favoriteItems = getFavoriteItems();
        favoriteItems = favoriteItems.filter(item => item !== itemName);
        setFavoriteItems(favoriteItems);
        updateFavoriteCount();
        renderFavoriteGoods();
    }

    function updateFavoriteCount() {
        const favoriteItems = getFavoriteItems();
        if (favoriteCountElement) {
            favoriteCountElement.textContent = favoriteItems.length;
        }
    }

    // Если контейнер существует, обновляем избранные товары
    if (favoriteContainer) {
        renderFavoriteGoods();
    }
    
    // Обновляем счетчик избранных товаров
    updateFavoriteCount();
});
