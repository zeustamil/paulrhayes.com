(function(html) {
    var gUM = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia,
        hasGetUserMediaSupport = (typeof gUM === "function");

    if (hasGetUserMediaSupport) {
        html.className = html.className + ' getusermedia';
    } else {
        html.className = html.className + ' no-getusermedia';
    }
})(document.documentElement);
