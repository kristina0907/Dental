<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    use HasFactory;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function categories()
    {
        return $this->belongsTo(MaterialCategory::class,'material_category_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function units()
    {
        return $this->belongsTo(MaterialUnit::class,'unit');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */

    public function storageItems()
    {
        return $this->hasMany(BranchStorageItem::class,'material_id');
    }

    /**
     * @param $val
     * @return int
     */

    public function getExpensiveAttribute($val)
    {
       if($val)
       {
           return (int)1;
       }
       else
       {
           return (int)0;
       }
    }
}
