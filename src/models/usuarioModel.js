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
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function Salvar():", certas, erradas, pontos, idUsuario);

    var instrucaoSql =`
        INSERT INTO Quiz (Certas, Erradas, PontosUsuario) VALUES ('${certas}', '${erradas}', '${pontos}');
    `; //Adicionando a Variável 'Pontos', para que agora eles também sejam inseridos dentro do Banco de Dados

    /*Fiz algumas mudanças na tabela Quiz, onde precisei tirar algumas colunas dela, e agora ela não é mais utilizada
    no script de exibição do Rank dos jogadores- 01/08*/

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    
    return database.executar(instrucaoSql)
        /* O ID do Quiz, não era gerado antes de salvar a pontuação assim como o ID do Usuário e a sua pontuação,
        por isso dividi a função "Salvar" em duas etapas na instrução SQL - 29/07*/

        .then(resultado => {
        /*Aqui, o .then é usado para lidar com as informações retornada pela execução da primeira instrução SQL. 
        O resultado contém as informações retornadas pelo banco de dados após a execução da instrução SQL, 
        incluindo o ID gerado para o quiz. - 29/07 */

        
        var idQuiz = resultado.insertId;
        /* Aqui, o "resultado" é o objeto que armazena tudo que foi retornado pelo banco de dados após a execução 
        da instrução SQL de inserção. Esse objeto inclui várias propriedades, e o insertId é uma dessas propriedades, 
        que contém o valor do ID auto-incrementado gerado pela inserção que é a unica coisa que interessa para fazer essa
        função funcionar justamente por ser o valor do ID do Quiz. - 29/07 */

        /*Assim, agora a Variavél "idQuiz" armazena literalmente o valor do ID do Quiz, então agora só precisa executar
        a segunda parte dessa InstruçãoSQL, para que assim agora a 3º tabela receba valores também - 29/07 */ 

        var instrucaoSql2 = `
            INSERT INTO AcertosErrosUsuario (Acertos, Erros, PontosUsuario, fkQuiz, fkUsuario) VALUES ('${certas}', '${erradas}', '${pontos}', '${idQuiz}', '${idUsuario}');
        `;

        /* Aqui na tabela AcertosErrosUsuario, precisei adicionar novas colunas dentro dela, e agora ela que está sendo usada para
        exibir o Rank dos jogadores - 01/08 */
        
        console.log("Executando a instrução SQL: \n" + instrucaoSql2);
        return database.executar(instrucaoSql2);
    });
}

function Rank() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function Rank()");
    
    var instrucaoSql = 
    
    // Essa é a instrução SQL que estou usando para obter o ranking dos usuários - 19/07
    `
    select 
		usuario.nome, 
        MAX(AcertosErrosUsuario.PontosUsuario) as MaxPontos, 
        MIN(AcertosErrosUsuario.PontosUsuario) as MinPontos
	from usuario
	join AcertosErrosUsuario on usuario.idUsuario = AcertosErrosUsuario.fkUsuario
	group by usuario.nome
	order by MaxPontos desc
	limit 5;

    `
    /* Decidi usar o LIMIT 5, para que apareça apenas o 5 melhores jogadores do Quiz dentro do Gráfico, 
     e tambem para que não ficasse tão cheio o Rank. - 19/07 */

     /*Precisei fazer varias mudanças nas Tabelas, e por causa disso precisei mudar também o script que exibe o Rank, 
     onde agora não é mais utilizada a tabela Quiz, e sim a tabela AcertosErrosUsuario - 01/08*/
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