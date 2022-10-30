const h2 = document.querySelector('h2');
const btnStart = document.querySelector('.btnStart');
const btnBack = document.querySelector('.btnBack');
const btnNext = document.querySelector('.btnNext');
const btnNextLevel = document.querySelector('.btnNextLevel');
const btnFinishTest = document.querySelector('.btnFinishTest');
let answers = document.querySelector('#answers');
let finalScore = document.querySelector('.finalScore');
const exampalTest=document.querySelector('.exampalTest')
const container=document.querySelector('.containerul')
const search=document.querySelector('.search');
let ul = document.querySelector('.containerul>ul');
let corectAnswerExample= document.querySelector('#corectAnswerExample');
const welcom= document.querySelector('#welcom');
// const showUser= document.querySelector('.showUser');



//שליפה מה-json
$.ajax({
    url: 'data.json',
    success: (d) => {
        data = d;
    }
})

let data;
let questionType = 0;
let arr = [];
let arrAnswer = [];
let sum = [0, 0, 0, 0];
let num = 0;
let indexArr = 0;
let userName='';
let userPassword='';

// פונקצית הגרלת מספר
const rand = () => {
    let rand = Math.random(); // מספר רנדומלי בין 0 ל1
    let roundNumber = Math.round(rand * 5);
    return roundNumber;
}

const fullArr = () => {
    for (i = 0; i < data[questionType].length; i++) {
        let a = rand();
        if (arr.includes(a))
            i--;
        else
            arr.push(a);
    }
    return arr;
}



//פונקצית הדפסת שאלה ותשובה מסוג תמונה
const questionTypeImg = (questionType, questionNum) => {
    h2.innerHTML = `<img src= "${data[1][questionNum].question}">`;
    data[questionType][questionNum].answer.forEach((ans,index) => {
        let li = `<li><input type="radio" name="ans"></input><img src= "${ans}"></li>`;
        if(index==arrAnswer[indexArr])
            li = `<li><input type="radio" name="ans" checked></input><img src= "${ans}"></li>`;
        answers.innerHTML += li;
    });
}

//פונקצית הדפסת שאלה ותשובה מסוג טקסט
const questionTypeText = (questionType, questionNum) => {
    h2.innerHTML = data[questionType][questionNum].question;
    data[questionType][questionNum].answer.forEach((ans,index) => {
        let li = `<li><input type="radio" name="ans"></input>${ans}</li>`;
        if(index==arrAnswer[indexArr])
            li = `<li><input type="radio" name="ans" checked></input>${ans}</li>`;
        answers.innerHTML += li;
    });

}
//פונקציה השולחת להדפסת השאלה והתשובה ולקליטת התשובה 
const viewQuestion = (questionType, questionNum) => {
    answers.innerHTML = "";
    if (questionType == 1) {
        questionTypeImg(questionType, questionNum);
    }
    else {
        questionTypeText(questionType, questionNum);
    }
    //קליטת ההקשה של המשתמש לתוך מערך
    let inputAns = Array.from(document.querySelectorAll('#answers li input'));
    inputAns.forEach((input, index) => {
        input.onclick = () => {
            console.log(index);
            arrAnswer[indexArr] = index;
        }
    })

}


askQestion = () => {
    //פונקציה המחשבת 5 דקות לכל שלב במבחן
    let timmer = setTimeout(() => {
        nextStep();
    }, 1000*50);
    //שליחה לפונקצית השאלה
    viewQuestion(questionType, arr[indexArr]);
    btnNext.onclick = () => {
        if (h2.innerHTML != data[questionType][arr[5]].question) {
            indexArr++;
            viewQuestion(questionType, arr[indexArr]);
        }
        else {
            debugger;
            clearTimeout(timmer);
            nextStep();
        }
    }
    btnBack.onclick = () => {
        if (h2.innerHTML != data[questionType][arr[0]].question) {
            indexArr--;
            viewQuestion(questionType, arr[indexArr]);
        }
    }
}
//בדיקה כמה נקודות יקבל על השלב הנוכחי
const sumPoint = () => {
    arrAnswer.forEach((input, index) => {
        if (data[questionType][arr[index]].corectAnswer == input)
            sum[questionType] += 100;
    })
}
//בדיקת ציון במלל
const feedback = (feedbackPoint) => {
    if (feedbackPoint === 0)
        return "נמוך במידה רבה מהממוצע";
    if (feedbackPoint === 100)
        return "נמוך מהממוצע";
    if (feedbackPoint === 200)
        return "נמוך במעט מהממוצע";
    if (feedbackPoint === 300)
        return "ממוצע";
    if (feedbackPoint === 400)
        return "גבוה במעט מהממוצע";
    if (feedbackPoint === 500)
        return "גבוה מהממוצע";
    if (feedbackPoint === 600)
        return "גבוה במידה רבה מהממוצע";
}


const arrStringQuestionType = ["חשיבה לוגית ", "חשיבה צורנית גאומטרית", "עיברית", "הבנה מילולית"];

//פונקצית הצגת ציון סופי
let mark = () => {
    h2.innerHTML = "";
    answers.innerHTML = "";
    btnNextLevel.classList.add('hide');
    sum.forEach((point, index) => {
        let scors = `<li> ${arrStringQuestionType[index]} ${feedback(point)} ${point}  `;
        finalScore.innerHTML += scors;
    })
}
//פונקצית העברה לשלב הבא
const nextStep = () => {
    if (questionType == data.length-1) {
        btnNext.classList.add('hide');
        btnBack.classList.add('hide');
        btnFinishTest.classList.remove('hide')
        sumPoint();
        btnFinishTest.onclick=()=>{
            btnFinishTest.classList.add('hide');
            mark();
        }
    }
    else{
        debugger;
        btnNextLevel.classList.remove('hide');
        btnNext.classList.add('hide');
        btnBack.classList.add('hide');
        btnNextLevel.onclick = () => {
                sumPoint();
                indexArr = 0;
                arrAnswer = [];
                questionType++;
                arr = [];
                arr = fullArr();
                btnNextLevel.classList.add('hide');
                btnNext.classList.remove('hide');
                btnBack.classList.remove('hide');
                askQestion();
        }
    }
}
if (btnStart) {//התחלת מבחן
    btnStart.onclick = () => {
        welcom.classList.add('hide');
        btnStart.classList.add('hide');
        btnStart.classList.remove('btnStart');
        btnBack.classList.remove('hide');
        btnNext.classList.remove('hide');
        arr = fullArr();
        console.log(arr);
        askQestion();
    }
}


//הצגת שאלות לדוגמה
const viewQuestionExample = (questionType, questionNum) => {
    answers.innerHTML="";
    h2.innerHTML="";
    if (questionType == 1) {
        questionTypeImg(questionType, questionNum);
    }
    else {
        questionTypeText(questionType, questionNum);
    }
    corectAnswerExample.innerHTML=`התשובה הנכונה היא: ${data[questionType][questionNum].corectAnswer+1}`;

}
//הצגת סוגי שאלות לדוג
let ulArr=[];
arrStringQuestionType.forEach((element)=>{
    const li=document.createElement('li');
    li.innerHTML=element;
    if(ul)
        ul.append(li);
    ulArr.push(li);
    ulArr.forEach((input,index)=>{
        input.onclick=()=>{
            viewQuestionExample(index,5);
        }
    })
})


//פונקציה המחזירה מערך מחופש
const filterType =(types,searchText)=>{
    return types.filter(type=>{return type.indexOf(searchText)!=-1;});
}
if(search)
//הפעלת החיפוש ע"י שמתחילים להקיש 
search.onkeydown=(e)=>{
    setTimeout(()=>{
        ul.innerHTML='';
        ulArr=[];
    const searchText=search.value;
    const arrType=filterType(arrStringQuestionType,searchText);
    arrType.forEach((element)=>{
        const li=document.createElement('li');
        li.innerHTML=element;
        ul.append(li);

        ulArr.push(li);
        ulArr.forEach((input,index)=>{
            input.onclick=()=>{
                viewQuestionExample(index,5)
            }
        })
    })
    },100)
}
// const showUser= document.querySelector('.showUser');

