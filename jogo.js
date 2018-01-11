//variaveis globais
var rodada = 1;
var matriz_jogo = Array(3);


//matriz do jogo, array dentro de array

//linhas a b e c
matriz_jogo['a'] = Array(3);
matriz_jogo['b'] = Array(3);
matriz_jogo['c'] = Array(3);

//definindo valores de cada indice
//colunas 1 2 3
matriz_jogo['a'][1] = 0;
matriz_jogo['a'][2] = 0;
matriz_jogo['a'][3] = 0;

matriz_jogo['b'][1] = 0;
matriz_jogo['b'][2] = 0;
matriz_jogo['b'][3] = 0;

matriz_jogo['c'][1] = 0;
matriz_jogo['c'][2] = 0;
matriz_jogo['c'][3] = 0;



//todo o codigo fica dentro desta função ready
$(document).ready(function(){

	$('#btn_inicio').click(function(){

		//validacao dos apelidos

		if ($('#jogador1').val() == '') {

			alert("Apelido do jogador 1 invalido");
			return false;
		}

		if ($('#jogador2').val() == '') {

			alert("Apelido do jogador 2 invalido");
			return false;
		}

		//exibindo apelidos

		$('#nome_jogador1').html($('#jogador1').val());
		$('#nome_jogador2').html($('#jogador2').val());

		//escondendo a tela principal 
		//apresentando a tela do jogo

		$('#palco_jogo').show();
		$('#pagina_inicial').hide();

	});

	//clique das td das grid do jogo

	$('.jogada').click(function(){

		$('#' + this.id).off();

	//chama a funcao jogada passando o id do elemento clicado.
		jogada(this.id);

	});

	function jogada(id){
		var ponto = 0;
		var imagem ="";

		$('#' +id).off();

		//caso esteja em uma rodada de numero impar é vez do 1 jogador
		if ((rodada % 2) == 1) {
			ponto = -1;
		//define a imagem de X ou O
			imagem = 'url("imagens/marcacao_1.png")';
		}

		//caso esteja em uma rodada de numero par é a vez do 2 jogador
		else{
			ponto = 1;
			imagem = 'url("imagens/marcacao_2.png")';
		}

		//incremento da variavel global rodada
		rodada++;

		//inserindo um atributo css no elemento que chamou a funcao
		$('#'+id).css('background-image',imagem);

		//quebrando o id para pegar os indices e incrementar na matriz
		//por exemplo id é a-1 : a,1

		//usando a funcao split passando como parametro o separador, neste caso o -
		var linha_coluna = id.split('-');

		//ao usar o split o id vira uma array, onde o indice zero sera a letra e o indice 1 sera o numero
		//exemplo linha_coluna de a-3 = linha_coluna[0] = a, linha_coluna[1] = 3

		//agora podemos atribuir o valor de linha_coluna para nossa matriz 

		//matriz_jogo['a'][1] = 0 ficara matriz_jogo[linha_coluna[0](LETRA)  [linha_coluna[1]](COLUNA) = ponto ou seja 1 ou -1

		matriz_jogo[linha_coluna[0]][linha_coluna[1]] = ponto;

		verifica_matriz();
	}

	//funcao para olhar as linhas das cordenadas da matriz (Linha, Coluna) e ver se existe um vencedor
	function verifica_matriz(){

		var pontos =0;

		//verificar na horizontal
		for (var i = 1; i <= 3; i++) {
			pontos += matriz_jogo['a'][i];
		}	
		ganhador(pontos);

		pontos = 0;

		for (var i = 1; i <= 3; i++) {
			pontos += matriz_jogo['b'][i];
		}	
		ganhador(pontos);

		pontos = 0;

		for (var i = 1; i <= 3; i++) {
			pontos += matriz_jogo['c'][i];
		}	
		ganhador(pontos);


		//verificar na vertical

		for (var l = 1; l<=3; l++) {
			pontos = 0;

			pontos += matriz_jogo['a'][l];
			pontos += matriz_jogo['b'][l];
			pontos += matriz_jogo['c'][l];

			ganhador(pontos);
			
		}

		//verificar na diagonal
		pontos =0;
		pontos = matriz_jogo['a'][1] + matriz_jogo['b'][2] + matriz_jogo['c'][3];
		ganhador(pontos);

		pontos =0;
		pontos = matriz_jogo['a'][3] + matriz_jogo['b'][2] + matriz_jogo['c'][1];
		ganhador(pontos);

	}

	function ganhador(pontos){
		if (pontos == -3) {
			alert('O jogador ' + $('#jogador1').val() + " venceu");
			//desligando os eventos 
			$('.jogada').off();
		}
		else if(pontos == 3){
			alert('O jogador ' + $('#jogador2').val() + " venceu");
			$('.jogada').off();
		}
		else if (rodada==10){
			alert('Nao houve vencedor! Tente novamente');
			$('.jogada').off();
			rodada =11;
		}
	}



	

	//***************** Reiniciar JOGO ***********************
	$('#btn_reinicio').click(function(){

		//zerar as variáveis de pontuação
        matriz_jogo['a'][1] = 0;
        matriz_jogo['a'][2] = 0;
        matriz_jogo['a'][3] = 0;
 
        matriz_jogo['b'][1] = 0;
        matriz_jogo['b'][2] = 0;
        matriz_jogo['b'][3] = 0;
 
        matriz_jogo['c'][1] = 0;
        matriz_jogo['c'][2] = 0;
        matriz_jogo['c'][3] = 0;

        rodada = 1;
 
        //limpar todos os campos já marcados
        $('.jogada').css('background-image', '');
 
        //reaplica os eventos de jogada ao elementos com a class jogada
        //fundamental caso seja um restart ao término do jogo, uma vez que a função 
        //ganhador limpa a função jogada do elemento se houver um ganhador
        $('.jogada').off();
        $('.jogada').click( function(){
            jogada(this.id);
        });
 
        //disparar o evento click do btn_inicio através da função trigger
        $("#btn_inicio").trigger('click');
    
	});

});

