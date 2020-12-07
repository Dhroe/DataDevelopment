function initListeners() {
    $("nav a").click(function (e) {
        var btnID = this.id;
        MODEL.getView(btnID);
        });  
        $("footer a").click(function (e) {
            var btnID = this.id;
            MODEL.getView(btnID);
            });
        $(".navicon").click(function(){
        $("nav").css("display", "inline");
        console.log("oi");
        })  
}

function initSite() {
    $.get('./views/nav.html' , function (data) {
        $("#nav").html(data)
    });
    $.get('./views/home.html' , function (data) {
        $("#app").html(data)
        initListeners();  
    });
    $.get('./views/footer.html' , function (data) {
        $("#app .footerWrap").append(data)
        initListeners();  
    });
    
}
$(document).ready(function(){
    initSite();
    MODEL.initFirebase();
})