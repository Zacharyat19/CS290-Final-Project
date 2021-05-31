

var potatoSubmissionForm = document.querySelector('.potatoSubmit')
var messageSubmissionForm = document.querySelector('.messageSubmit')

var potatoSubmissionTab = document.querySelector(".new-potato")
potatoSubmissionTab.addEventListener('click', function(){
    potatoSubmissionForm.classList.remove('hidden')
    messageSubmissionForm.classList.add('hidden')
})

var messageSubmissionTab = document.querySelector(".new-message")
messageSubmissionTab.addEventListener('click', function(){
    messageSubmissionForm.classList.remove('hidden')
    potatoSubmissionForm.classList.add('hidden')
})

