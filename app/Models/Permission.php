<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    use HasFactory;

    public function users()
    {
        return $this->belongsToMany('App\Models\User','permissions_users','permission_id','user_id');
    }

    public function roles()
    {
        return $this->belongsToMany('App\Models\Permission','permissions_roles','permission_id','role_id');
    }
}
