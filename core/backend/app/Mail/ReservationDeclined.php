<?php

namespace App\Mail;

use App\Models\Reservation;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ReservationDeclined extends Mailable
{
    use Queueable, SerializesModels;

    public $reservation;
    public $isAutomatic;

    /**
     * Create a new message instance.
     */
    public function __construct(Reservation $reservation, bool $isAutomatic = false)
    {
        $this->reservation = $reservation;
        $this->isAutomatic = $isAutomatic;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        $template = $this->isAutomatic 
            ? 'emails.reservations.declined'
            : 'emails.reservations.manually-declined';

        return $this->markdown($template)
                    ->subject('Reservation Declined - Tool Rental')
                    ->with([
                        'reservation' => $this->reservation,
                        'listing' => $this->reservation->listing,
                        'client' => $this->reservation->client
                    ]);
    }
} 