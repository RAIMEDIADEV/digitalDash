function promoVideo(){

    if (document.getElementById('pageHeader').innerHTML == "Promo Videos!") {
        console.log('Already loaded');
    } else {
        
            document.getElementById('pageHeader').innerHTML = "Promo Videos!"

    document.getElementById("video").style.display = "block";
    document.getElementById("modification2").style.display = "none";
    document.getElementById("app").style.display = "none";
    document.getElementById("assignSection").style.display = "none";

    

    const body = document.getElementById('video');

    //======================================================================================== PROMO VIDEO
    const promoVideoLi = document.createElement("li");
    promoVideoLi.setAttribute("id","myLi");
    const promoVideo = document.createElement("iframe");
    promoVideo.setAttribute("class","list-group-item");
    promoVideo.setAttribute('src', "https://player.vimeo.com/video/295436011?autoplay=1");
    promoVideo.setAttribute('style', "width: 100%; height: 400px; border:none;");
    promoVideoLi.appendChild(promoVideo);
    body.appendChild(promoVideoLi);
    
    //body.appendChild(promoVideo);
    }
};