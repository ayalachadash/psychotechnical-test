
//פורום 1 כניסה למבחן כמשתמש
let modal = document.querySelector('#id01');
const formUser = document.querySelector('#form1');
if(formUser)
formUser.onsubmit = (e) => {
    e.preventDefault();
    let details=JSON.parse(localStorage.getItem(formUser.psw.value));
    if(!details || details.name != formUser.userName.value){
        alert('הסיסמה שגויה נא לנסות שוב')
        formUser.psw.value="";
    }
    else{
        sessionStorage.setItem('Name',formUser.userName.value);
        sessionStorage.setItem('Password',formUser.psw.value);
        location.href='/test.html';
    }
    
}

//פורום 2-משתמש חדש
let modalNewUser = document.querySelector('#id02');
const formNewUser = document.querySelector('#form2');
if(formNewUser)
formNewUser.onsubmit = (e) => {
    e.preventDefault();
    localStorage.setItem(formNewUser.psw.value,JSON.stringify({name:formNewUser.userName.value,email:formNewUser.email.value}));
    location.href='/project.html'
}

//אזור המשחקים
let modal3 = document.querySelector('#id03');
const formUserGame = document.querySelector('#form3');
if(formUserGame)
formUserGame.onsubmit = (e) => {
    e.preventDefault();
    let details=JSON.parse(localStorage.getItem(formUserGame.psw.value));
    if(!details || details.name != formUserGame.userName.value){
        alert('הסיסמה שגויה נא לנסות שוב')
        formUserGame.psw.value="";
    }
    else{
        sessionStorage.setItem('Name',formUserGame.userName.value);
        sessionStorage.setItem('Password',formUserGame.psw.value);
        location.href='/games.html';
    }
    
}




