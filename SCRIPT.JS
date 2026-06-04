// array onde vou guardar os pacientes cadastrados
const pacientes = [];

// criei esse objeto pra ligar o id do campo com o nome bonito que aparece no erro
// assim quando o usuario nao preenche, aparece "Nome completo" e nao só "nome"
const nomesCampos = {
  "nome":         "Nome completo",
  "data":         "Data de nascimento",
  "sexo":         "Sexo",
  "documento":    "RG ou CPF",
  "estado-civil": "Estado civil",
  "cep":          "CEP",
  "numero":       "Número",
  "rua":          "Rua",
  "bairro":       "Bairro",
  "cidade":       "Cidade",
  "email":        "E-mail",
  "celular":      "Celular"
};

// Object.keys pega só as chaves do objeto, ou seja, os ids dos campos obrigatorios
// isso evita ter que repetir os ids em outro lugar
const obrigatorios = Object.keys(nomesCampos);

// pego o formulario aqui fora pra nao precisar buscar ele toda hora
const formulario = document.getElementById("form-cadastro");


// =============================================================================
// LIMPEZA DOS CAMPOS NUMERICOS
// o replace com /\D/g remove tudo que nao for numero
// o "g" significa que ele faz isso em todos os caracteres, nao so no primeiro
// =============================================================================

// enquanto o usuario digita no campo cep, tiro qualquer letra ou simbolo
document.getElementById("cep").addEventListener("input", function() {
  this.value = this.value.replace(/\D/g, "");
});

// mesmo esquema no campo de documento (cpf ou rg)
document.getElementById("documento").addEventListener("input", function() {
  this.value = this.value.replace(/\D/g, "");
});

// celular so pode ter numero tambem
document.getElementById("celular").addEventListener("input", function() {
  this.value = this.value.replace(/\D/g, "");
});

// telefone fixo é opcional mas se preencher tem que ser so numero
document.getElementById("telefone-fixo").addEventListener("input", function() {
  this.value = this.value.replace(/\D/g, "");
});

// numero do sus é gigante mas tambem so aceita digitos
document.getElementById("sus").addEventListener("input", function() {
  this.value = this.value.replace(/\D/g, "");
});


// =============================================================================
// EVENTO DE SUBMIT (quando clica em "Finalizar cadastro")
// =============================================================================

formulario.addEventListener("submit", function(event) {

  // isso aqui impede a pagina de recarregar quando o formulario é enviado
  // sem esse preventDefault o navegador ia recarregar e perder tudo
  event.preventDefault();

  // pego as divs de feedback e resumo que vou mostrar ou esconder
  const alerta   = document.getElementById("feedback-alerta");
  const feedback = document.getElementById("feedback-mensagem");
  const resumo   = document.getElementById("secao-resumo");

  // começo assumindo que ta tudo certo
  let valido = true;

  // vou jogando os nomes dos campos vazios aqui pra montar o alerta depois
  const camposVazios = [];

  // vou jogando os erros de formato aqui (ex: cep com menos de 8 digitos)
  const camposInvalid = [];

  // PARTE 1: checo se os campos obrigatorios foram preenchidos
  for (let i = 0; i < obrigatorios.length; i++) {
    const id    = obrigatorios[i];
    const campo = document.getElementById(id);

    if (campo.value.trim() === "") {
      // trim() tira espacos em branco das pontas, entao se o usuario só digitar espaco, isso conta como vazio
      campo.classList.add("is-invalid");     // coloca a borda vermelha do bootstrap
      camposVazios.push(nomesCampos[id]);    // guardo o nome bonito pra mostrar no erro
      valido = false;
    } else {
      campo.classList.remove("is-invalid"); // se ta preenchido, tiro o erro se tiver
    }
  }

  // PARTE 2: verifico o formato dos campos numericos
  // so faço essa verificaçao se o campo tiver alguma coisa (length > 0)

  // cep precisa ter exatamente 8 digitos
  const cepVal = document.getElementById("cep").value.replace(/\D/g, "");
  if (cepVal.length > 0 && cepVal.length !== 8) {
    document.getElementById("cep").classList.add("is-invalid");
    camposInvalid.push("CEP deve ter 8 dígitos");
    valido = false;
  }

  // cpf tem 11 digitos, rg tem entre 7 e 9 — aceito os dois
  const docVal = document.getElementById("documento").value.replace(/\D/g, "");
  if (docVal.length > 0 && docVal.length !== 11 && (docVal.length < 7 || docVal.length > 9)) {
    document.getElementById("documento").classList.add("is-invalid");
    camposInvalid.push("RG ou CPF com quantidade de dígitos inválida");
    valido = false;
  }

  // celular tem 11 no total
  const celVal = document.getElementById("celular").value.replace(/\D/g, "");
  if (celVal.length > 0 && celVal.length !== 11) {
    document.getElementById("celular").classList.add("is-invalid");
    camposInvalid.push("Celular deve ter DDD + 9 dígitos (11 no total)");
    valido = false;
  }

  // PARTE 3: se tiver qualquer erro monto a mensagem e paro tudo aqui
  if (valido === false) {

    // começo com string vazia e vou concatenando as partes
    let listaErros = "";

    if (camposVazios.length > 0) {
      // map transforma cada nome em um <li>, join junta tudo numa string só
      listaErros += "<strong>Campos obrigatórios não preenchidos:</strong><ul class='mb-1 mt-1'>"
                  + camposVazios.map(function(n) { return "<li>" + n + "</li>"; }).join("")
                  + "</ul>";
    }

    if (camposInvalid.length > 0) {
      listaErros += "<strong>Corrija os erros de formato:</strong><ul class='mb-0 mt-1'>"
                  + camposInvalid.map(function(n) { return "<li>" + n + "</li>"; }).join("")
                  + "</ul>";
    }

    alerta.className = "alert alert-danger fw-medium";
    alerta.innerHTML = "❌ " + listaErros;
    feedback.classList.remove("d-none"); // d-none é a classe do bootstrap que esconde o elemento
    feedback.scrollIntoView({ behavior: "smooth" }); // rola a tela ate o alerta
    return; // para aqui, nao executa o resto da funçao
  }

  // PARTE 4: se cheguei aqui é porque tudo ta preenchido e correto
  // pego o endereco em variaveis separadas pra montar a string final
  const rua    = document.getElementById("rua").value;
  const numero = document.getElementById("numero").value;
  const bairro = document.getElementById("bairro").value;
  const cidade = document.getElementById("cidade").value;
  const estado = document.getElementById("estado").value;

  // empurro um objeto novo no array com os dados do paciente
  pacientes.push({
    nome:      document.getElementById("nome").value,
    data:      document.getElementById("data").value.split("-").reverse().join("/"),
    sexo:      document.getElementById("sexo").value,
    documento: document.getElementById("documento").value,
    celular:   document.getElementById("celular").value,
    email:     document.getElementById("email").value,
    endereco:  rua + ", Nº " + numero + " - " + bairro + ", " + cidade + "/" + estado,
    convenio:  document.getElementById("convenio").value,
    medico:    document.getElementById("medico").value
  });

  // pacientes.length - 1 é o indice do ultimo elemento, ou seja o que acabei de salvar
  const p = pacientes[pacientes.length - 1];

  // preencho os spans do resumo com os dados do paciente que acabei de salvar
  document.getElementById("resumo-nome").innerText     = p.nome;
  document.getElementById("resumo-data").innerText     = p.data;
  document.getElementById("resumo-sexo").innerText     = p.sexo;
  document.getElementById("resumo-doc").innerText      = p.documento;
  document.getElementById("resumo-cel").innerText      = p.celular;
  document.getElementById("resumo-email").innerText    = p.email;
  document.getElementById("resumo-endereco").innerText = p.endereco;
  document.getElementById("resumo-medico").innerText   = p.convenio + " / " + p.medico;

  // mostro a mensagem verde de sucesso
  alerta.className = "alert alert-success text-center fw-medium";
  alerta.innerText = "✅ Cadastro realizado com sucesso!";
  feedback.classList.remove("d-none");

  // mostro o card de resumo e rolo a tela ate ele
  resumo.classList.remove("d-none");
  resumo.scrollIntoView({ behavior: "smooth" });

  // limpo os campos obrigatorios um por um
  // nao usei o reset() do formulario porque ele esconderia o resumo que acabei de mostrar
  for (let i = 0; i < obrigatorios.length; i++) {
    document.getElementById(obrigatorios[i]).value = "";
    document.getElementById(obrigatorios[i]).classList.remove("is-invalid");
  }

  // limpo tambem os campos opcionais que nao estao no array de obrigatorios
  document.getElementById("sus").value              = "";
  document.getElementById("carteirinha").value      = "";
  document.getElementById("observacoes").value      = "";
  document.getElementById("telefone-fixo").value    = "";
  // selectedIndex 0 volta o select para a primeira opçao (o "Selecione...")
  document.getElementById("convenio").selectedIndex = 0;
  document.getElementById("medico").selectedIndex   = 0;
});


// =============================================================================
// EVENTO DE RESET (quando clica em "Limpar formulário")
// =============================================================================

formulario.addEventListener("reset", function() {

  // escondo o resumo e o alerta quando o usuario limpa o formulario
  document.getElementById("secao-resumo").classList.add("d-none");
  document.getElementById("feedback-mensagem").classList.add("d-none");

  // querySelectorAll pega todos os elementos com a classe is-invalid de uma vez
  const comErro = document.querySelectorAll(".is-invalid");
  for (let i = 0; i < comErro.length; i++) {
    comErro[i].classList.remove("is-invalid"); 
  }
});


// =============================================================================
// FUNÇAO VER LISTA DE PACIENTES
// essa funçao é chamada pelo botao "Ver lista de pacientes" la no html
// =============================================================================

function verListaPacientes() {

  const secaoLista = document.getElementById("secao-lista");
  const tbody      = document.getElementById("lista-tbody");
  const mensagem   = document.getElementById("lista-mensagem");

  // limpo o tbody antes de montar de novo pra nao duplicar as linhas
  tbody.innerHTML = "";

  // se nao tiver ninguem cadastrado ainda, mostro uma mensagem e saio da funçao
  if (pacientes.length === 0) {
    mensagem.innerHTML = "Nenhum paciente cadastrado ainda.";
    secaoLista.classList.remove("d-none");
    secaoLista.scrollIntoView({ behavior: "smooth" });
    return;
  }

  // se chegou aqui é porque tem paciente, entao limpo a mensagem e monto a tabela
  mensagem.innerHTML = "";

  for (let i = 0; i < pacientes.length; i++) {
    // uso template string (crase) pra montar o html da linha de forma mais facil
    // o i+1 é só pra a numeraçao comecar em 1 em vez de 0
    tbody.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${pacientes[i].nome}</td>
        <td>${pacientes[i].data}</td>
        <td>${pacientes[i].sexo}</td>
        <td>${pacientes[i].documento}</td>
        <td>${pacientes[i].celular}</td>
        <td>${pacientes[i].convenio}</td>
        <td><button class="btn btn-danger btn-sm" onclick="excluirPaciente(${i})">Excluir</button></td>
      </tr>
    `;
  }

  secaoLista.classList.remove("d-none");
  secaoLista.scrollIntoView({ behavior: "smooth" });
}


// =============================================================================
// FUNÇAO EXCLUIR PACIENTE
// é chamada pelo botao de excluir de cada linha da tabela
// recebe o indice do paciente no array como parametro
// =============================================================================

function excluirPaciente(indice) {

  // pergunto antes de excluir pra evitar exclusao acidental
  if (confirm("Deseja excluir este paciente?") === false) {
    return; // se o usuario clicou em cancelar, nao faz nada
  }

  // splice remove 1 elemento a partir da posiçao do indice
  pacientes.splice(indice, 1);

  // redesenho a tabela com a lista atualizada
  verListaPacientes();

  // se depois de excluir nao sobrou ninguem, escondo a seçao inteira
  if (pacientes.length === 0) {
    document.getElementById("secao-lista").classList.add("d-none");
  }
}


// =============================================================================
// BUSCA DE CEP COM A API VIACEP
// esse evento roda quando o usuario sai do campo cep (evento blur = perda de foco)
// =============================================================================

document.getElementById("cep").addEventListener("blur", function() {

  // tiro tudo que nao for numero antes de mandar pra api
  const cep = this.value.replace(/\D/g, "");

  // so faço a busca se tiver exatamente 8 digitos
  if (cep.length !== 8) {
    return;
  }

  // fetch é uma forma de fazer requisiçao pra uma url sem recarregar a pagina
  fetch("https://viacep.com.br/ws/" + cep + "/json/")
    .then(function(resposta) {
      return resposta.json(); // converte a resposta de texto pra objeto javascript
    })
    .then(function(dados) {

      // se o cep nao existir a api retorna um objeto com { erro: true }
      if (dados.erro) {
        alert("CEP não encontrado!");
        return;
      }

      // preencho os campos de endereço automaticamente com o que veio da api
      document.getElementById("rua").value    = dados.logradouro;
      document.getElementById("bairro").value = dados.bairro;
      document.getElementById("cidade").value = dados.localidade;
      document.getElementById("estado").value = dados.uf;

      // tiro o is-invalid dos campos que acabei de preencher automaticamente
      document.getElementById("rua").classList.remove("is-invalid");
      document.getElementById("bairro").classList.remove("is-invalid");
      document.getElementById("cidade").classList.remove("is-invalid");
    })
    .catch(function() {
      // catch pega qualquer erro de rede ou se a api estiver fora do ar
      alert("Erro ao buscar o CEP. Verifique sua conexão.");
    });
});