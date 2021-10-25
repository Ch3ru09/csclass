  const colorpicker = document.getElementById('color')
  colorpicker.addEventListener("input", updateFirst, false);
  colorpicker.addEventListener("change", watchColorPicker, false);

function colorpicking(event) {
  const pickerStyles = getComputedStyle(colorpicker)
  const newColor = event.target.value
  colorpicker.style.setProperty('--color', String(newColor))
}
