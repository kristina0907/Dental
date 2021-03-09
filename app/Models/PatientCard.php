<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PatientCard extends Model
{
    use HasFactory;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */

    public function users()
    {
        return $this->belongsToMany('App\Models\User','patient_cards_users','patient_card_id','user_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */

    public function toothcards()
    {
        return $this->hasOne('App\Models\ToothCard','patients_card_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */

    public function images()
    {
        return $this->hasMany(Image::class);
    }

    /**
     * @param $date
     * @return string
     */

    public function getBornDateAttribute($date)
    {
        return Carbon::createFromDate($date)->format('d.m.Y');
    }

    /***
     * @param $date
     * @return string
     */

    public function getCreatedAtAttribute($date)
    {
        return Carbon::createFromDate($date)->format('d.m.Y');
    }


}
