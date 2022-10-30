const evryRollForExample=document.querySelector('#evryRollForExample');
const arrRollExample=Array.from(document.querySelectorAll('#evryRollForExample .roll'));
const evryRoll=document.querySelector('#evryRoll');
const arrRoll=Array.from(document.querySelectorAll('#evryRoll .roll'));
const roll=document.querySelector('.roll');
const btnSee=Array.from( document.querySelectorAll('.btnSee'));
const point=document.querySelector('#point');
const evryMistake=Array.from(document.querySelectorAll('.mistake'));
const places=Array.from(document.querySelectorAll('span'));
const win=document.querySelector('.win');
const btnNew=document.querySelector('.btnNew');
let sumPoint=0;
let randNumber=0;
let arrData=[];
let flag1=true;
let flag2=true;
let mistakeIndex=0;


const showUser= document.querySelector('.showUser');
showUser.innerHTML= sessionStorage.getItem('Name');




let data;
$.ajax({
    url: 'data_memory.json',
    success: (d) => {
        data = d;
        valid();

    }
})


// פונקצית הגרלת מספר
const rand = () => {
    let rand = Math.random(); 
    let roundNumber = Math.round(rand *(data.length-2));
    return roundNumber;
}
//מנצחים
let place1="",place2="",place3="";


const finish=()=>{
    let name=sessionStorage.Name;
    if(localStorage.place1)
        place1=JSON.parse(localStorage.place1);
    if(localStorage.place2)
        place2=JSON.parse(localStorage.place2);
    if(localStorage.place3)
        place3=JSON.parse(localStorage.place3);
    if(!localStorage.place1||sumPoint>parseInt(place1.point)){
        if(localStorage.place1){
            if(localStorage.place2){
                localStorage.place3=localStorage.place2;
                localStorage.place2=localStorage.place1;
            }
            else{
                localStorage.place2=localStorage.place1;
            }
            
        }
        localStorage.place1=JSON.stringify({
            point:sumPoint,name:name
        });
        places[8].innerHTML="נכנסת למקום הראשון!!!";
    }
    else{
        if(!localStorage.place2||sumPoint>parseInt(place2.point)){
            if(localStorage.place2){
                localStorage.place3=localStorage.place2;
            }
            localStorage.place2=JSON.stringify({
                point:sumPoint,name:name
            });
            places[8].innerHTML="נכנסת למקום השני!!!";
        }
        else{
            if(!localStorage.place3||sumPoint>parseInt(place3.point)){
                localStorage.place3=JSON.stringify({
                    point:sumPoint,name:name
                });
                places[8].innerHTML="נכנסת למקום השלישי!!!";
            }
        }
    }
    if(localStorage.place1)
        place1=JSON.parse(localStorage.place1);
    if(localStorage.place2)
        place2=JSON.parse(localStorage.place2);
    if(localStorage.place3)
        place3=JSON.parse(localStorage.place3);
}

const firstplaces=()=>{
    places[1].innerHTML="מקום ראשון: "+place1.name;
    places[2].innerHTML="מספר נקודות: "+place1.point;
    places[3].innerHTML="מקום שני: "+place2.name;
    places[4].innerHTML="מספר נקודות: "+place2.point;
    places[5].innerHTML="מקום שלישי: "+place3.name;
    places[6].innerHTML="מספר נקודות: "+place3.point;
    places[7].innerHTML="מספר הנקודות שלך הוא: "+sumPoint;
    places.forEach((p) => {
        if(p.innerHTML==="undefined"){
            p.innerHTML="";
        }
    });
}



arrRoll.forEach((r,index)=>{
    r.onclick=()=>{
        r.classList.add('select')
        if(arrData.includes(index)){
            sumPoint+=100;
            point.innerHTML=sumPoint;
            arrData= arrData.filter(function(i){return i!=index})
            if(arrData.length===0){
                arrRoll.forEach((v,i)=>{
                    v.classList.add('good');
                    v.classList.remove('select')

                })
                setTimeout(()=>{
                    arrRoll.forEach((v,i)=>{
                        v.classList.remove('good');
                    }) 
                },1000)
                seeExample();
            }
        }
        else{
            if(mistakeIndex==evryMistake.length){
                finish();
                win.classList.add('modal');
                win.classList.remove('hide')
                firstplaces();
            }
            else{
                evryMistake[mistakeIndex].classList.add('black');
                mistakeIndex++;
            }
        }
    }
})




const seeExampleWithRand=()=>{
    data[randNumber].forEach((value)=>{
        arrRollExample[value].classList.add('select')
    })
    setTimeout(()=>{
        data[randNumber].forEach((value)=>{
            arrRollExample[value].classList.remove('select')
        })
    },1000)
}  

const seeExample=()=>{
    randNumber=rand();
    arrData=data[randNumber];
    seeExampleWithRand()
}

const valid=()=>{
    seeExample();
}
btnSee.forEach((value,index)=>{
    value.onclick=()=>{
        if(flag1===true&&index===0){
            flag1=false;
            value.classList.add('black');
            seeExampleWithRand();
        }
        if(flag2===true&&index===1){
            flag2=false;
            value.classList.add('black');
            seeExampleWithRand();
        }
    }
    
})


btnNew.onclick=()=>{
    sumPoint=0;
    randNumber=0;
    arrData=[];
    flag1=true;
    flag2=true;
    point.innerHTML=0
    mistakeIndex=0;
    arrRoll.forEach((v)=>{
        v.classList.remove('select')
    })
    evryMistake.forEach((v)=>{
        v.classList.remove('black')
    })
    btnSee.forEach((v)=>{
        v.classList.remove('black')
    })

    valid();
}
