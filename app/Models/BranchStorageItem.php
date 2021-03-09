<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BranchStorageItem extends Model
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
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function materials()
    {
        return $this->belongsTo(Material::class,'material_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function invoices()
    {
        return $this->belongsTo(BranchStorageInvoice::class,'material_invoice_id');
    }
}
