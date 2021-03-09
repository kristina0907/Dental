<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    protected $table = 'images';


    protected $fillable = ['uri', 'public', 'name', 'date','patient_card_id'];

    public function cards()
    {
        return $this->belongsTo(PatientCard::class,'patient_card_id');
    }

}
