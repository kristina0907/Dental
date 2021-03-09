<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tooth extends Model
{
    use HasFactory;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function cards()
    {
        return $this->belongsTo('App\Models\ToothCard','tooth_card_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */

    public function diagnosys()
    {
        return $this->hasOne('App\Models\ToothDiagnos');
    }

}
