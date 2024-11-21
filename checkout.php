<?php
// Incluir o arquivo de configuração
require_once 'config.php';

// Incluir o arquivo de header
require_once 'header.php';

// Mostrar o conteúdo da página de checkout
?>
<div class="container">
    <h1>Checkout</h1>
    <form>
        <label>Nome:</label>
        <input type="text" name="nome">
        <br>
        <label>Sobrenome:</label>
        <input type="text" name="sobrenome">
        <br>
        <label>Endereço:</label>
        <input type="text" name="endereco">
        <br>
        <label>Cidade:</label>
        <input type="text" name="cidade">
        <br>
        <label>Estado:</label>
        <input type="text" name="estado">
        <br>
        <label>CEP:</label>
        <input type="text" name="cep">
        <br>
        <label>Telefone:</label>
        <input type="text" name="telefone">
        <br>
        <label>E-mail:</label>
        <input type="email" name="email">
        <br>
        <input type="submit" value="Finalizar compra">
    </form>
</div>

<?php
// Incluir o arquivo de footer
require_once 'footer.php';
?>