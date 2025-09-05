(function() {
    'use strict';

    // Correo con doble codificación Base64
    const partesC = [
        'W','TI5d','WRH','Rmpk','RzlB','YW5O','aGJI','Wmha','Rzl5','ZWk1','MFpX','Tm8='
    ];

    // Whatsapp URL con doble codificación Base64 -> https://api.whatsapp.com/send/?phone=
    const partesWurl = [
        'Y','UhSM','GNIT','TZMe','TloY','0drd','WQya','GhkS','E5oY','0hBd','VkyO','XRMM',
        '05sY','m1Rd','lAzQ','m9iM','jVsU','FE9P','Q=='
    ];

    // Teléfono con doble codificación Base64 con 51 (sin +)
    const partesT = [
        'T','lRF','NU1q','STVP','REEx','TWpN','PQ=='
    ];

    // Función para decodificar partes
    function decodificar(partes) {
        const dobleB64 = partes.join('');
        const primera = atob(dobleB64);
        return atob(primera);
    }

    // Función para formatear el teléfono con espacios cada 3 dígitos
    function formatearTelefono(num) {
        const rest = num.slice(2);
        return `+51 ${rest.replace(/(\d{3})(?=\d)/g, '$1 ').trim()}`;
    }

    // Función para asignar enlaces
    function asignarEnlaces(selector, href, texto = null) {
        document.querySelectorAll(selector).forEach(el => {
            el.href = href;
            if (texto !== null) {
                el.textContent = texto;
            }
        });
    }

    // Retraso aleatorio
    const delay = 600 + Math.floor(Math.random() * 900);

    setTimeout(() => {
        // Correo
        const c = decodificar(partesC);
        asignarEnlaces(".cInfoTexto", `mailto:${c}`, c);
        asignarEnlaces(".cInfoRedes", `mailto:${c}`);

        // Teléfono
        const t = decodificar(partesT);
        const tURL = `${decodificar(partesWurl)}${t}`;
        const tTexto = formatearTelefono(t);
        asignarEnlaces(".tInfoTexto", tURL, tTexto);
        asignarEnlaces(".tInfoRedes", tURL);
    }, delay);
})();