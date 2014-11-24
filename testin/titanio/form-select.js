var loaded;
var italia = {};

function load_json(){
    $.ajax({
        type: "get",
        url: 'italia.json',
        dataType: "json",
        success: function(data){
            loaded = true;
            italia = data.regioni;
        }
    });
}

function load_selects() {
    if(loaded){
        
        $('#regione').empty().append('<option value="0">Seleziona Regione</option>').removeAttr('disabled');

        $.each(italia, function (i, val) {
            var regione = val.nome;
            $('#regione').append('<option value="' + regione +'">' + regione + '</option>');
        });

        $('#regione').change(function(){
            
            if($(this).val()!='0'){
                
                var regione_selezionata = $('option:selected', this);
                console.log(regione_selezionata);
                $('#provincia').empty().append('<option value="0">Seleziona Provincia</option>').removeAttr('disabled');
                
                $.each(italia.+regione_selezionata, function (i, val) {
                    var sigla = val.sigla;
                    var nome = val.nome; 
                    $('#provincia').append('<option value="' + sigla +'">' + nome + '</option>');
                });
            
            }else{
                       
               $('#provincia').empty().append('<option value="">...</option>').attr('disabled','disabled'); 
            
            }

        });  
    }
}

//READY
$(function () {
    
    load_json();
    
    $('input[name=localizzazione]:radio').change(function(){
        if($(this).val()=='locali')
            load_selects();
        else if ($(this).val()=='nazionali')
            $('#regione, #provincia').empty().append('<option value="">...</option>').attr('disabled','disabled');
    });

    $('#messaggio').keyup(function(){
        if(this.value.match(/[^a-zA-Z0-9,.:; ]/g)) this.value = this.value.replace(/[^a-zA-Z0-9,.:; ]/g, '');
    });

    $('#form').submit(function(event){
        event.preventDefault();
    });

});
