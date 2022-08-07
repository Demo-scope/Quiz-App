// بسم الله الرحمن الرحيم 

let headerQuestionNumber = document.querySelector(".quiz-app header .content .count span")
let bulletsSpanContaner = document.querySelector(".quiz-app .quiz-info .polits")
let quizArea = document.querySelector(".quiz-app .quiz-area")
let subButton = document.querySelector(".quiz-app button")
let quizInfo = document.querySelector(".quiz-app .quiz-info")
let Risulte = document.querySelector(".quiz-app .resultes")
let counterElement = document.querySelector(".quiz-app .quiz-info .countdowne")


//set options
let currentIndex = 0;
let rightAnswer = 0;

// get questions from api
function getQuestions() {

    // get questions from api
    let myRequeest = new XMLHttpRequest();
    myRequeest.open("GET", "../JavaScript/html_questions.json", true);
    myRequeest.send();

    myRequeest.onreadystatechange = function() {
        if (myRequeest.readyState === 4 && myRequeest.status === 200) {
            //teurn it to JS object to edit it
            let jsData = JSON.parse(myRequeest.responseText)
            let NumberOfQuestions = jsData.length

            // set number of questions in header and creat bullets 
            questionNumber(NumberOfQuestions)

            //add question data
            addQuestionData(jsData[currentIndex], NumberOfQuestions)

            // count Down
            countdown(15, NumberOfQuestions)

            // cleck on submit button
            subButton.onclick =function () {
                //get the Right Answer
                let RightAnswer = jsData[currentIndex].right_answer
                currentIndex++
                
                // check answer (true or false)
                checkAnswer(RightAnswer, NumberOfQuestions)

                // remove previous question and add the next one
                quizArea.innerHTML = "";
                addQuestionData(jsData[currentIndex], NumberOfQuestions)

                //handel polets class
                handelPoletsClass()

                // show resuls
                ShowResults(NumberOfQuestions)

                // counter
                clearInterval(countDownIntirval)
                countdown(15, NumberOfQuestions)
            }
        }
    }
}
getQuestions()



function questionNumber(num) {
    headerQuestionNumber.innerHTML = num;

    //creat bullets and append it into his location
    for (let i = 0; i < num; i++) {
        let bullet = document.createElement("span")
        if (i === 0) {
            bullet.classList.add("on")
        }
        bulletsSpanContaner.appendChild(bullet)
    }
}
function addQuestionData(obj , count) {
    if (currentIndex < count) {
        // creat h2 question title
        let questionTitle = document.createElement("h2")
        let text = document.createTextNode(obj.title)
        questionTitle.appendChild(text)
        quizArea.appendChild(questionTitle)

        // creat answer area 
        let ansArea = document.createElement("div")
        ansArea.classList.add("answer-area")
        quizArea.appendChild(ansArea)

        // creat 4 answers and append it into (answer area)
        for (let i = 1; i <= 4; i++) {
            let ans = document.createElement("div")
            ans.classList.add("answer")

            let ansinpute = document.createElement("input")
            ansinpute.setAttribute("type", "radio")
            ansinpute.setAttribute("id", `answer_${i}`)
            ansinpute.setAttribute("name", "quistions")
            ansinpute.dataset.answer = obj[`answer_${i}`]
            if (i === 1) {
                ansinpute.checked = true
            }
            ans.appendChild(ansinpute)

            let anslable = document.createElement("label")
            anslable.setAttribute("for", `answer_${i}`)
            anslable.appendChild(document.createTextNode(obj[`answer_${i}`]))
            ans.appendChild(anslable)

            ansArea.appendChild(ans)
        }
    }
}
function checkAnswer(RightAns, QuestionsLength) {
    let allInputeRadio = document.getElementsByName("quistions")
    let theChoosenAnser;

    // get the chosen answer
    for (let i = 0; i < allInputeRadio.length; i++) {
        if (allInputeRadio[i].checked) {
            theChoosenAnser = allInputeRadio[i].dataset.answer
        }
    }

    if (RightAns === theChoosenAnser) {
        rightAnswer++;
    }
}
function handelPoletsClass() {
    let bolletsSpans = document.querySelectorAll(".quiz-app .quiz-info .polits span")
    let arrayOfSpans = Array.from(bolletsSpans)

    arrayOfSpans.forEach(function(span, index) {
        if (currentIndex === index) {
            span.classList.add("on")
        }
    })
}
function ShowResults(count) {
    let resultes;
    if (currentIndex === count) {
        quizArea.remove()
        subButton.remove()
        quizInfo.remove()

        if(rightAnswer > (count / 2) && rightAnswer < count) {
            resultes = `<span class= "good">Nice</span> You Answered ${rightAnswer} from ${count} questions`
        } else if (rightAnswer === count) {
            resultes = `<span class= "perfect">Perfect</span> You Answered ${rightAnswer} from ${count} questions`
        } else {
            resultes = `<span class= "bad">Bad</span> You Answered ${rightAnswer} from ${count} questions`
        }

        Risulte.innerHTML = resultes
    }
}
function countdown(duration , count) {
    if (currentIndex < count) {
        let minutes;
        let seconds;

        countDownIntirval = setInterval(function() {
            minutes = parseInt(duration / 60)
            seconds = parseInt(duration % 60)

            minutes = minutes < 10 ? `0${minutes}`: minutes;
            seconds = seconds < 10 ? `0${seconds}`: seconds;

            counterElement.innerHTML = `${minutes} : ${seconds}`

            if (--duration < 0) {
                clearInterval (countDownIntirval)
                subButton.click()
            }
        }, 1000)
    }
}