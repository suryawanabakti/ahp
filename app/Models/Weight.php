<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Weight extends Model
{
    protected $fillable = ['criteria_id', 'weight'];
    public $with = ['criteria'];
    public function criteria(): BelongsTo
    {
        return $this->belongsTo(Criteria::class);
    }
}
