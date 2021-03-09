<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployerDocument extends Model
{
    use HasFactory;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }

    /**
     * @param $date
     * @return string
     */

    public function getDateIssueAttribute($date)
    {
        return Carbon::createFromDate($date)->format('d.m.Y');
    }
}
