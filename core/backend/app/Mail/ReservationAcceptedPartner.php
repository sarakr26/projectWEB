<?php

namespace App\Mail;

use App\Models\Reservation;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ReservationAcceptedPartner extends Mailable
{
    use Queueable, SerializesModels;

    public $reservation;
    public $clientDetails;

    public function __construct(Reservation $reservation)
    {
        $this->reservation = $reservation;
        $client = $reservation->client;
        
        $this->clientDetails = [
            'name' => $client->name,
            'email' => $client->email,
            'phone' => $client->phone_number,
            'address' => $client->address,
            'city' => $client->city ? $client->city->name : 'Non spécifiée'
        ];
    }

    public function build()
    {
        return $this->subject('Nouvelle Réservation - Informations Client')
                    ->view('emails.reservation-accepted-partner');
    }
} 