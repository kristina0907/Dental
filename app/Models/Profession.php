<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profession extends Model
{
    use HasFactory;

    public function employers()
    {
        return $this->belongsToMany(EmployerInfo::class,'employer_infos_professions','profession_id','employer_info_id');
    }
}
