<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");
//segurança so aceita requisições vindas destas fontes

//é o que faz a liberação dos dados como usamos header para a segurança é necessario ter esse if para validação foi o que entendi
if($_SERVER["REQUEST_METHOD"] === "OPTIONS"){
    http_response_code(200);
    exit();
};

$json = file_get_contents("php://input"); //captura os dados enviados pelo formulario em formato de JSON
$dados = json_decode($json); //guarda os dados do json

//verifica se a pessoa realmente enviou dados e não mandou o formulario vazio e exibe uma mensagem caso esteja vazio
if (!isset($dados->usuario) || !isset($dados->senha)) {
    http_response_code(400);
    echo json_encode(["erro" => "Dados ausentes"]);//msg caso a pessoa não preencha todos os campos sem dar a resposta onde esta o erro por motivos de segurança
    exit();
}

$usuariocorreto = "Admin";
$senhacorreta = "24446666688888888";

//pega os dados enviados pelo formulario e valida com o nossos dados de login (hardcoded no momento) 
if ($data->usuario === $usuarioCorreto && $data->senha === $senhaCorreta) {
    http_response_code(200);// caso usuario e senha estejam corretos exibe a msg aprovado
    echo json_encode(["status" => "aprovado"]);
} else {
    http_response_code(401); //caso usuario e senha errados da a msg credenciais invalidas não mostrando onde errou por motivos de segurança
    echo json_encode(["erro" => "Credenciais invalidas"]);
}

?>