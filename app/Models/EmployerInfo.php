<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployerInfo extends Model
{
    use HasFactory;


    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */

    public function subdivisions()
    {
        return $this->belongsToMany(Subdivision::class,'employer_infos_subdivisions','employer_info_id','subdivision_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */

    public function professions()
    {
        return $this->belongsToMany(Profession::class,'employer_infos_professions','employer_info_id','profession_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function branch()
    {
        return $this->belongsTo(Branch::class,'branch_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }

}
