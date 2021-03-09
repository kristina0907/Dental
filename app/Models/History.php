<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class History extends Model
{
    use HasFactory;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */

    public function reviewOrders()
    {
        return $this->belongsToMany(ReviewOrder::class,'histories_review_orders','history_id','review_order_id');
    }

    //TODO написать связь с ордерами лечения, когда дойдем до них, сейчас нет модели к которой вязать

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }
}
