<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CabinetStorageInvoice extends Model
{
    use HasFactory;

    public function branchStorages()
    {
        return $this->belongsTo(BranchStorage::class,'branch_storage_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function storages()
    {
        return $this->belongsTo(CabinetStorage::class,'cabinet_storage_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function providers()
    {
        return $this->belongsTo(MaterialProvider::class,'provider_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */

    public function items()
    {
        return $this->hasMany(CabinetStorageItem::class,'material_invoice_id');
    }

    public function kladovshik()
    {
        return $this->belongsTo(User::class,'user_id');
    }
}
