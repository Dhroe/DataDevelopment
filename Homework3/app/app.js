function initListeners() {
    $("#nav nav a").click(function (e) {
        var btnID = this.id;
        MODEL.getView(btnID);
        });  
    }

function initSite() {
    $.get('./views/nav.html' , function (data) {
        $("#nav").html(data)
        initListeners();
    });
    $.get('./views/home.html' , function (data) {
        $("#app").html(data)
    });
    $.get('./views/footer.html' , function (data) {
        $("#footer").html(data)
    });
    

}

$(document).ready(function(){
    initSite();
})