<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ToothDiagnos extends Model
{
    use HasFactory;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function tooths()
    {
        return $this->belongsTo('App\Models\Tooth','tooth_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */

    public function reviews()
    {
        return $this->belongsToMany('App\Models\ToothDiagnosReview','tooth_diagnos_reviews_tooth_diagnos','tooth_diagnos_id','tooth_review_id');
    }

}
