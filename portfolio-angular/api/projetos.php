<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

require __DIR__ . "/../conexao.php";

try {
    if (isset($_GET['id'])) {
        $id = $_GET['id'];
        
        $stmt = $pdo->prepare("SELECT id, nome, descricao, tecnologias, link_github, ano FROM projetos WHERE id = ? AND status = 'publicado'");
        $stmt->execute([$id]);  // essa linha serve para mandar o id pro banco e rodar a consulta
        $projeto = $stmt->fetch();  // essa linha que busca os dados e diz se o projeto existe. se não achar nada, o $projeto vira false para entrar no if abaixo
        
        if (!$projeto) {
            http_response_code(404);
            echo json_encode(["erro" => "nao encontrado"]);  
            exit;
        }  //se o id do projeto existir não entra aqui se não existir entra aqui e mostra a mensagem de erro 404 não encontrado
        
        echo json_encode($projeto);
    } else {
        $projetos = $pdo->query("SELECT id, nome, descricao, tecnologias, link_github, ano FROM projetos WHERE status = 'publicado'")->fetchAll();//este ->fetchAll(); nos entrega os dados em um formaato mais legivl e usavel
        echo json_encode($projetos);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["erro" => "erro no banco"]);
}  //caso o banco de dados esteja com problema ou não exista retorna o erro 500 de erro no banco
?>