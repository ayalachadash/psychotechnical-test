const gameBoard=Array.from(document.querySelectorAll('#gameBoard>div')) ;
const diceHat=document.querySelector('#diceHat');
const diceFill=document.querySelector('#diceFill');
const diceColor=document.querySelector('#diceColor');
const good=document.querySelector('#good');
const placePoint=document.querySelector('#placePoint');
const h3=document.querySelector('.h3');
const h6=document.querySelector('.h6');
const win=document.querySelector('.win');
const places=Array.from(document.querySelectorAll('span'));


let point=0;


const showUser= document.querySelector('.showUser');
showUser.innerHTML= sessionStorage.getItem('Name');


let arr=[];
$.ajax({
    url: 'hat_data.json',
    success: (d) => {
        data = d;
        valid();
    }
})

const rand = (max) => {
    let rand = Math.random(); 
    let roundNumber = Math.round(rand * max);
    return roundNumber;
}

const fullArr = (max) => {
    for (i = 0; i <max ; i++) {
        let a = rand(max-1);
        if (arr.includes(a))
            i--;
        else
            arr.push(a);
    }
    return arr;
}

const show=()=>{
    gameBoard.forEach((value,index)=>{
        value.innerHTML=`<img src= "${data[arr[index]].img}">`;
    })
}
const valid=()=>{
    setTimeout(()=>{
        good.classList.remove('hide');
        finish();
        win.classList.add('modal');
        win.classList.remove('hide')
        firstplaces();
    },20000)
    fullArr(20);
    show();
    randOption();
}
let dataImg=["img/דגם קשקוש.png","img/דגם כוכב.png","img/דגם לב.png","img/דגם חץ.png","img/דגם חלק.png"];
let dataImg2=["nonsense","star","hard","arrow","smooth"];
let dataColor=["img/צבע אדום.png","img/צבע כחול.png"];
let dataColor2=["red","blue"];
let dataHat=["img/דגם כובע גברת.png","img/דגם כובע ליצן.png"];
let dataHat2=["mrs","clown"];
let randImg;
let randColor;
let randHat;
const randOption=()=>{
    randImg=rand(4);
    randColor=rand(1);
    randHat=rand(1);
    diceFill.innerHTML=`<img src= "${dataImg[randImg]}">`;
    diceColor.innerHTML=`<img src= "${dataColor[randColor]}">`;
    diceHat.innerHTML=`<img src= "${dataHat[randHat]}">`;
}

gameBoard.forEach((value,index)=>{
    value.onclick=()=>{
        if(data[arr[index]].color==dataColor2[randColor]&&data[arr[index]].hat==dataHat2[randHat]&&data[arr[index]].fill==dataImg2[randImg]){
            good.classList.remove('hide');
            h3.innerHTML="מצוין 100+"
            setTimeout(()=>{
                good.classList.add('hide');
                h3.innerHTML="";
                randOption();
                point+=100;
                placePoint.innerHTML=point;
            },500)
        }
        else{
            good.classList.remove('hide');
            h3.innerHTML="הפעם טעית 100-";
            setTimeout(()=>{
                good.classList.add('hide');
                h3.innerHTML="";
                if(point>0){
                    point-=100;
                    placePoint.innerHTML=point;
                }
            },500)

        }
    }
})




//מנצחים
let place1hat="",place2hat="",place3hat="";

const finish=()=>{
    let name=sessionStorage.Name;
    if(localStorage.place1hat)
        place1hat=JSON.parse(localStorage.place1hat);
    if(localStorage.place2hat)
        place2hat=JSON.parse(localStorage.place2hat);
    if(localStorage.place3hat)
        place3hat=JSON.parse(localStorage.place3hat);
    if(!localStorage.place1hat||point>parseInt(place1hat.point)){
        if(localStorage.place1hat){
            if(localStorage.place2hat){
                localStorage.place3hat=localStorage.place2hat;
                localStorage.place2hat=localStorage.place1hat;
            }
            else{
                localStorage.place2hat=localStorage.place1hat;
            }
            
        }
        localStorage.place1hat=JSON.stringify({
            point:point,name:name
        });
        places[8].innerHTML="נכנסת למקום הראשון!!!";
    }
    else{
        if(!localStorage.place2hat||point>parseInt(place2hat.point)){
            if(localStorage.place2hat){
                localStorage.place3hat=localStorage.place2hat;
            }
            localStorage.place2hat=JSON.stringify({
                point:point,name:name
            });
            places[8].innerHTML="נכנסת למקום השני!!!";
        }
        else{
            if(!localStorage.place3hat||point>parseInt(place3hat.point)){
                localStorage.place3hat=JSON.stringify({
                    point:point,name:name
                });
                places[8].innerHTML="נכנסת למקום השלישי!!!";
            }
        }
    }
    if(localStorage.place1hat)
        place1hat=JSON.parse(localStorage.place1hat);
    if(localStorage.place2hat)
        place2hat=JSON.parse(localStorage.place2hat);
    if(localStorage.place3hat)
        place3hat=JSON.parse(localStorage.place3hat);
}

const firstplaces=()=>{
    places[1].innerHTML="מקום ראשון: "+place1hat.name;
    places[2].innerHTML="מספר נקודות: "+place1hat.point;
    places[3].innerHTML="מקום שני: "+place2hat.name;
    places[4].innerHTML="מספר נקודות: "+place2hat.point;
    places[5].innerHTML="מקום שלישי: "+place3hat.name;
    places[6].innerHTML="מספר נקודות: "+place3hat.point;
    places[7].innerHTML="מספר הנקודות שלך הוא: "+point;
    places.forEach((p) => {
        if(p.innerHTML==="undefined"){
            p.innerHTML="";
        }
    });
}


