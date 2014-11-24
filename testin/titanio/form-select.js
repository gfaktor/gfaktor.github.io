var loaded;
var regioni = {};

function load_json(){
    $.ajax({
        type: "get",
        url: 'italia.json',
        dataType: "json",
        success: function(data){
            loaded = true;
            regioni = data.regioni;
        }
    });
}

function load_selects() {
    if(loaded){
        
        $('#regione').empty().append('<option value="null">Seleziona Regione</option>').removeAttr('disabled');

        $.each(regioni, function (i, val) {
            var id = i;
            var regione = val.nome;
            $('#regione').append('<option value="'+ i +'">' + regione + '</option>');
        });

        $('#regione').change(function(){
            
            if($(this).val()!='null'){
                
                $('#provincia').empty().append('<option value="null">Seleziona Provincia</option>').removeAttr('disabled');
                
                var id = $('option:selected', this).val();
                
                $.each(regioni[id].province, function (i, val){
                    var sigla = val.sigla;
                    var nome = val.nome;
                    $('#provincia').append('<option value="' + sigla +'">' + nome + '</option>');
                });
            
            }else{
                       
               $('#provincia').empty().append('<option value="null">...</option>').attr('disabled','disabled'); 
            
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
            $('#regione, #provincia').empty().append('<option value="null">...</option>').attr('disabled','disabled');
    });

    $('#messaggio').keyup(function(){
        if(this.value.match(/[^a-zA-Z0-9,.:; ]/g)) this.value = this.value.replace(/[^a-zA-Z0-9,.:; ]/g, '');
    });

    $('#form').submit(function(event){
        event.preventDefault();
    });

});
