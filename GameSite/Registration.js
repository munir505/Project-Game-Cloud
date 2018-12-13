function storeUser(){

    var usrObject = {};
    //this takes the fields from the reg page
    usrObject.fullName = document.getElementById("fullNameInput").value;
    usrObject.userName = document.getElementById("userNameInput").value;
    usrObject.email = document.getElementById("emailInput").value;
    usrObject.password = document.getElementById("passwordInput").value;
    
    //this stringifys the email so that js can read it
    localStorage[usrObject.email] = JSON.stringify(usrObject);
    
    //this displays once the user registeres to the website
    document.getElementById("result").innerHTML = "<b> Registration Success, Thank You For Registering.</b>";

}