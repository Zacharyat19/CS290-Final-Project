var potatoSubmissionForm = document.querySelector('.potatoSubmit')
var messageSubmissionForm = document.querySelector('.messageSubmit')

var potatoSubmissionTab = document.querySelector(".new-potato")
potatoSubmissionTab.addEventListener('click', function () {
  //document.querySelector(".footer").classList.remove("hidden")
  potatoSubmissionForm.classList.remove('hidden')
  messageSubmissionForm.classList.add('hidden')
})

var messageSubmissionTab = document.querySelector(".new-message")
messageSubmissionTab.addEventListener('click', function () {
  //document.querySelector(".footer").classList.remove("hidden")
  messageSubmissionForm.classList.remove('hidden')
  potatoSubmissionForm.classList.add('hidden')
})


window.onload = randomize()

function randomize() {
  var arr = document.getElementsByClassName("message")
  for (item of arr) {
    item.style.top = (Math.floor(Math.random() * 25) + 25) + "%";
    item.style.right = (Math.floor(Math.random() * 50) + 25) + "%";

  }
  var length = arr.length
  if (length > 3) {
    var prob = 3 / length
    for (ele of arr) {
      var eleProb = Math.random()
      if (eleProb > prob) {
        ele.parentNode.removeChild(ele)
      }
    }
  }
}


function insertMessage(potatoMessage) {
  var tempContext = {
    message: potatoMessage
  }

  var message = Handlebars.templates.message(tempContext)
  var container = document.querySelector(".container")
  container.insertAdjacentHTML("beforeEnd", message)
}

function messages() {
  var potatoMessage = document.getElementById('message-text-input').value;
  var potatoAuthor = document.getElementById('message-author-input').value;

  if (potatoMessage && potatoAuthor) {
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