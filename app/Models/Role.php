<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    public $timestamps = false;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */

    public function users()
    {
        return $this->belongsToMany('App\Models\User','role_users','role_id','user_id');
    }


    public function permissions()
    {
        return $this->belongsToMany('App\Models\Permission','permissions_roles','role_id','permission_id');
    }
}
