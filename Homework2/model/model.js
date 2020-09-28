var MODEL = (function(e){
    var _home = function(callback){
        let homePage = `<p>Penguins are a group of aquatic flightless birds. They live almost exclusively in the Southern Hemisphere, with only one species, the Galápagos penguin, found north of the equator. Highly adapted for life in the water, penguins have countershaded dark and white plumage and flippers for swimming.</p>
        <img src ="images/penguin.jpg" />` ;
        return callback(homePage);
    };
    var _about = function(callback){
        let aboutPage = `<p>The platypus, sometimes referred to as the duck-billed platypus, is a semiaquatic egg-laying mammal endemic to eastern Australia, including Tasmania. The platypus is the sole living representative of its family and genus, though a number of related species appear in the fossil record.</p>
        <img src ="images/platypus.jpg" />` ;
        return callback(aboutPage);
    };
    var _products = function(callback){
        let productsPage = `<p>Otters are carnivorous mammals in the subfamily Lutrinae. The 13 extant otter species are all semiaquatic, aquatic or marine, with diets based on fish and invertebrates. Lutrinae is a branch of the Mustelidae family, which also includes weasels, badgers, mink, and wolverines, among other animals.</p>
        <img src ="images/otter.jpg" />` ;
        return callback(productsPage);
    };
    var _contact = function(callback){
        let contactPage = `<p>Testudinata is the group of all tetrapods with a true turtle shell. It includes both modern turtles and many of their extinct, shelled relatives. </p>
        <img src ="images/turtle.jpg" />` ;
        return callback(contactPage);
    };

    

    return{
        home: _home,
        about: _about,
        products: _products,
        contact: _contact
    };
})();
