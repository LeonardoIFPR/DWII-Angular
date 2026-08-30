<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit(); }

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['erro' => 'Use POST.']);
    exit;
}

$dados = json_decode(file_get_contents('php://input'), true);

$nome = trim($dados['nome'] ?? '');
$email = trim($dados['email'] ?? '');
$mensagem = trim($dados['mensagem'] ?? '');

$erros = [];
if ($nome === "") $erros[] = "nome é obrigatório.";
if ($email === "") $erros[] = "email é obrigatório.";
elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) $erros[] = "o email é inválido.";
if (strlen($mensagem) < 10) $erros[] = "Mensagem deve ter pelo menos 10 caracteres.";

if (!empty($erros)) {
    http_response_code(400);
    echo json_encode(['error' => $erros]);
    exit;
}

require __DIR__ . "/../conexao.php";
$sql = "INSERT INTO contatos (nome, email, mensagem) VALUES (:nome, :email, :mensagem)";
$stmt = $pdo->prepare($sql);
$stmt->execute([':nome' => $nome, ':email' => $email, ':mensagem' => $mensagem]);

http_response_code(201);
echo json_encode([
    "sucesso" => true,
    "id" => (int) $pdo->lastInsertId(),
    "mensagem" => "Contato recebido com sucesso."
]);