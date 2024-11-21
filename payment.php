<?php
// Incluir o arquivo de configuração
require_once 'config.php';

// Incluir o arquivo de header
require_once 'header.php';

// Mostrar o conteúdo da página de pagamento
?>
<div class="container">
    <h1>Pagamento</h1>
    <form>
        <label>Método de pagamento:</label>
        <select name="metodo_pagamento">
            <option value="cartao">Cartão de crédito</option>
            <option value="boleto">Boleto bancário</option>
        </select>
        <br>
        <label>Número do cartão:</label>
        <input type="text" name="numero_cartao">
        <br>
        <label>Validade do cartão:</label>
        <input type="text" name="validade_cartao">
        <br>
        <label>Código de segurança:</label>
        <input type="text" name="codigo_seguranca">
        <br>
        <input type="submit" value="Pagar">
    </form>
</div>

<?php
// Incluir o arquivo de footer
require_once 'footer.php';
?>