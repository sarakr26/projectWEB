<!DOCTYPE html>
<html>
<head>
    <title>Détails de la Réservation</title>
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
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        .details {
            background-color: #fff;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        .client-info {
            margin-top: 20px;
            padding: 15px;
            background-color: #f8f9fa;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Nouvelle Réservation Acceptée</h2>
            <p>Une nouvelle réservation a été acceptée. Voici les détails du client :</p>
        </div>

        <div class="details">
            <h3>Informations de la Réservation</h3>
            <p><strong>Annonce:</strong> {{ $reservation->listing->title }}</p>
            <p><strong>Date de début:</strong> {{ \Carbon\Carbon::parse($reservation->start_date)->format('d/m/Y') }}</p>
            <p><strong>Date de fin:</strong> {{ \Carbon\Carbon::parse($reservation->end_date)->format('d/m/Y') }}</p>
            <p><strong>Option de livraison:</strong> {{ $reservation->delivery_option ? 'Oui' : 'Non' }}</p>
        </div>

        <div class="client-info">
            <h3>Informations du Client</h3>
            <p><strong>Nom complet:</strong> {{ $clientDetails['name'] }}</p>
            <p><strong>Email:</strong> {{ $clientDetails['email'] }}</p>
            <p><strong>Téléphone:</strong> {{ $clientDetails['phone'] ?? 'Non spécifié' }}</p>
            <p><strong>Adresse:</strong> {{ $clientDetails['address'] ?? 'Non spécifiée' }}</p>
            <p><strong>Ville:</strong> {{ $clientDetails['city'] }}</p>
        </div>

        <div style="margin-top: 20px; font-size: 0.9em; color: #666;">
            <p>Ceci est un message automatique. Merci de ne pas répondre à cet email.</p>
        </div>
    </div>
</body>
</html> 