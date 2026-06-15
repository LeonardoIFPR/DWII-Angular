<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

require __DIR__ . "/../conexao.php";

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    
    $stmt = $pdo->prepare("SELECT id, nome, categoria, descricao, ano_criacao FROM tecnologias WHERE id = ? AND status = 'ativo'");
    $stmt->execute([$id]); // essa linha serve para mandar o id pro banco e rodar a consulta
    $tecnologia = $stmt->fetch(); // essa linha que busca os dados e diz se o projeto existe. se não achar nada, o $tecnologia vira false para entrar no if abaixo
    
    if (!$tecnologia) {
        http_response_code(404);
        echo json_encode(["erro" => "nao encontrado"]);
        exit;
    }
    
    echo json_encode($tecnologia);
} else {
    $tecnologias = $pdo->query("SELECT id, nome, categoria, descricao, ano_criacao FROM tecnologias WHERE status = 'ativo' ORDER BY categoria, nome")->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($tecnologias);
}
?>