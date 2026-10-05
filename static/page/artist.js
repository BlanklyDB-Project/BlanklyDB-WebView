(function() {

    var PLATFORM_MAP = {
        bilibili: { icon: 'icon-bilibili-fill', name: 'BiliBili' },
        twitter:  { icon: 'icon-tuite',         name: 'X(Twitter)' },
        pixiv:    { icon: 'icon-brands-pixiv',  name: 'Pixiv' }
    };

    function createCreatorCard() {
        var card = document.createElement('div');
        card.className = 'bdd-border-l4 bdd-100-width flex bdd-flex-ai-center bdd-box-shadow bg-white';
        card.style.cssText = 'margin-bottom:0.5rem;height:100px;gap:1rem;padding-left:1rem;';

        var avatar = document.createElement('div');
        avatar.className = 'loadselect';
        avatar.style.cssText = 'border-radius:50%;width:2.7rem;height:2.7rem;flex-shrink:0;';

        var infoWrap = document.createElement('div');
        infoWrap.style.cssText = 'flex:1;min-width:0;';

        var infoLine = document.createElement('div');
        infoLine.id = 'creator-info';

        var namePlaceholder = document.createElement('div');
        namePlaceholder.className = 'loadselect';
        namePlaceholder.style.cssText = 'width:5rem;height:1rem;border-radius:2px;';

        var badge1 = document.createElement('div');
        badge1.className = 'loadselect';
        badge1.style.cssText = 'width:3.5rem;height:1.2rem;border-radius:2px;';

        var badge2 = document.createElement('div');
        badge2.className = 'loadselect';
        badge2.style.cssText = 'width:3.5rem;height:1.2rem;border-radius:2px;';

        var badge3 = document.createElement('div');
        badge3.className = 'loadselect';
        badge3.style.cssText = 'width:3.5rem;height:1.2rem;border-radius:2px;';

        var descPlaceholder = document.createElement('div');
        descPlaceholder.className = 'loadselect';
        descPlaceholder.style.cssText = 'margin-top:0.5rem;width:12rem;height:0.8rem;border-radius:2px;';

        var btnPlaceholder = document.createElement('div');
        btnPlaceholder.className = 'loadselect';
        btnPlaceholder.style.cssText = 'margin:0 1rem 0 auto;width:8rem;height:2rem;border-radius:3px;flex-shrink:0;';

        infoLine.appendChild(namePlaceholder);
        infoLine.appendChild(badge1);
        infoLine.appendChild(badge2);
        infoLine.appendChild(badge3);
        infoWrap.appendChild(infoLine);
        infoWrap.appendChild(descPlaceholder);

        card.appendChild(avatar);
        card.appendChild(infoWrap);
        card.appendChild(btnPlaceholder);

        card._creatorData = null;

        return card;
    }

    function fillCreatorCard(card, data) {
        if (!card || !data) {
            return;
        }

        card._creatorData = data;

        card.innerHTML = '';

        var avatar = document.createElement('img');
        avatar.src = data.avatar || '';
        avatar.style.cssText = 'border-radius:50%;width:2.7rem;height:2.7rem;flex-shrink:0;';

        var infoWrap = document.createElement('div');
        infoWrap.style.cssText = 'flex:1;min-width:0;';

        var infoLine = document.createElement('div');
        infoLine.id = 'creator-info';

        var nameEl = document.createElement('p');
        nameEl.className = 'bdd-content-13 font-Alimom-bold';
        nameEl.textContent = data.name || '';

        infoLine.appendChild(nameEl);

        if (data.platforms && data.platforms.length > 0) {
            data.platforms.forEach(function(p) {
                var cfg = PLATFORM_MAP[p.code];
                if (!cfg) {
                    return;
                }
                var badge = document.createElement('a');
                badge.className = 'bdd-badge bdd-content-13 ' + cfg.icon;
                badge.href = p.url || '#';
                badge.textContent = cfg.name;
                infoLine.appendChild(badge);
            });
        }

        var descEl = document.createElement('p');
        descEl.className = 'bdd-content-13 text-gary font-Alimom';
        descEl.style.cssText = 'margin-top:0.5rem;';
        descEl.textContent = data.description || '';

        infoWrap.appendChild(infoLine);
        infoWrap.appendChild(descEl);

        var btn = document.createElement('button');
        btn.className = 'btn btn-blue';
        btn.style.cssText = 'margin:0 1rem 0 auto;flex-shrink:0;cursor:pointer;';
        btn.textContent = 'BlanklyDB创作者主页';
        if (data.homepage) {
            btn.addEventListener('click', function() {
                window.location.href = data.homepage;
            });
        }

        card.appendChild(avatar);
        card.appendChild(infoWrap);
        card.appendChild(btn);
    }

    function appendCreatorCards(container, dataList, batch) {
        if (batch === undefined) {
            batch = true;
        }

        if (batch) {
            var fragment = document.createDocumentFragment();
            dataList.forEach(function(data) {
                var card = createCreatorCard();
                fillCreatorCard(card, data);
                fragment.appendChild(card);
            });
            container.appendChild(fragment);
        } else {
            dataList.forEach(function(data) {
                var card = createCreatorCard();
                container.appendChild(card);
                fillCreatorCard(card, data);
            });
        }
    }

    function appendCreatorCardLazy(container, dataList) {
        var index = 0;
        var total = dataList.length;

        function appendNext() {
            if (index >= total) {
                return;
            }
            var card = createCreatorCard();
            container.appendChild(card);

            setTimeout(function() {
                fillCreatorCard(card, dataList[index]);
                index++;
                appendNext();
            }, 120);
        }

        appendNext();
    }

    window.BDBCreator = {
        PLATFORM_MAP: PLATFORM_MAP,
        createCreatorCard: createCreatorCard,
        fillCreatorCard: fillCreatorCard,
        appendCreatorCards: appendCreatorCards,
        appendCreatorCardLazy: appendCreatorCardLazy
    };

})();
