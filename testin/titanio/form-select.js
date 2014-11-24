function load_selects() {
  $.ajax({
    type: "get",
    url: 'italia.json',
    dataType: "json",
    success: function (data) {

        $('#regione').empty().append('<option value="0">Seleziona Regione</option>').removeAttr('disabled');
        
        $.each(data.regioni, function (index, item) {
            var n = item.nome;
            $('#regione').append('<option value="' + n +'">' + n + '</option>');
        });
        
        $('#regione').change(function(){
            if($(this).val()!='0'){
                $('#provincia').removeAttr('disabled');
            }
        });
        
    }
  });
}

//READY
$(function () {
    
  $('input[name=localizzazione]:radio').change(function(){
      if($(this).val()=='locali'){
        load_selects();
      }else if ($(this).val()=='nazionali'){
        $('#regione').empty().append('<option value="">...</option>').attr('disabled','disabled');
        $('#provincia').empty().append('<option value="">...</option>').attr('disabled','disabled');  
      }
  });

  $('#messaggio').keyup(function(){
      if(this.value.match(/[^a-zA-Z0-9,.:; ]/g)) this.value = this.value.replace(/[^a-zA-Z0-9,.:; ]/g, '');
  });

  $('#form').submit(function(event){
    event.preventDefault();
  });

});
