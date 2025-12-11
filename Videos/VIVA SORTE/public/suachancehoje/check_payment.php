<?php
// Recebe o ID do pedido do cliente
if (isset($_POST['id_pedido'])) {
    $id_pedido = $_POST['id_pedido'];
    
    // Substitua com seu token de API
    $api_token = 'IOgxbNddtWiOSlYthMr3rvXSBVqEbT9D7CKMWl0Vjib54emIcYF3bt2kWdBi';
    
    // URL da API da CinqPay
    $url = "https://api.cinqpay.com.br/api/public/v1/transactions/{$id_pedido}?api_token={$api_token}";

    // Inicializar cURL para fazer a requisição
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    // Executar a requisição
    $response = curl_exec($ch);
    
    // Verificar se houve algum erro na requisição
    if(curl_errno($ch)) {
        echo json_encode(["error" => curl_error($ch)]);
        exit();
    }

    // Fechar cURL
    curl_close($ch);
    
    // Converter a resposta JSON da API em um array
    $data = json_decode($response, true);

    // Verificar o status do pagamento e retornar a resposta
    if (isset($data['payment_status'])) {
        echo json_encode(['payment_status' => $data['payment_status']]);
    } else {
        echo json_encode(['error' => 'Erro ao obter status de pagamento']);
    }
}
?>
