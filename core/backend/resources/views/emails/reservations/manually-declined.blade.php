@component('mail::message')
# Reservation Declined

Dear {{ $client->name }},

We regret to inform you that your reservation request for {{ $listing->title }} has been declined by the tool owner.

**Reservation Details:**
- Tool: {{ $listing->title }}
- Start Date: {{ \Carbon\Carbon::parse($reservation->start_date)->format('M d, Y') }}
- End Date: {{ \Carbon\Carbon::parse($reservation->end_date)->format('M d, Y') }}

We apologize for any inconvenience this may have caused. You can try to make a new reservation for a different tool or different dates.

@component('mail::button', ['url' => config('app.frontend_url') . '/search'])
Find Other Tools
@endcomponent

Thank you for your understanding.

Best regards,<br>
{{ config('app.name') }}
@endcomponent 