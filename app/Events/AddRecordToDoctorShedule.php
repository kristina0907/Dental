<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class AddRecordToDoctorShedule implements ShouldBroadcastNow
{
    use  InteractsWithSockets, SerializesModels;

    protected $sheduleUpdated ;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($shedules)
    {
        $this->sheduleUpdated = $shedules;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('doctor-shedule-channel');
    }

    /**
     * @return string
     */

    public function broadcastAs()
    {
        return 'DoctorSheduleUpdate';
    }

    /**
     * @return array
     */

    public function broadcastWith()
    {
        return [
            'event'=>'DoctorSheduleUpdate',
            'smena'=>$this->sheduleUpdated
        ];
    }
}
