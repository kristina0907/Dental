window._ = require('lodash');

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
    window.Popper = require('popper.js').default;
    window.$ = window.jQuery = require('jquery');

    require('bootstrap');
} catch (e) {}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */


/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

// import Echo from 'laravel-echo';

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     forceTLS: true
// });

import Echo from 'laravel-echo';
window.io = require('socket.io-client');




function runOnKeys(func, ...codes) {
    let pressed = new Set();

    document.addEventListener('keydown', function(event) {
        pressed.add(event.code);

        for (let code of codes) { // все ли клавиши из набора нажаты?
            if (!pressed.has(code)) {
                return;
            }
        }

        // да, все

        // во время показа alert, если посетитель отпустит клавиши - не возникнет keyup
        // при этом JavaScript "пропустит" факт отпускания клавиш, а pressed[keyCode] останется true
        // чтобы избежать "залипания" клавиши -- обнуляем статус всех клавиш, пусть нажимает всё заново
        pressed.clear();

        func();
    });

    document.addEventListener('keyup', function(event) {
        pressed.delete(event.code);
    });

}

let vidos = document.createElement('div');
vidos.className = "shake-vidos";
vidos.innerHTML = `<iframe id="coubVideo" src="http://coub.com/embed/1n03j7?muted=false&autostart=true&originalSize=false&hideTopBar=true&startWithHD=false&noSiteButtons=true" allowfullscreen="true" fullscreen autoplay allow="autoplay" frameborder="0" width="100%" height="100%" style="display: block;position: fixed;top:0;left:0;z-index: 99999" ></iframe>`;
const body = document.querySelector('body');

runOnKeys(
    () => {
        console.log('event run');

        if(body.classList.contains('shake-your') && vidos)
        {
            body.classList.remove("shake-your");
            vidos.remove();
        }
        else{
            body.classList.add("shake-your");
            body.append(vidos);
            setTimeout(() => {
                let myCoub = document.getElementById('coubVideo').contentWindow;
                if(myCoub)
                {
                    console.log('play');
                    myCoub.postMessage('play', '*');
                }
            }, 1000);
        }

    },
    "KeyQ",
    "KeyW","KeyP","KeyO"
);



// window.Echo.channel('user-channel')
//     .listen('.UserEvent', (data) => {
//         console.log(data);
//
//     });
