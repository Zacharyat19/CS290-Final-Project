

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

var fs = require("fs")
var data = fs.readFileSync("messages.json")
var message = JSON.parse(data)

function insertMessage(potatoMessage, potatoAuthor) {
    var tempContext = {
        message: potatoMessage,
        author: potatoAuthor
    }
    message.push(tempContext)

    var message = Handlebars.templates.message(tempContext)
    var container = document.querySelector(".container")
    container.insertAdjacentHTML("beforeEnd", message)

    var newData = JSON.stringify(message)
    fs.writeFile("messages.json", newData, (err) => {
        if(err) {
            throw err
        }
    })
    hideCreateModal()
}

function messages() {
    var potatoMessage = document.getElementById('message-text-input').value;
    var potatoAuthor = document.getElementById('message-author-input').value;
  
    if(potatoMessage && potatoAuthor) {
        insertMessage(potatoMessage, potatoAuthor)
        hideCreateTwitModal();
    } else {
        alert('You must have a message and an author');
    }
  }

function showModal() {
    var backdrop = document.getElementById('modal-backdrop');
    var modal = document.getElementById('create-message-modal');
  
    modalBackdrop.classList.remove('hidden');
    createTwitModal.classList.remove('hidden');
  }

function clear() {
    var elements = document.getElementsByClassName('message-input-element');
    for (var i = 0; i < elements.length; i++) {
      var input = elements[i].querySelector('input, textarea');
      input.value = '';
    }
  }
  
function hideModal() {
    var backdrop = document.getElementById('modal-backdrop');
    var modal = document.getElementById('create-message-modal');
  
    modalBackdrop.classList.add('hidden');
    modal.classList.add('hidden');
  
    clear();
  }

window.addEventListener('DOMContentLoaded', function () {
    var createTwitButton = document.getElementById('create-twit-button');
    if (createTwitButton) {
      createTwitButton.addEventListener('click', showCreateTwitModal);
    }
  
    var modalCloseButton = document.querySelector('#create-message-modal .modal-close-button');
    if (modalCloseButton) {
      modalCloseButton.addEventListener('click', hideModal);
    }
  
    var modalCancalButton = document.querySelector('#create-message-modal .modal-cancel-button');
    if (modalCancalButton) {
      modalCancalButton.addEventListener('click', hideModal);
    }
  
    var modalMessageButton = document.querySelector('#create-message-modal .modal-accept-button');
    if (modalMessageButton) {
      modalMessageButton.addEventListener('click', messages);
    }
  });
