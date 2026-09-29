(function() {
    var path = window.location.pathname;
    var BASE = (path.indexOf('/viewer/') !== -1 || path.indexOf('/error/') !== -1) ? '..' : '.';
    var compBase = BASE + '/static/component';
    var loadedCount = 0;
    var totalComponents = 2;

    function loadComponent(name, targetSelector, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', compBase + '/' + name + '.html', true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var html = xhr.responseText;
                html = html.replace(/\{BASE\}/g, BASE);
                var el = document.querySelector(targetSelector);
                if (el) { el.innerHTML = html; }
                if (callback) { callback(); }
            }
        };
        xhr.send();
    }

    function isIE() {
        var ua = window.navigator.userAgent;
        return ua.indexOf('MSIE ') !== -1 || ua.indexOf('Trident/') !== -1;
    }

    function showIEWarning() {
        if (!isIE()) { return; }
        var container = document.querySelector('bdd-container');
        if (!container) { return; }
        var warn = document.createElement('div');
        warn.className = 'ie-warning';
        warn.innerHTML = '<div class="ie-warning-icon">'
            + '<img src="' + BASE + '/static/img/ie.png" width="50" height="50" alt="">'
            + '</div>'
            + '<h1 class="bdd-headline-2">尽可能保障您的访问</h1>'
            + '<p class="bdd-content-13">虽然但是请停止使用IE浏览器来访问我所创建的内容</p>'
            + '<p class="bdd-content-13">内容构建在HTML5与CSS3.0等现代化的Web标准中，虽然通过技术手段可以让您保持访问<br>但您将无法获得最佳的视觉体验，我们推荐您使用Chrome。这是我"工作"时的浏览器</p>';
        container.insertBefore(warn, container.firstChild);
    }

    function initMessageBox() {
        var APIUrl = 'http://127.0.0.1:8081';
        var Message_Service_Url = APIUrl + '/v1/feature/get/message';
        var req = new XMLHttpRequest();
        req.open('GET', Message_Service_Url, true);
        req.onreadystatechange = function() {
            if (req.readyState === 4 && req.status === 200) {
                var msgBox = document.getElementById('message-box');
                if (msgBox) {
                    var obj = JSON.parse(req.responseText);
                    msgBox.innerHTML = obj.data.message;
                }
            }
        };
        req.send();
    }

    function onAllLoaded() {
        loadedCount++;
        if (loadedCount >= totalComponents) {
            showIEWarning();
            initMessageBox();
        }
    }

    loadComponent('header', 'bdd-header', onAllLoaded);
    loadComponent('footer', 'bdd-footer', onAllLoaded);
})();
