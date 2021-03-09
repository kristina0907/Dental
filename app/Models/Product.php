<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function priceCategories()
    {
        return $this->belongsTo('\App\Models\PriceCategory','price_category_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function unitCategories()
    {
        return $this->belongsTo('\App\Models\UnitCategory','units_category_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function pricelists()
    {
        return $this->belongsTo('\App\Models\PriceList','price_list_id');
    }
}
