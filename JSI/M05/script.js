let diasSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado"];
let corpo = document.querySelector(".corpo");
let anotacao =[30], dia;

criarCalendario();

//função principal que irá criar o calendario
function criarCalendario() {
    addTitulo();
    criarTabela();
    criarAreaRetorno();
    addElemntos();
}

//vai retornar o elemento criado
function criarTag(elemento) {
    return document.createElement(elemento);
}

function criarAreaRetorno() {
    let campo    = criarTag("div");
    let retorno  = criarTag("label");
    let label    = criarTag("label");
    let btn      = criarTag("input");
    let contBtn  = criarTag("div");
    let contArea = criarTag("div");
    let contText = criarTag("div");
    let textArea = criarTag("textArea");

    retorno.innerHTML = " - Dia escolhido!";
    label.innerHTML = " Anotações diárias!";

    btn.setAttribute("type", "submit");
    btn.setAttribute("value", "Gravar");
    btn.setAttribute("onclick", "gravarAnotacao()");
    textArea.setAttribute("id", "input-anotacao");
    textArea.setAttribute("placeholder", "Digite aqui sua anotação");
    retorno.setAttribute("id","retorno-dia");
    label.setAttribute("id","label-textArea");

   
    addClasses(retorno, "retorno");
    addClasses(textArea, "anotacoes");
    addClasses(btn, "botao-anotacoes");
    addClasses(campo, "container-retorno");
    addClasses(contArea, "sub-container-retorno");
    addClasses(contText, "sub-container-retorno");
    addClasses(contBtn, "sub-container-retorno");

    addFilhos(contArea, label); 
    addFilhos(contArea, textArea); 
    addFilhos(contText, retorno); 
    addFilhos(contBtn, btn); 

    //adicionando os container ao campo
    addFilhos(campo, contText); 
    addFilhos(campo, contArea); 
    addFilhos(campo, contBtn); 
  

    //inserindo o campo depois dos elementos já criados no container pai (no caso a tabela)
    corpo.insertAdjacentElement("beforeend", campo);

}

//adicionando o titulo
function addTitulo() {
    let titulo = document.querySelector("header span");
    titulo.textContent = "Calendário - Junho - 2023";
}

//criando a tabela
function criarTabela() {
    let tabela = criarTag("table");
    let tHead = criarTag("thead");
    let tBody = criarTag("tbody");
    let linha = criarTag("tr");

    for (let i = 0; i <= diasSemana.length; i++) {
        let th = criarTag("th");
        th.classList.add("celula");
        th.textContent = diasSemana[i];
        linha.appendChild(th);
    }

    tabela.classList.add("tabela");
    tHead.classList.add("header-tabela");
    tBody.classList.add("corpo-tabela");

    tHead.appendChild(linha);
    tabela.appendChild(tHead);
    tabela.appendChild(tBody);
    
    //adicionando a tabela no começo do elemento
    corpo.insertAdjacentElement("afterbegin", tabela);
}

//adicionando os elementos na tabela 
function addElemntos() {
    let linha, valor;
    let contador = 28;
    let atribuir = false;
    let corpoTabela = document.querySelector(".corpo-tabela");

    for (let i = 0; i <= 4; i++) {
        linha = criarTag("tr");

        for (let j = 0; j <= 6; j++) {
            let cell = criarTag("td");
            let campo = criarTag("button");

            //controlando os o reset dos numero e a atribição 
            if (contador > 27) {
                if (contador == 32) {
                    contador = 1;
                    atribuir = true;
                }

                if (contador > 30 && atribuir) {
                    contador = 1;
                    atribuir = false;
                }
            }

            if (atribuir) {
                valor = contador;
                campo.setAttribute("onclick", "acao(" + contador +")");
            }
            else {
                valor = "";
                addClasses(cell, "desativar");
                addClasses(campo, "botao-celula");
                campo.classList.add("desativar");
            }

            contador++
            campo.textContent = valor;

            addClasses(cell, "celula");
            addClasses(campo, "botao-celula");
            
            addFilhos(cell, campo);
            addFilhos(linha, cell);
        }

        //inserindo a linha na tabela
        addFilhos(corpoTabela,linha );
    }
}

//puxa as funcções para fazer a magia acontecer
function acao(parametro) {
    let texto =  document.getElementById("input-anotacao");
    dia = parametro;
    document.getElementById("retorno-dia").innerHTML = `${parametro} - ${retornaDiaSemana(parametro)} - feira`;
    
    if (dia != undefined && anotacao[dia] != undefined) {
       texto.value = anotacao[dia];
    } 
    else {
       texto.value = null;
    }

}

/*funções auxiliares para organização*/

//auxilio de inserçõo de elementos filhos
function addFilhos(pai, filho) {
    pai.appendChild(filho);
}

//auxilio para inserção de classes
function addClasses(elemento, nomeClasse) {
    elemento.classList.add(nomeClasse);
}

//retorna o dia da semana 
function retornaDiaSemana(parametro) {
    let dia, aux = 4; //quinta-feira no array (dia 1º)

    for (let i = 1; i <= 30; i ++) {
        if (i == parametro) {
            break;
        }    
        if (aux == 6){
            aux = 0;
        }
        else {
            aux++;
        }      
    }

    dia = diasSemana[aux];

    return `${dia}`;
}

//grava a anotacao
function gravarAnotacao(){
    if (dia != undefined) {
        let caixaTexto = document.getElementById("input-anotacao");
        
        if (caixaTexto.value.length > 0) {
            anotacao[dia] = caixaTexto.value;
            caixaTexto.value = "Anotação gravada com sucesso!";
        }  
        else {
            window.alert("Nenhuma anotação digitada.");
        }
    } 
    else {
        window.alert("Nenhum dia selecionado!");
    }
}
