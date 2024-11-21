<?php
// Incluir o arquivo de configuração
require_once 'config.php';

// Incluir o arquivo de header
require_once 'header.php';

// Mostrar o conteúdo da página de carrinho
?>
<div class="container">
    <h1>Carrinho de compras</h1>
    <table>
        <thead>
            <tr>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Preço</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            <?php
      // Conectar ao banco de dados
      $conn = mysqli_connect($dbHost, $dbUser, $dbPass, $dbName);

      // Selecionar os produtos no carrinho
      $query = "SELECT * FROM carrinho";
      $result = mysqli_query($conn, $query);

      // Mostrar os produtos no carrinho
      while ($row = mysqli_fetch_assoc($result)) {
        ?>
            <tr>
                <td><?php echo $row['nome']; ?></td>
                <td><?php echo $row['quantidade']; ?></td>
                <td><?php echo $row['preco']; ?></td>
                <td><?php echo $row['total']; ?></td>
            </tr>
            <?php
      }

      // Fechar a conexão com o banco de dados
      mysqli_close($conn);
      ?>
        </tbody>
    </table>
</div>

<?php
// Incluir o arquivo de footer
require_once 'footer.php';
?>