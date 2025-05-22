<?php

namespace App\Mail;

use App\Models\Reservation;
use App\Models\Payment;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PaymentConfirmed extends Mailable
{
    use Queueable, SerializesModels;

    public $reservation;
    public $payment;

    public function __construct(Reservation $reservation, Payment $payment)
    {
        $this->reservation = $reservation;
        $this->payment = $payment;
    }

    public function build()
    {
        return $this->subject('Your Payment Has Been Received')
                    ->view('emails.payment-confirmed');
    }
} 