$(document).ready(function() {
    $('.menu a').click(function(event) {
      event.preventDefault(); // Impede o comportamento padrão do link
      var page = $(this).attr('href'); // Obtém o valor do atributo href do link clicado
      
      // Carrega o conteúdo da página usando AJAX
      $('#conteudo').load(page + '.html');
    });
  });
  