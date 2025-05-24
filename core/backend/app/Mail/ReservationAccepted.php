<?php

namespace App\Mail;

use App\Models\Reservation;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ReservationAccepted extends Mailable
{
    use Queueable, SerializesModels;

    public $reservation;
    public $totalAmount;
    public $paymentDeadline;

    public function __construct(Reservation $reservation, float $totalAmount)
    {
        $this->reservation = $reservation;
        $this->totalAmount = $totalAmount;
        $this->paymentDeadline = now()->addHours(24);
    }

    public function build()
    {
        return $this->subject('Your Reservation Has Been Accepted')
                    ->view('emails.reservation-accepted');
    }
} 