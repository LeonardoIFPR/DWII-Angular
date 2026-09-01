<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

set_exception_handler(function ($e) {
    http_response_code(500);
    echo json_encode(["erro" => "falha no servidor: " . $e->getMessage()]);
});

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

require __DIR__ . "/../conexao.php";

$metodo = $_SERVER["REQUEST_METHOD"];
$id = isset($_GET["id"]) ? (int) $_GET["id"] : 0;

if ($metodo === "GET") {
    $sql = "SELECT id, nome, descricao, tecnologias, link_github, ano FROM projetos WHERE status ='publicado' ";
    $projetos = $pdo->query($sql)->fetchAll();
    echo json_encode($projetos);
    exit;
}

if ($metodo === "POST") {
    $dados = json_decode(file_get_contents("php://input"), true);
    if (!$dados || empty($dados["nome"])) {
        http_response_code(400);
        echo json_encode(["erro" => "informa pelo menos um projeto"]);
        exit;
    }
    $sql = "INSERT INTO projetos (nome, descricao, tecnologias, link_github, ano, status) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        $dados["nome"],
        $dados["descricao"] ?? "",
        $dados["tecnologias"] ?? "",
        $dados["link_github"] ?? "",
        $dados["ano"] ?? date("Y"),
        "publicado",
    ]);
    http_response_code(201);
    echo json_encode(["id" => (int) $pdo->lastInsertId()]);
    exit;
}

if ($metodo === "PUT") {
    if ($id <= 0) {
        http_response_code(400);
        echo json_encode(["erro" => "PUT exige o id na URL: ?id-NN"]);
        exit;
    }
    $dados = json_decode(file_get_contents("php://input"), true);
    if (!$dados || empty($dados["nome"])) {
        http_response_code(400);
        echo json_encode(["erro" => "informe pelo menos o nome de um projeto"]);
        exit;
    }
    $sql = "UPDATE projetos SET nome = ?, descricao = ?, tecnologias = ?, link_github = ?, ano = ? WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        $dados["nome"],
        $dados["descricao"] ?? "",
        $dados["tecnologias"] ?? "",
        $dados["link_github"] ?? "",
        $dados["ano"] ?? date("Y"), 
        $id,       
    ]);
    echo json_encode(["mensagem" => "projeto atualizado"]);
    exit;
}

if ($metodo === "DELETE") {
    if ($id <= 0) {
        http_response_code(400);
        echo json_encode(["erro" => "DELETE exige o id na URL: ?id=NN"]);
        exit;
    }

    $sql = "DELETE FROM projetos WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$id]);

    if ($stmt->rowCount() === 0) {
        http_response_code(404);
        echo json_encode(["erro" => "projeto não encontrado"]);
        exit;
    }
    http_response_code(204);
    exit;
}

http_response_code(405);
echo json_encode(["erro" => "metodo não permitido"]);
?>