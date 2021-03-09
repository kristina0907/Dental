<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BranchStorage extends Model
{
    use HasFactory;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function branches()
    {
        return $this->belongsTo(Branch::class,'branch_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */

    public function items()
    {
        return $this->HasMany(BranchStorageItem::class,'branch_storage_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function invoices()
    {
        return $this->belongsTo(BranchStorageInvoice::class,'material_invoice_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */

    public function cabinetstorages()
    {
        return $this->hasMany(CabinetStorage::class,'branch_storage_id');
    }
}
