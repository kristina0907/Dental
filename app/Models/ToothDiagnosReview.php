<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ToothDiagnosReview extends Model
{
    use HasFactory;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */

    public function diagnoses()
    {
        return $this->belongsToMany('App\Models\ToothDiagnos','tooth_diagnos_reviews_tooth_diagnos','tooth_review_id','tooth_diagnos_id');
    }

}
