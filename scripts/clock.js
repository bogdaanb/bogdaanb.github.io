$(document).ready(function() {
    setInterval( function() {
        var hours = new Date().getHours();
        $(".hours").html(( hours < 10 ? "0" : "" ) + hours);
    }, 1000);
    setInterval( function() {
        var minutes = new Date().getMinutes();
        $(".min").html(( minutes < 10 ? "0" : "" ) + minutes);
    }, 1000);
    setInterval( function() {
        var seconds = new Date().getSeconds();
        $(".sec").html(( seconds < 10 ? "0" : "" ) + seconds);
    }, 1000);
});

$(document).ready(function() {
    function updateClock() {
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();
        $(".hours").html((hours < 10 ? "0" : "") + hours);
        $(".min").html((minutes < 10 ? "0" : "") + minutes);
        $(".sec").html((seconds < 10 ? "0" : "") + seconds);
    }

    updateClock();  // Actualiza el reloj inmediatamente.
    setInterval(updateClock, 1000);  // Sigue actualizando cada segundo.
});
