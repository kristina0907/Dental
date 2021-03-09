<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BranchStorageInvoice extends Model
{
    use HasFactory;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function storages()
    {
        return $this->belongsTo(BranchStorage::class,'branch_storage_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */

    public function items()
    {
        return $this->HasMany(BranchStorageItem::class,'material_invoice_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function providers()
    {
        return $this->belongsTo(MaterialProvider::class,'provider_id');
    }

    public function kladovshik()
    {
        return $this->belongsTo(User::class,'user_id');
    }
}
