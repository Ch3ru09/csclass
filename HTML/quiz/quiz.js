window.addEventListener("load", startup, false);

function startup() {
  const color = document.querySelector("#color");
  color.addEventListener("input", updateFirst, false);
  color.select();
  const submit = document.querySelector("#submit");
  submit.addEventListener("click", submitForm, false)
}

function updateFirst(event) {
  var div = document.getElementById("colorDiv");
  var dropdown = document.getElementById("subject");

  if (div) {
    div.style.color = event.target.value;
  }
  if (dropdown) {
    dropdown.style.color = event.target.value;
  }
}

function submitForm() {
  const form = document.forms['form']
  const names = getFormNames(form)
}

function getFormNames(form) {
  const inputNames = []
  for (var i = 0; i < form.length; i++) {
    if (form[i].type != 'radio' && form[i].id != 'submit' && form[i].id != 'color') {
      inputNames.push(form[i].id)
    }
  }
  return inputNames
}

  const formAnswers = []
  const answers = []
