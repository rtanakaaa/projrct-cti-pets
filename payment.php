<?php
// Include the configuration file
require_once 'config.php';

// Include the header file
require_once 'header.php';

// Display the payment page content
?>
<div class="container">
    <h1>Payment</h1>
    <form>
        <label>Payment method:</label>
        <select name="payment_method">
            <option value="credit_card">Credit Card</option>
            <option value="bank_slip">Bank Slip</option>
        </select>
        <br>
        <label>Card number:</label>
        <input type="text" name="card_number">
        <br>
        <label>Card expiry date:</label>
        <input type="text" name="card_expiry">
        <br>
        <label>Security code:</label>
        <input type="text" name="security_code">
        <br>
        <input type="submit" value="Pay">
    </form>
</div>

<?php
// Include the footer file
require_once 'footer.php';
?>