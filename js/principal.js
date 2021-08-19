$('.btn[data-checkbox-name]').click(function() {
    $('input[name="'+$(this).data('checkboxName')+'"]').val(
        $(this).hasClass('active') ? 0 : 1
    );
});


var delay = 10;

 $(document).ready(function($){


   $("#celular").mask("(00) 0 0000-0000");
   $("#cep").mask("00000000");


   $('#celular').keyup(function() {
		        clearTimeout(this.interval);
		        this.interval = setTimeout(check_tudo, delay);
    });

  $('#nome_usuario').keyup(function() { 
            clearTimeout(this.interval);
            this.interval = setTimeout(check_tudo, delay);
   });

    $('#cep').keyup(function() { 
            clearTimeout(this.interval);
            this.interval = setTimeout(check_tudo, delay);
   });

  

   $(".btn").hide(); 

 });

 function limpa_formulario_cep() {
    // Limpa valores do formulário de cep.
     $("#cep").css('border', '3px solid rgb(93, 138, 8)'); 
            
        
    $("#bairro").val("");
    $("#bairro").css('border', '3px solid #f00');
        
    $("#cidade").val("");
    $("#cidade").css('border', '3px solid #f00');
        
    $("#estado").val("");   
    $("#estado").css('border', '3px solid #f00');
    }



function verifica_array(variavel){

     var contador=0;

       for(var i=0; i<3; i++)
       {
          if (variavel[i] == 1) 
            contador++;
       }

     return contador;
}



function check_tudo() {

        var celular      = $("#celular").val(); //desmascara e pega o valor para consultar 92991156376
        var nome_usuario = $("#nome_usuario").val(); 
        var cep          = $("#cep").val(); 
        var flagAtiva    = [0, 0, 0];
       
        /*-------------------------------------------------------*/
        if (celular.length > 15) { 

           if(flagAtiva[0] == 0) {                   
           flagAtiva[0]=1; 
           }

          if( verifica_array(flagAtiva) == 3) 
            $(".btn").show(); 
          else 
            $(".btn").hide(); 

          console.log(flagAtiva);

           celular = celular.replace(/[^0-9]+/g,'');
           $("#celular").css('border', '3px solid rgb(93, 138, 8)'); 
                      

        } else if (celular.length <= 15) {

          $("#celular").css('border', '3px solid #f00');           
          $(".btn").hide(); 

          flagAtiva[0]=0;          
        }

       /*-------------------------------------------------------*/
      if (nome_usuario.length > 4) { 
            

         if(flagAtiva[1] == 0) {                
           flagAtiva[1]=1; 
           }

          if( verifica_array(flagAtiva) == 3) 
            $(".btn").show(); 
          else 
            $(".btn").hide(); 

          console.log(flagAtiva);

           $("#nome_usuario").css('border', '3px solid rgb(93, 138, 8)');            
           
        } else if (nome_usuario.length <= 4) {

          $("#nome_usuario").css('border', '3px solid #f00');           
          $(".btn").hide(); 
          flagAtiva[1]=0;
          
        }
       /*-------------------------------------------------------*/

          if (cep != '' && cep != ' ' && cep.length == 8) { 
                       
                      
               limpa_formulario_cep(); /* tratativa de limpeza de campos*/
                  
               //Nova variável "cep" somente com dígitos.
                cep = $("#cep").val().replace(/\D/g, ''); 
                         
                //Expressão regular para validar o CEP.
                var validacep = /^[0-9]{8}$/;
                  
                //Valida o formato do CEP.
                if(validacep.test(cep)) {

                      //Preenche os campos com "..." enquanto consulta webservice.
                      //$("#endereco").val("...");
                      $("#bairro").val("...");
                      $("#cidade").val("...");
                      $("#estado").val("...");
                      

                          $.getJSON("https://viacep.com.br/ws/"+cep+"/json/?callback=?", function(dados) {

                          if (!("erro" in dados)) {

                              $('input#cep').css('border', '3px solid rgb(93, 138, 8)'); 
                              
                              //Atualiza os campos com os valores da consulta.
                              $("#informacoes").show();
                              
                              //$("#endereco").val(dados.logradouro); 
                              //$('input#endereco').css('border', '1px rgb(0, 153, 0) solid');
                              
                              
                              $("#bairro").val(dados.bairro);
                              $('input#bairro').css('border', '3px solid rgb(93, 138, 8)'); 

                              
                              $("#cidade").val(dados.localidade);
                              $('input#cidade').css('border', '3px solid rgb(93, 138, 8)'); 
                              
                              
                              $("#estado").val(dados.uf);
                              $('input#estado').css('border', '3px solid rgb(93, 138, 8)'); 
                              
                              $('#erro_cep').hide(); 
                        
                              flagAtiva[2]=1;
                  
                              console.log(flagAtiva);

                              if( verifica_array(flagAtiva) == 3) 
                                $(".btn").show(); 
                              else 
                                $(".btn").hide();                                     
                                                                            

                          } else {
                              //CEP pesquisado não foi encontrado.
                              limpa_formulario_cep();
                           

                              $('#erro_cep').show();                                        
                              $(".btn").hide();                                         
                              $("#informacoes").hide();
                              flagAtiva[2]=0;
                          }
                      
                      }); //fimGetJson
                  
                     } //fimValidaCep
                        
        } else { //seNaoOkCEP

          limpa_formulario_cep();
          $("#cep").css('border', '3px solid #f00');                  
          $(".btn").hide(); 
          $('#erro_cep').hide();
          flagAtiva[2]=0;
          console.log(flagAtiva[2]);                 
        }

        //console.log("Contador:"+contador);
 
 } //fimCheckTudo 


   function carrega(item){
      $("#item01").css("display", "none");       
      $("#item02").css("display", "none"); 
      $("#item03").css("display", "none"); 
      $("#item04").css("display", "none"); 
      $("#item05").css("display", "none"); 
      $("#item06").css("display", "none"); 

      $(item).css("display", "block"); 
      console.log(item);     
   }


  $('#finalizar').on('click', function(){

      
      var usuario  = $("#nome_usuario").val();
      var bairro= $("#bairro").val();
      var cidade  = $("#cidade").val();
      var estado  = $("#estado").val();
      var celular  = $("#celular").val();
      //celular  = celular.replace(/[^0-9]+/g,'');

                            
      var q2 = parseInt($("input[name='q02']:checked").val());     
      var q3 = parseInt($("input[name='q03']:checked").val());     
      var q4 = parseInt($("input[name='q04']:checked").val());
      /* - - - Doenças  */     
      var q5 = $("input[name='q05']:checked").val() > 0 ? parseInt($("input[name='q05']:checked").val()) : 0   
      var q6 = $("input[name='q06']:checked").val() > 0 ? parseInt($("input[name='q06']:checked").val()) : 0   
      var q7 = $("input[name='q07']:checked").val() > 0 ? parseInt($("input[name='q07']:checked").val()) : 0   
      var q8 = $("input[name='q08']:checked").val() > 0 ? parseInt($("input[name='q08']:checked").val()) : 0   
      var q9 = $("input[name='q09']:checked").val() > 0 ? parseInt($("input[name='q09']:checked").val()) : 0   
      var q10 = $("input[name='q10']:checked").val() > 0 ? parseInt($("input[name='q10']:checked").val()) : 0   
      var q11 = $("input[name='q11']:checked").val() > 0 ? parseInt($("input[name='q11']:checked").val()) : 0   
      var q12 = $("input[name='q12']:checked").val() > 0 ? parseInt($("input[name='q12']:checked").val()) : 0   


      var soma = q2+q3+q4+q5+q6+q7+q8+q9+q10+q11+q12;
      var indice = (soma*100)/110;
          indice = indice.toFixed(2);

        console.log("q2:"+q2);
        console.log("q3:"+q3);
        console.log("q4:"+q4);
        console.log("q5:"+q5);
        console.log("q6:"+q6);
        console.log("q7:"+q7);
        console.log("q8:"+q8);
        console.log("q9:"+q9);
        console.log("q10:"+q10);
        console.log("q11:"+q11);
        console.log("q12:"+q12);

        console.log("Somatoria:"+soma);
        console.log("Indice:"+indice+" %");

        /*
        Somando todas as questões temos a pontuação máxima de 110 
        (esse vai ser o 100% da probabilidade do cara estar doente.

        100% - 70 % - GRAVE
        69%  - 40 % - MÉDIO
        39%  - 20 % - LEVE
             < 20 % - NÃO CONCLUSIVO.

        */

if (indice > 70 && indice <= 100 ) {

 swal({
        backdrop:true,
        allowOutsideClick: false,
        title:'Medical Bot',
        text:'?',
        type:'error',
        showCancelButton: 0,
         html: `<div class='box-content'>
                  Diagnóstico Inteligente
                  <table id="table" >
                      <tbody>
                      <tr>
                        <th>Nome:</th>
                        <td>`+usuario+`</td>
                      </tr>
                      <tr>
                        <th>Telefone:</th>
                        <td>`+celular+`</td>
                      </tr>
                      <tr>
                        <th>Bairro:</th>
                        <td>`+bairro+`</td>
                      </tr>

                       <tr>
                        <th>Índice de Chance:</th>
                        <td>Você possui `+indice+` % de chance de estar doente</td>
                      </tr>

                      <tr>
                        <th>Status da Classificação</th>
                        <td>GRAVE</td>
                      </tr>  

                       <tr>
                        <th>Indicação:</th>
                        <td>Procure um pronto-socorro para atendimento o mais rápido possível, seu caso pode ser grave! Recomendamos ISOLAMENTO TOTAL quando em casa.</td>
                      </tr>                      

                      </tbody>
                  </table> </div>`,

        confirmButtonText: 'OK',

     }).then(function(e) {
        if (e.value) {
               window.open('index.html', '_self'); 
        }
    });

} else if (indice > 40 && indice <= 69 ) {

 swal({
        backdrop:true,
        allowOutsideClick: false,
        title:'Medical Bot',
        text:'?',
        type:'info',
        showCancelButton: 0,
         html: `<div class='box-content'>
                  Diagnóstico Inteligente
                  <table id="table" >
                      <tbody>
                      <tr>
                        <th>Nome:</th>
                        <td>`+usuario+`</td>
                      </tr>
                      <tr>
                        <th>Telefone:</th>
                        <td>`+celular+`</td>
                      </tr>
                      <tr>
                        <th>Localidade:</th>
                        <td>`+bairro+`/`+cidade+`/`+estado+`</td>
                      </tr>

                       <tr>
                        <th>Índice de Chance:</th>
                        <td>Você possui `+indice+` % de chance de estar doente</td>
                      </tr>
                     
                       <tr>
                        <th>Status da Classificação</th>
                        <td>MÉDIO</td>
                      </tr>  

                       <tr>
                        <th>Indicação:</th>
                        <td>Procure seguir as recomendações de ficar em casa e se cuidar! Caso os sintomas piorem um médico deve ser consultado. Use máscaras de proteção.</td>
                      </tr>                      

                      </tbody>
                  </table> </div>`,

        confirmButtonText: 'OK',

     }).then(function(e) {
        if (e.value) {
               window.open('index.html', '_self'); 
        }
    });

} else if (indice > 20 && indice <= 39 ) {

 swal({
        backdrop:true,
        allowOutsideClick: false,
        title:'Medical Bot',
        text:'?',
        type:'info',
        showCancelButton: 0,
         html: `<div class='box-content'>
                  Diagnóstico Inteligente
                  <table id="table" >
                      <tbody>
                      <tr>
                        <th>Nome:</th>
                        <td>`+usuario+`</td>
                      </tr>
                      <tr>
                        <th>Telefone:</th>
                        <td>`+celular+`</td>                        
                      </tr>
                     <tr>
                        <th>Localidade:</th>
                        <td>`+bairro+`/`+cidade+`/`+estado+`</td>
                      </tr>

                       <tr>
                        <th>Índice de Chance:</th>
                        <td>Você possui `+indice+` % de chance de estar doente</td>
                      </tr>

                       <tr>
                        <th>Status da Classificação</th>
                        <td>LEVE</td>
                      </tr>                      

                       <tr>
                        <th>Indicação:</th>
                        <td>Você tem sintomas leves e muito possivelmente está apenas com um resfriado, cuide-se que em mais alguns dias você estará melhor! Lave as mãos e use máscaras.</td>
                      </tr>                      

                      </tbody>
                  </table> </div>`,

        confirmButtonText: 'OK',

     }).then(function(e) {
        if (e.value) {
               window.open('index.html', '_self'); 
        }
    });


} else {


 swal({
        backdrop:true,
        allowOutsideClick: false,
        title:'Medical Bot',
        text:'?',
        type:'success',
        showCancelButton: 0,
         html: `<div class='box-content'>
                  Diagnóstico Inteligente
                  <table id="table" >
                      <tbody>
                      <tr>
                        <th>Nome:</th>
                        <td>`+usuario+`</td>
                      </tr>
                      <tr>
                        <th>Telefone:</th>
                        <td>`+celular+`</td>
                      </tr>
                      <tr>
                        <th>Localidade:</th>
                        <td>`+bairro+`/`+cidade+`/`+estado+`</td>
                      </tr>

                      <tr>
                        <th>Índice de Chance:</th>
                        <td>Você possui `+indice+` % de chance de estar doente</td>
                      </tr>

                       <tr>
                        <th>Status da Classificação</th>
                        <td>NÃO CONCLUSIVO</td>
                      </tr>

                       <tr>
                        <th>Indicação:</th>
                        <td>Você possui resultados não conclusivos, portanto não é possível considerá-lo como um paciente assintomático ou mesmo que você esteja doente.Cuide-se!</td>
                      </tr>                      

                      </tbody>
                  </table> </div>`,

        confirmButtonText: 'OK',

      }).then(function(e) {
        if (e.value) {
               window.open('index.html', '_self'); 
        }
      });

  
  } //fimElse


}); /*sair*/      