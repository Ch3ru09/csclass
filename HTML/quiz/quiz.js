window.addEventListener("load", startup, false);

function startup() {
  const color = document.querySelector("#color");
  color.addEventListener("input", updateFirst, false);
  color.select();
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


const form = document.getElementsByTagName('form')


function submitForm() {
  const inputNames = []
  const answers = []
  console.log('>>', form);
}
