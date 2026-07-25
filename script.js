setInterval(function() {
    let a = document.querySelector("html").scrollTop;
    document.querySelector(".hero-bubbles-container").style.transform = `rotate(${-a/2}deg)`;
},10); 

