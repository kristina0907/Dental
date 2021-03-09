<?php

namespace App\Events;

use App\Models\LiveFeed;
use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

class LiveFeedUpdate implements ShouldBroadcastNow
{
    use InteractsWithSockets, SerializesModels;

    protected $usersCancelled;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($feed)
    {
        $this->usersCancelled = $feed;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('live-feed-channel');
    }

    /**
     * The event's broadcast name.
     *
     * @return string
     */
    public function broadcastAs()
    {
        return 'liveFeedUpdate';
    }
    /**
     * The event's broadcast name.
     *
     * @return string[]
     */
    public function broadcastWith()
    {
        return [
            'event'=>'liveFeedUpdate',
            'usersCancelled'=>$this->usersCancelled
            ];
    }
}
