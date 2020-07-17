var jq = document.createElement('script');
jq.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// remove all whitespace
function slam(e) {
    return e.innerText.replace(/\s/g,'')
}

// click the checkbox of a row
function pick(option) {
    option.getElementsByTagName("input")[0].click()
}

// submit current question
function shoot() {
    $(".confidence-buttons-container button.btn-confidence").click()
}

// open and close course concept
function learnLesson() {
    $("button.lr-tray-button").click()
    $(".button-bar-wrapper button.btn-primary").click()
}

// move to next question
function moveAlong() {
    $(".button-bar-wrapper button.btn-primary").click()
}

function removeRationale() {
    document.querySelectorAll(".choiceRationale").forEach(e=>{e.parentNode.removeChild(e)});
}

////////////////////////////////////////////////////////////////

memorization = {};

//$(".multiple-choice-component .prompt p").innerText
//$(".multiple-select-component .choices .choice-row")

// for multiple select sort of question
current_question=slam($(".multiple-select-component")[0])
options=$(".multiple-select-component .choices .choice-row")

// retrieving memory
if (memorization[current_question] == null) {
    memorization[current_question]=[
        slam(options[getRandomInt(options.length)])
    ];
}

// picking answers
options.each((i,op) => {
    if (memorization[current_question].includes(slam(op))) {
        pick(op);
    }
})

// submit
shoot()

// remove hints and reasons which interferes with memorization
removeRationale() 

// failure handler: only worry about incorrect
incorrect_choices=$(".choice-row.-incorrect, .choice-row.-unanswered")
incorrect_choices.each((i,c) => {
    choice = slam(c);
    console.log(c);
    if (memorization[current_question].includes(choice)) {
        //false memory, delete
        memorization[current_question].splice(
            memorization[current_question].indexOf(choice)
        )
    } else { // need to add to memory
        memorization[current_question].push(choice)
    }
})

//////////////////////////////////////////////////////////////////
