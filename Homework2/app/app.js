//This is my controller for my app

function getPage(data) {
    $(".content").html(data);
}

function initListeners() {
    $("nav a").click(function (e) {
       
        let btnId = this.id;
        if(btnId == "home"){
        MODEL.home(getPage);}
        if(btnId == "about"){
        MODEL.about(getPage);}
        if(btnId == "products"){
        MODEL.products(getPage);}
        if(btnId == "contact"){
        MODEL.contact(getPage);}
    });
}

$(document).ready(function () {
    initListeners();
});
