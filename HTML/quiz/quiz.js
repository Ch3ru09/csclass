window.addEventListener("load", startup, false);

const answers = [
  {name: 'birthday', value: '2005-10-09'},
  {name: 'nationality', value: 'chine'},
  {name: 'school', value: 'école de la petite-gare'},
  {name: 'animal', value: 'cat'},
  {name: 'city', value: 'laprairie'},
  {name: 'subject', value: 'math'},
  {name: 'ageToCanada', value: '4'},
  {name: 'hobby', value: 'programmation'},
  {name: 'sport', value: 'badminton'},
]

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
  for (let i = 0; i < form.length; i++) {
    const value = form[i].value;
    if (!value) {
      alert('Fill all the fields')
      return;
    }
  }
  const values = getValues(form)
  JSON.stringify(values) === JSON.stringify(answers) ? alert('you are kinda right, congratulations')
    : alert('you are bad, retry')
}

function getValues(form) {
  const values = []
  for (var i = 0; i < form.length; i++) {
    const value = form[i].value.toLowerCase()
    const name = form[i].id
    if (form[i].type != 'radio' && form[i].type != 'submit' && form[i].type != 'color' && name != submit) {
      values.push({name, value})
    } else if (form[i].type == 'radio') {
      form[i].checked && values.push({name: 'animal', value})
    }
  }
  return values
}