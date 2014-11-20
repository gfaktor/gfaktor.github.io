function load_regioni() {
  $.ajax({
    type: "get",
    url: 'italia.json',
    dataType: "json",
    success: function (data) {
      $('#regione').empty().append('<option value="">Seleziona Regione</option>').removeAttr('disabled');
      $.each(data.regioni, function (index, item) {
        var n = item.nome;
        $('#regione').append('<option value="' + n +'">' + n + '</option>');
      });
    }
  });
}

function load_province(regione) {
  $.ajax({
    type: "post",
    url: 'italia.json',
    dataType: "json",
    success: function (data) {
      $('#provincia').empty().append('<option value="">Seleziona Provincia</option>').removeAttr('disabled');
      $.each(data.regioni, function (index, item) {
        var capoluoghi = item.capoluoghi;
        var codice = item.province;
        $('#provincia').append('<option value="' + codice + '">' + capoluoghi + '</option>');
      });
    }
  });
}

//READY
$(function () {

  $('input[name=localizzazione]:radio').change(function(){
      if($(this).val()=='locali'){
        load_regioni();
      }else if ($(this).val()=='nazionali'){
        $('#regione').attr('disabled','disabled');
        $('#provincia').attr('disabled','disabled');
      }
  });

  $('#regione').change(function(){
      if($(this).val()!='0'){
        load_province();
      }else{ 
        $('#provincia').attr('disabled','disabled');
      }
  });

  $('#messaggio').keyup(function(){
      if(this.value.match(/[^a-zA-Z0-9,.:; ]/g)) this.value = this.value.replace(/[^a-zA-Z0-9,.:; ]/g, '');
  });


  $('.regione').change(function() {
    var cat = $(this).attr('rel');
    var provincia = $('option:selected', this).attr('label');
    checkprovince(cat, provincia);
  });

  $('#form').submit(function(event){
    event.preventDefault();
  });

});
