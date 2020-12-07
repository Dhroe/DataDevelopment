var _db;
var curUser;
var userState;
var recipeId = 0

var _initFirebase = function initFirebase(){
    firebase
    .auth()
    .onAuthStateChanged((user) => {
        if(user){
            userState = true;
            console.log(user.email);
            curUser = user.email;
            $("nav #yourRecipes").css("display", "inline")
            $("#logout").css("display", "inline")
            $("#login").css("display", "none")
            $(".user").append("<h3>" + "hey" + $(".email").val() +", create your recipe!" + "</h3>");
            _db = firebase.firestore();
        }else {
            curUser = "";
            userState = false;
            console.log(userState);
            $("#login").html("Login")
            $(".user").empty();
            _db = {};
        }
    });
}

var MODEL = (function() {
    var _getView = function (viewName) {
        $.get(`./views/${viewName}.html` , function (data) {
            $("#app").html(data)
            $.get('./views/footer.html' , function (data) {
                $("#app .footerWrap").append(data)
            });
            if(viewName == "browse") {
                for(recipe in yourRecipes){
                    $(".yourBackground .pageWrap").append(
                    `<div class="wrapper">
                     <div class="recipe">
                     <div class="image"><img src="${yourRecipes[recipe].image}">
                     <button class="viewBtn" id="${yourRecipes[recipe].id}" value="View">View</button>
                     </div>
                     <div class="info">
                     <h4>${yourRecipes[recipe].recipeName}</h4>
                     <p>${yourRecipes[recipe].description}</p>
                     <div class="time"><p>${yourRecipes[recipe].time}</p></div>
                     <div class="serve"><p>${yourRecipes[recipe].servingSize}</p></div>
                     </div>
                     </div>  
                     <div class="buttons"> 
                     <button id="${yourRecipes[recipe].id}" value="Edit">Edit Recipe</button>
                     <button id="${yourRecipes[recipe].id}">Delete</button>
                     </div> 
                     </div>`
                    )
                }
            }    
            if (viewName == "createRecipes") {
            $(".user").append(`<h3>Hey ${curUser}, create your recipe!</h3>`);     
               let ingredientN = 4;
               //add rows for the ingredients and instructions
                $("#app #addIngredient").click((e) => {
                $(".ingredients").append(
                `<input type="text" id="ingredient${ingredientN}" placeholder="Ingredient #${ingredientN}"></input>`
                     );
                ingredientN++;
                     });
                     let instructionN = 4;
                        $("#app #addInstruction").click((e) => {
                        $(".instructions").append(
                        `<input type="text" id="instruction${instructionN}" placeholder="Instruction #${instructionN}"></input>`
                             );
                        instructionN++;
                             });
            $("#app #createRecipe").click(function(e) {
                var recipeName = $("#recipeName").val();
                var description = $("#description").val();
                var time = $("#time").val();
                var servingSize = $("#servingSize").val();
                var ingredients = [];
                var instructions = [];

                for(let i = 0; i <= ingredientN; i++){
                    ingredientN[i] = $(`#ingredient${i+1}`).val()
                }
                for(let i = 0; i <= instructionN; i++){
                    instructionN[i] = $(`#instruction${i+1}`).val()
                }
                yourRecipes.push({
                    "id":recipeId,
                    "recipeName":recipeName,
                    "ingredients":ingredients,
                    "instructions":instructions,
                    "description":description,
                    "time":time,
                    "servingSize":servingSize,
                })
                recipeId++
                
                    $.get(`./views/home.html` , function (data) {
                        $("#app").html(data)
                    });
                    Swal.fire({
                        title: "Recipe Create!",
                        text: "successfully Created!",
                        icon: "success",
                        confirmButtonText: "Keep Creating"
                    });
            })
            }
            //inject specific views not on the Nav
            if (viewName == "yourRecipes") {
                $(".user").append(`<h3>Hey ${curUser}, here are your recipes!</h3>`);
                for(recipe in yourRecipes){      
                    $("#app #editBtn").click((e) => {
                        $.get(`./views/editRecipe.html` , function (data) {
                            $("#app").html(data)
                            let ingredientN = 4;
                            $("#app #addIngredient").click((e) => {
                            $(".ingredients").append(
                            `<input type="text" id="ingredient${ingredientN}" placeholder="Ingredient #${ingredientN}"></input>`
                                );
                                ingredientN++;
                                    });
                                    let instructionN = 4;
                                        $("#app #addInstruction").click((e) => {
                                        $(".instructions").append(
                                        `<input type="text" id="instruction${instructionN}" placeholder="Instruction #${instructionN}"></input>`
                                            );
                                        instructionN++;
                                            });
                                    });
                    });
                    
                        $(".yourBackground .pageWrap").append(
                        `<div class="wrapper">
                        <div class="recipe">
                        <div class="image" style="background-image: url(${yourRecipes[recipe].image});">
                        <button class="viewBtn" id="${yourRecipes[recipe].id}">View</button>
                        </div>
                        <div class="info">
                        <h4>${yourRecipes[recipe].recipeName}</h4>
                        <p>${yourRecipes[recipe].description}</p>
                        <div class="time"><p>${yourRecipes[recipe].time}</p></div>
                        <div class="serve"><p>${yourRecipes[recipe].servingSize}</p></div>
                        </div>
                        </div>  
                        <div class="buttons"> 
                        <button id="${yourRecipes[recipe].id}" value="Edit">Edit Recipe</button>
                        <button class="deleteBtn" id="${yourRecipes[recipe].id}">Delete</button>
                        </div> 
                        </div>`
                        )
                        $(".viewBtn").click((e) => {
                            let view = this.id
                            console.log(view);
                            $.get(`./views/viewRecipe.html` , function (data) {
                                $("#app").html(data)
                                for(recipe in yourRecipes){
                                    console.log(yourRecipes[recipe].id);
                                    if(yourRecipes[recipe].id == view){
                                        $("#viewBackground h2").empty()
                                        $("#viewBackground .image").empty()
                                        $("#viewBackground p").empty()
                                        $("#viewBackground ingredients").empty()
                                        $("#viewBackground instrucions").empty()
        
                                        $("#viewBackground h2").html(`
                                                <h2>${yourRecipes[recipe].recipeName}</h2>
                                            `)
                                        $("#viewBackground .image").append(`
                                            <div class="image" style="background-image: url(${yourRecipes[recipe].image});"></div>
                                            `)
                                        $("#viewBackground .info1 p").html(`
                                        <p>${yourRecipes[recipe].description}</p>
                                        `)
                                        $("#viewBackground .time p").html(`
                                        <p>${yourRecipes[recipe].time}</p>
                                        `)
                                        $("#viewBackground .serve p").html(`
                                        <p>${yourRecipes[recipe].servingSize}</p>
                                        `)
                                        let ingredientN = 1;
                                        for(let ingredientN of yourRecipes[recipe].ingredients){
                                            $('#viewBackground .ingredients').append(`
                                            <p>${ingredientN}</p>
                                            `)
                                            ingredientN++;
                                        }
                                        let instructionN = 1;
                                        for(let instruction of yourRecipes[recipe].instructions){
                                            $('#viewBackground .instructions').append(`
                                            <p>${instructionN}. ${instruction}</p>
                                            `)
                                            instructionN++;
                                        }
                                        $('#viewBackground').append(`
                                        <button class="editBtn" value="Edit" id="${yourRecipes[recipe].id}">Edit Recipe</button>
                                        `)
                                    }
                                }    
                                $("#app #editBtn").click((e) => {
                                    $.get(`./views/editRecipe.html` , function (data) {
                                        $("#app").html(data)
                                        let ingredientN = 4;
                                        $("#app #addIngredient").click((e) => {
                                    $(".ingredients").append(
                                    `<input type="text" id="ingredient${ingredientN}" placeholder="Ingredient #${ingredientN}"></input>`
                                        );
                                    ingredientN++;
                                        });
                                        let instructionN = 4;
                                        $("#app #addInstruction").click((e) => {
                                $(".instructions").append(
                                `<input type="text" id="instruction${instructionN}" placeholder="Instruction #${instructionN}"></input>`
                                    );
                                instructionN++;
                                    });
                                    });
                                });
                            });
                        });
                        $(".deleteBtn").click(function(e){
                            let recipeName;
                            let view = this.id
                                for(recipe in yourRecipes){
                                    if(yourRecipes[recipe].id == view){
                                        recipeName = yourRecipes[recipe].recipeName
                                        yourRecipes.splice(recipe, 1)
                                        $.get(`./views/home.html` , function (data) {
                                            $("#app").html(data)
                                        });
                                        Swal.fire({
                                            title: "Recipe Deleted!",
                                            text: "successfully deleted",
                                            icon: "success",
                                            confirmButtonText: "Explore"
                                        });
                                    }   
                                }
                        });
                
                }
                
            }
            //account functionality
            if (viewName == "login") {
                //creating an account
                $(".signUpBtn").click(function (e) {
                    e.preventDefault();
                    let email = $(".email").val();
                    let pWord = $(".pWord").val();
                        firebase
                        .auth()
                        .createUserWithEmailAndPassword(email, pWord)
                        .then((result) => {
                            console.log(result.user.uid);
                            Swal.fire({
                                title: 'Welcome!',
                                text: " ${curUser} successfully created!",
                                icon: 'success',
                                confirmButtonText: 'Go Explore!'
                            });
                        })
                        .catch((error) =>{
                    
                        let errorCode = error.code;
                        let errorMessage = error.message;
                    
                        console.log('Error Code ${errorCode} Error Message ${errorMessage}')
                        })
                });
                //logging in to already made account
                $(".loginBtn").click(function (e) {
                    e.preventDefault();
                    let email = $(".email").val();
                    let pWord = $(".pWord").val();
                        firebase
                        .auth()
                        .signInWithEmailAndPassword(email, pWord)
                        .then((result) => {
                            console.log(result.user.uid);
                            $.get(`./views/home.html` , function (data) {
                                $("#app").html(data)
                            });
                            Swal.fire({
                                title: "Welcome Back!",
                                text: "successfully logged in!",
                                icon: "success",
                                confirmButtonText: "Explore"
                            });
                        })
                        .catch((error) =>{
                    
                        let errorCode = error.code;
                        let errorMessage = error.message;
                    
                        console.log('Error Code ${errorCode} Error Message ${errorMessage}')
                        })
                    });
                //logging out
                $("#logout").click(function (e) {
                    e.preventDefault();
                        firebase
                        .auth()
                        .signOut()
                        .then (() => {
                            console.log("User Signed Out")
                            Swal.fire({
                                title: "Goodbye!",
                                text: "successfully logged out!",
                                icon: "success",
                                confirmButtonText: "confirm"
                            });
                        })
                        .catch((error) =>{
                        
                        let errorCode = error.code;
                        let errorMessage = error.message;
                    
                        console.log('Error Code ${errorCode} Error Message ${errorMessage}')
                        this.logOutUser();
                        })
                });
            }
        });
    }
    return{
        getView: _getView,
        initFirebase: _initFirebase,
        userState: this.userState,
    };
})();



