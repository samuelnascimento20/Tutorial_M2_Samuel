// HTML
<button id="experiencia-btn">Experiência</button>
<div id="experiencia-section">...</div>

// JavaScript
$(document).ready(function() {
  $("#experiencia-btn").click(function() {
    $("#experiencia-section").toggle();
  });
});
