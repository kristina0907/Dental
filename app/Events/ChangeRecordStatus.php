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

class ChangeRecordStatus implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

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
        return new PrivateChannel('live-shedule-channel');
    }

    /**
     * @return string
     */

    public function broadcastAs()
    {
        return 'liveSheduleUpdate';
    }

    /**
     * @return array
     */

    public function broadcastWith()
    {
        return [
            'event'=>'liveSheduleUpdate',
            'smena'=>$this->sheduleUpdated
        ];
    }
}
