<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Payment Confirmation</title>
</head>
<body>
    <h2>Payment Confirmation</h2>
    <p>Dear {{ $reservation->client->username ?? $reservation->client->email }},</p>
    <p>We have received your payment for your reservation (ID: {{ $reservation->id }}) for the listing <strong>{{ $reservation->listing->title }}</strong>.</p>
    <p><strong>Amount Paid:</strong> ${{ number_format($payment->amount, 2) }}</p>
    <p>Your reservation is now <strong>completed</strong>. Thank you for your trust!</p>
    <p>If you have any questions, feel free to contact us.</p>
    <br>
    <p>Best regards,<br>The Team</p>
</body>
</html> 