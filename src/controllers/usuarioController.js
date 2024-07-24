var usuarioModel = require("../models/usuarioModel");
// var aquarioModel = require("../models/aquarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {    

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        
                                if (resultadoAutenticar.length > 0) {
                                    res.json({
                                        idUsuario: resultadoAutenticar[0].idUsuario,
                                        email: resultadoAutenticar[0].email,
                                        nome: resultadoAutenticar[0].nome,
                                        senha: resultadoAutenticar[0].senha           
                                    });
                                } else {
                                    res.status(204).json({ aquarios: [] });
                                }
                           
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function Salvar(req, res) {
    var certas = req.body.respostasCorretasServer;
    var erradas = req.body.respostasIncorretasServer;
    var pontos = req.body.PontuacaoServer;
    var idUsuario = req.body.idUsuarioServer;

    usuarioModel.Salvar(certas, erradas, pontos, idUsuario)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao Salvar o Quiz! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function Rank(req, res) {

    usuarioModel.Rank()
    // Aqui, a função `Rank` chama a outra função `Rank` que esta em `usuarioModel` para obter dados do ranking dos usuários. - 19/07
        .then(
            function (resultado) { 
                if (resultado.length > 0) {
                    res.json(resultado);
                    // Se a consulta SQL retornar dados, a função responde com esses dados em formato JSON. - 19/07
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");

                    //Caso não houver dados, a função responde com um status 204 e uma mensagem indicando que nenhum resultado foi encontrado. - 19/07
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao buscar o rank! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
                /*E caso houver um erro durante a execução da consulta SQL, a função loga o erro no console e responde
                 com um status 500 e a mensagem de erro SQL. - 19/07 */
            }
        );
}



module.exports = {
    autenticar,
    cadastrar,
    Salvar,
    Rank
};
