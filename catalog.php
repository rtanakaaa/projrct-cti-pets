<?php
// Incluir o arquivo de configuração
require_once 'config.php';

// Incluir o arquivo de header
require_once 'header.php';

// Mostrar o conteúdo da página de catálogo
?>
<div class="container">
    <h1>Catálogo de produtos</h1>
    <ul>
        <?php
    // Conectar ao banco de dados
    $conn = mysqli_connect($dbHost, $dbUser, $dbPass, $dbName);

    // Selecionar os produtos
    $query = "SELECT * FROM produtos";
    $result = mysqli_query($conn, $query);

    // Mostrar os produtos
    while ($row = mysqli_fetch_assoc($result)) {
      ?>
        <li>
            <h2><?php echo $row['nome']; ?></h2>
            <p><?php echo $row['descricao']; ?></p>
            <p>Preço: <?php echo $row['preco']; ?></p>
            <p>Quantidade: <?php echo $row['quantidade']; ?></p>
            <button>Adicionar ao carrinho</button>
        </li>
        <?php
    }

    // Fechar a conexão com o banco de dados
    mysqli_close($conn);
    ?>
    </ul>
</div>

<?php
// Incluir o arquivo de footer
require_once 'footer.php';
?>