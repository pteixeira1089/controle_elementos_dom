class Funcionario {
    constructor(nome, idade, cargo) {
        this.nome = nome;
        this.idade = idade;
        this.cargo = cargo;
    }

    seApresentar() {
        return `Olá, me chamo ${this.nome}, tenho ${this.idade} anos e ocupo o cargo de ${this.cargo}. Muito prazer!`;
    }

    registrarEntrada() {
        //Obtém hora e data atuais
        const now = new Date();

        //Obtém dados de data
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        let day = now.getDate();

        //Obtém dados de tempo
        let hours = now.getHours();
        let minutes = now.getMinutes();

        //Formatando dados com zeros, se necessário
        month = (month < 10 ? "0" : '') + month;
        day = (day < 10 ? "0" : "") + day;
        hours = (hours < 10 ? "0" : "") + hours;
        minutes = (minutes < 10 ? "0" : "") + minutes;

        //variáveis formatadas
        let formated_date = `${day}/${month}/${year}`;
        let formated_time = `${hours}:${minutes}`;

        return [formated_date, formated_time];

    }

    trabalhar() {
        return `Iniciando minha jornada de trabalho do dia ${this.registrarEntrada()[0]}. Meu horário de entrada é ${this.registrarEntrada()[1]}.`;
    }
}

class Gerente extends Funcionario {
    constructor(nome, idade, departamento) {
        super(nome, idade, "Gerente");
        this.departamento = departamento;
    }

    gerenciar() {
        return `Iniciando a gestão do departamento ${this.departamento} às ${this.registrarEntrada()[1]} do dia ${this.registrarEntrada()[0]}.`;
    }
}

class Desenvolvedor extends Funcionario{
    constructor(nome, idade, linguagem){
        super(nome, idade, "Desenvolvedor");
        this.linguagem = linguagem;
    }

    programar(){
        return `Iniciando o trabalho de desenvolvimento de softwares do dia ${this.registrarEntrada()[0]}, às ${this.registrarEntrada()[1]}, com uso da linguagem de programação ${this.linguagem}.`;
    }
}