<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ToothCard extends Model
{
    use HasFactory;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */

    public function types()
    {
        return $this->hasOne('App\Models\ToothCardType');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function cards()
    {
        return $this->belongsTo('App\Models\PatientCard','patients_card_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */

    public function tooths()
    {
        return $this->hasMany('App\Models\Tooth','tooth_card_id');
    }

}
