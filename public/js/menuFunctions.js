function activeMenu() {
    let isLoggedIn = true;
    if (isLoggedIn) {
        $('#whatWeDo').toggleClass("disabled");
        $('#charities').toggleClass("disabled");
        $('#countryCode').toggleClass("disabled");
        $('#advanced').toggleClass("disabled");
        $('#signIn').toggleClass("disabled");
        $('#register').toggleClass("disabled");
        $('#contact').toggleClass("disabled");
        $('#searchBox').attr('disabled', false);
        $('#searchByIngredients').css('display', 'block');
    } else {
        $('#whatWeDo').toggleClass("disabled");
        $('#charities').toggleClass("disabled");
        $('#signIn').toggleClass("disabled");
        $('#register').toggleClass("disabled");
        $('#contact').toggleClass("disabled");
    }
}