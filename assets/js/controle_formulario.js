//import {Funcionario, Gerente, Desenvolvedor} from "./funcionarios.js";

var funcionarios = [];

function testa_campos_cadastro() {
    const form = document.getElementById('form_cadastrar_funcionarios');
    const div_error_message = document.getElementById('error_message');
    const nome = form.elements.namedItem('name').value;
    const idade = Number(form.elements.namedItem('idade').value);
    const cargo = form.elements.namedItem('cargo').value;
    const gerente_radio = document.getElementById('gerente');
    const desenvolvedor_radio = document.getElementById('desenvolvedor');

    div_error_message.innerHTML = ''

    if (Number(nome) == 0) {
        throw new Error("É obrigatório digitar um nome para o funcionário.")
    }

    if (!isNaN(Number(nome))) {
        throw new Error("O nome do funcionário não pode ser um número.");
    }

    if ((isNaN(idade)) || (idade <= 15) || (idade % 1 !== 0)) {
        throw new Error("A idade deve ser um número inteiro maior ou igual a 16.");
    }

    if (Number(cargo) == 0) {
        throw new Error("É obrigatório informar um cargo para o funcionário.")
    }

    if (!isNaN(Number(cargo))) {
        throw new Error("O cargo do funcionário não pode ser um número.");
    }

    if (gerente_radio.checked) {
        const departamento = form.elements.namedItem('departamento').value;
        if (departamento == '') {
            throw new Error("É obrigatório informar um departamento para o gerente");
        }

        var funcionario = new Gerente(nome, idade, departamento);
        funcionarios.push(funcionario);
        adiciona_cards_funcionarios();
        alert(`Gerente cadastrado com sucesso!`);
        return;
    }

    if (desenvolvedor_radio.checked) {
        const linguagem = form.elements.namedItem('linguagem').value;
        if (linguagem == '') {
            throw new Error("É obrigatório informar uma linguagem de programação para o desenvolvedor");
        }

        var funcionario = new Desenvolvedor(nome, idade, linguagem);
        funcionarios.push(funcionario)
        adiciona_cards_funcionarios();
        alert(`Desenvolvedor cadastrado com sucesso!`);
        return;
    }

    var funcionario = new Funcionario(nome, idade, cargo);
    funcionarios.push(funcionario);
    adiciona_cards_funcionarios();
    alert(`Funcionário cadastrado com sucesso!`);
}

function cadastrar() {
    try {
        testa_campos_cadastro();
    } catch (error) {
        const div_error_message = document.getElementById('error_message');
        div_error_message.innerHTML = `<b> ${error.message} </b>`
    }
}

function opcao_cargo() {
    const form = document.getElementById('form_cadastrar_funcionarios');
    const gerente_radio = document.getElementById('gerente');
    const desenvolvedor_radio = document.getElementById('desenvolvedor');
    const form_group_departamento = document.getElementById('form_group_departamento');
    const form_group_linguagem = document.getElementById('form_group_linguagem');

    const cargo = form.elements.namedItem('cargo');

    if (gerente_radio.checked) {
        cargo.value = "Gerente";
        cargo.disabled = true;

        form_group_departamento.innerHTML = '<label for="departamento">Departamento:</label><input type="text" class="form-control" name="departamento" id="departamento">'
        form_group_linguagem.innerHTML = '';

        return
    }

    if (desenvolvedor_radio.checked) {
        cargo.value = "Desenvolvedor";
        cargo.disabled = true;

        form_group_departamento.innerHTML = '';
        form_group_linguagem.innerHTML = '<label for="linguagem">Linguagem:</label><input type="text" class="form-control" name="linguagem" id="linguagem">'

        return
    }

    //Se o radio button selecionado for 'outro' ou nenhum
    cargo.value = "";
    cargo.disabled = false;
    form_group_departamento.innerHTML = '';
    form_group_linguagem.innerHTML = '';
}

function adiciona_cards_funcionarios() {
    const div_cards_funcionarios = document.getElementById('cards_funcionarios');

    div_cards_funcionarios.innerHTML = '';

    for (index in funcionarios) {
        var html = `<div class="col-xl-3 col-md-6 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="${(index + 1) * 50}"><div class="icon-box" id="card${index}"><h4><a href="">${funcionarios[index].nome}</a></h4><p>Idade: ${funcionarios[index].idade}</p><p>Cargo: ${funcionarios[index].cargo}</p>`;

        if (funcionarios[index].cargo == 'Gerente') {
            html += `<p>Departamento: ${funcionarios[index].departamento}</p>`;

            html += `<button type="button" class="btn-get-started-card scrollto mx-1" onclick="executa_metodo('seApresentar',${index})">Se apresentar</button><button type="button" class="btn-get-started-card scrollto mx-1" onclick="executa_metodo('trabalhar',${index})">Trabalhar</button>`;

            html += `<button type="button" class="btn-get-started-card scrollto mx-1" onclick="executa_metodo('gerenciar',${index})">Gerenciar</button></div></div>`;

        } else if (funcionarios[index].cargo == 'Desenvolvedor') {
            html += `<p>Linguagem: ${funcionarios[index].linguagem}</p>`;

            html += `<button type="button" class="btn-get-started-card scrollto mx-1" onclick="executa_metodo('seApresentar',${index})">Se apresentar</button><button type="button" class="btn-get-started-card scrollto mx-1" onclick="executa_metodo('trabalhar',${index})">Trabalhar</button>`;

            html += `<button type="button" class="btn-get-started-card scrollto mx-1" onclick="executa_metodo('programar',${index})">Programar</button></div></div>`;

        } else {
            html += `<button type="button" class="btn-get-started-card scrollto mx-1" onclick="executa_metodo('seApresentar',${index})">Se apresentar</button><button type="button" class="btn-get-started-card scrollto mx-1" onclick="executa_metodo('trabalhar',${index})">Trabalhar</button></div></div>`;
        }

        div_cards_funcionarios.innerHTML += html;
    }
}

function executa_metodo(metodo, index) {
    const card_funcionario = document.getElementById(`card${index}`);
    const msg = funcionarios[index][metodo]();

    card_funcionario.innerHTML += `<p class="p-2 bg-secondary text-white m-2 text-center">${msg}</p>`
}