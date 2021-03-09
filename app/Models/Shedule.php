<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shedule extends Model
{
    use HasFactory;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function doctors()
    {
        return $this->belongsTo('App\Models\User','doctor_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function patients()
    {
        return $this->belongsTo('App\Models\User','patient_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function branch()
    {
        return $this->belongsTo(Branch::class,'branch_id');
    }

    /**
     * @param $date
     * @return string
     */

    public function getDateAttribute($date)
    {
        return Carbon::createFromDate($date)->format('d.m.Y');
    }

}
