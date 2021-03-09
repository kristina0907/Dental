<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CallHistory extends Model
{
    use HasFactory;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */

    public function records()
    {
        return $this->hasMany(CallHistoryRecord::class,'call_history_id');
    }

    /**
     * @param $date
     * @return string
     */

    public function getCreatedAtAttribute($date)
    {
        return Carbon::createFromDate($date)->format('d.m.Y');
    }

    /**
     * @param $date
     * @return string
     */

    public function getStartTimeAttribute($date)
    {
        return Carbon::createFromDate($date)->format('d.m.Y');
    }
}
