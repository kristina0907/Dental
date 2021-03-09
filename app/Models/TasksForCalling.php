<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TasksForCalling extends Model
{
    use HasFactory;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function branch()
    {
        return $this->belongsTo(Branch::class,'branch_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function patient()
    {
        return $this->belongsTo(User::class,'patient_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function administrator()
    {
        return $this->belongsTo(User::class,'administrator_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function status()
    {
        return $this->belongsTo(TasksForCallingStatus::class,'status_id');
    }


    /**
     * @param $date
     * @return string
     */

    public function getUpdatedAtAttribute($date)
    {
        return Carbon::createFromDate($date)->format('d.m.Y');
    }


    /**
     * @param $date
     * @return string
     */

    public function getCreatedAtAttribute($date)
    {
        return Carbon::createFromDate($date)->format('d.m.Y');
    }
}
