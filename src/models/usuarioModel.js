var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT idUsuario, nome, email FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function Salvar(certas, erradas, pontos, idUsuario) { // Adicionando a função Pontos para que sejam armazenadas também no banco
    // de Dados quando a Função Salvar for Executada no Site - 01/07
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function Salvar():", certas, erradas, idUsuario);

    var instrucaoSql =`
        INSERT INTO Quiz (Certas, Erradas, PontosUsuario, fkUsuario) VALUES ('${certas}', '${erradas}', '${pontos}',  '${idUsuario}'); 
        `; //Adicionando a Variável 'Pontos', para que agora eles também sejam inseridos dentro do Banco de Dados
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function Rank() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function Rank()");
    
    var instrucaoSql = 
    
    // Essa é a instrução SQL que estou usando para obter o ranking dos usuários - 19/07
    `
    SELECT 
        usuario.nome, 
        MAX(Quiz.PontosUsuario) AS MaxPontos, 
        MIN(Quiz.PontosUsuario) AS MinPontos
    FROM usuario
    JOIN Quiz ON usuario.idUsuario = Quiz.fkUsuario
    GROUP BY usuario.nome
    ORDER BY MaxPontos DESC
    LIMIT 5;

    `
    /* Decidi usar o LIMIT 5, para que apareça apenas o 5 melhores jogadores do Quiz dentro do Gráfico, 
     e tambem para que não ficasse tão cheio o Rank. - 19/07 */
    ;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    autenticar,
    cadastrar,
    Salvar,
    Rank
};