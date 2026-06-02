const loginBtn = document.getElementById("loginBtn");

const registerBtn = document.getElementById("registerBtn");

const loginForm = document.getElementById("loginForm");

const registerForm = document.getElementById("registerForm");

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if(currentUser){
    window.location.href = "home.html";
}

loginBtn.onclick = () => {
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");
};

registerBtn.onclick = () => {
    registerForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
};

registerForm.addEventListener("submit",function(e){
e.preventDefault();

const name = document.getElementById("fullName").value;

const email = document.getElementById("email").value;

const phone = document.getElementById("phone").value;

const password = document.getElementById("password").value;

const confirmPassword = document.getElementById("confirmPassword").value;

if(password !== confirmPassword){
alert("Passwords do not match");
return;
}

let users =
JSON.parse(
localStorage.getItem("users")
) || [];

const exists =
users.find(
user => user.email === email
);

if(exists){
alert("Email already exists");
return;
}

const newUser = {
    id: Date.now(),
    name,
    email,
    phone,
    password,
    createdAt: new Date().toLocaleString()
};

users.push(newUser);

localStorage.setItem(
    "users",
    JSON.stringify(users)
);

localStorage.setItem(
    "currentUser",
    JSON.stringify(newUser)
);

window.location.href = "home.html";
});

loginForm.addEventListener(
"submit",
function(e){

e.preventDefault();

const email = document.getElementById("loginEmail").value;

const password = document.getElementById("loginPassword").value;

const users = JSON.parse(localStorage.getItem("users")) || [];

const user =users.find(u => u.email === email && u.password === password);
if(!user){
alert("Invalid Login");
return;
}

localStorage.setItem(
"currentUser",
JSON.stringify(user)
);

window.location.href =
"home.html";
});