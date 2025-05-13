<!DOCTYPE html>
<html>
<head>
    <title>Reservation Accepted</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #4CAF50;
            color: white;
            padding: 20px;
            text-align: center;
        }
        .content {
            padding: 20px;
            background-color: #f9f9f9;
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #666;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Reservation Accepted!</h1>
        </div>
        <div class="content">
            <p>Dear {{ $reservation->client->username }},</p>
            
            <p>Your reservation request for {{ $reservation->listing->title }} has been accepted!</p>
            
            <h3>Reservation Details:</h3>
            <ul>
                <li>Start Date: {{ $reservation->start_date->format('F j, Y') }}</li>
                <li>End Date: {{ $reservation->end_date->format('F j, Y') }}</li>
                <li>Total Amount: ${{ number_format($totalAmount, 2) }}</li>
            </ul>

            <p><strong>Important:</strong> To complete your reservation, please make the payment within 24 hours (by {{ $paymentDeadline->format('F j, Y H:i:s') }}). If payment is not received within this timeframe, your reservation will be automatically cancelled.</p>

            <p>If you have any questions or need assistance, please don't hesitate to contact us.</p>
        </div>
        <div class="footer">
            <p>This is an automated message, please do not reply directly to this email.</p>
        </div>
    </div>
</body>
</html> 