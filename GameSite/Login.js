//Function checks if the user is logged in already or not
function checkLogin(){
	if(localStorage.loggedInUsrEmail !== undefined){
		var usrObj = JSON.parse(localStorage[localStorage.loggedInUsrEmail]);

		document.getElementById("loginPara").innerHTML = "<b>Welcome</b> " + usrObj.fullName + " <b>you are Now Logged In.</b>";
		document.getElementById("fullN").innerHTML = usrObj.fullName;

		document.getElementById("scoreR").innerHTML = finalScore.back;
	}
}

//this one check the fields email and password and check the local storage
//if he is in there it will log them in if not it will display a message
function login(){
	var email = document.getElementById("emailInput").value;

	if(localStorage[email] === undefined){
		document.getElementById("loginFailure").innerHTML = "Email not Found.";
	}
	else{
		var usrObj = JSON.parse(localStorage[email]);
		var password = document.getElementById("passwordInput").value;
		if(password === usrObj.password){
			document.getElementById("loginPara").innerHTML = "";
			localStorage.loggedInUsrEmail = usrObj.email;
		}
		else{
			document.getElementById("loginFailure").innerHTML = "Password not Correct. Try Again.";
		}
	}
}

