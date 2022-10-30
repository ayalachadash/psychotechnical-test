const arrGameBoard = Array.from(document.querySelectorAll('.step'));
let gameBoard=document.querySelector('#gameBoard');
let h4=document.querySelector('.h4');
let btnStart=document.querySelector('.btnStart');
let placeToInput=document.querySelector('.placeToInput');
const btnNew=document.querySelector('.btnNew')


const rand = (min,counter) => {
    let rand = Math.random();
    let roundNumber = Math.round(rand *counter)+min;
    return roundNumber;
}

let arrLeter=[];
arrLeter.length=3;
const randArr=()=>{
    for(let i=0;i<arrLeter.length;i++){
        arrLeter[i]=String.fromCharCode(rand(97,25));
    }
    return arrLeter;
}
let arr=[];
const fillArrBoard = () => {
    for (i = 0; i < arrGameBoard.length; i++) {
        let a = rand(0,80);
        if (arr.includes(a))
            i--;
        else
            arr.push(a);
    }
    return arr;
}
let indexArr=0;
let j=0;
const playInGame=()=>{
    placeToInput.classList.remove('hide')

    placeToInput.placeholder="הקלד כאן";
    h4.innerHTML=randArr();
    indexArr=0;
    placeToInput.onkeyup=(event)=>{
        if(event.target.value[indexArr]==arrLeter[indexArr]){
            indexArr++;
            arrGameBoard[arr[j++]].classList.remove('gray');
            if(j===arrGameBoard.length){
                
                placeToInput.classList.add('hide');
                // gameBoard.innerHTML="";
                arrGameBoard.forEach((v,i)=>{
                    v.classList.remove('step')
                })
                gameBoard.classList.add('bord')
                h4.classList.add('hide');
            }
        }
        else{
            placeToInput.value="";
            placeToInput.placeholder="טעיתה, התחל מהתחלה";
            for(let k=0;k<=indexArr;k++){
                setTimeout(()=>{
                    if(j>0&&j<arrGameBoard.length){
                        arrGameBoard[arr[j]].classList.add('gray');
                        j--;
                    }
                },700)
            }
            indexArr=0;
        }
        if(indexArr===3)
        {
            placeToInput.value="👍👍👍";
            indexArr=0;
            h4.innerHTML=randArr();
            setTimeout(()=>{
                placeToInput.value="";
            },500)
            playInGame();
        }
    }
}



btnStart.onclick=()=>{
    btnNew.classList.remove('hide')
    fillArrBoard();
    playInGame();
    btnStart.classList.add('hide')
}

btnNew.onclick=()=>{
    arr=[];
    fillArrBoard();
    placeToInput.classList.remove('hide');
    gameBoard.classList.remove('bord')
    h4.classList.remove('hide');
    arrGameBoard.forEach((v,i)=>{
        v.classList.add('gray');
        v.classList.add('step')
    })
    j=0;
    indexArr=0;
    placeToInput.value="";
    placeToInput.placeholder="הקלד כאן"
}

const showUser= document.querySelector('.showUser');
showUser.innerHTML= sessionStorage.getItem('Name');
