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
            goodDiv.classList.add('card__content-index');
            goodDiv.dataset.zone = item.zone;
            goodDiv.dataset.size = item.size;
            goodDiv.dataset.price = item.cost;
            goodDiv.dataset.area = item.area;

            // <h3>${item.name}</h3>
            // <img src="${item.image}" alt="${item.name}">
            // <p>Стоимость: ${item.cost} млн P</p>
            // <p>Площадь: ${item.area} м2</p>
            // <button class="remove-favorite-button" data-id="${item.name}">Удалить из избранного</button>
            // <button class="favorite-button" data-id="${item.name}"></button>
            goodDiv.innerHTML = `
            <div class="card__title">
                    <h3 class="filter__card-title">${item.name}</h3>
                    <button class="remove-favorite-button" data-id="${item.name}">
                        <img class="remove-favorite-button" src="./img/Vector-Heart-icon-fill.svg" alt="Remove from favorites"></img>
                    </button>
                </div>
                <div class="card__img">
                    <img class="filter__card-img" src="${item.image}" alt="${item.name}">
                </div>
                <div class="card__text">
                    <p class="filter__card-price">${item.cost} P</p>
                    <p class="filter__card-flat">${item.flat!== undefined? item.flat : ''}</p>
                    <p class="filter__card-area">Площадь: ${item.area} м2</p>
                </div>
            `;
            favoriteContainer.appendChild(goodDiv);
        });

        favoriteContainer.querySelectorAll('.remove-favorite-button').forEach(button => {
            button.addEventListener('click', removeFromFavorite);
            console.log('click');
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
