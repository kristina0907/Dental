<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon;

class ReviewOrder extends Model
{
    use HasFactory;

    /*
    public function reviews()
    {
        return $this->hasMany('App\Models\ToothDiagnosReview','order_id');
    }
    */

    /**
     * @param $date
     * @return string
     */

    public function getUpdatedAtAttribute($date)
    {
        return Carbon\Carbon::createFromDate($date)->format('d.m.Y');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function doctor()
    {
        return $this->belongsTo(User::class, 'doctor_id');
    }


    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function patient()
    {
        return $this->belongsTo(User::class,'user_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function product()
    {
        return $this->belongsTo(Product::class,'product_id');
    }


    /**
     * @param $date
     * @return string
     */

    public function getCreatedAtAttribute($date)
    {
        return Carbon\Carbon::createFromDate($date)->format('d.m.Y');
    }


}
