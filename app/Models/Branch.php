<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{
    use HasFactory;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */

    public function shedules()
    {
        return $this->hasMany(Shedule::class,'branch_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */

    public function cabinets()
    {
        return $this->hasMany(Cabinet::class,'branch_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */

    public function smenas()
    {
        return $this->hasMany(Smena::class,'branch_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */

    public function employers()
    {
        return $this->hasMany(EmployerInfo::class,'branch_id');
    }
}
