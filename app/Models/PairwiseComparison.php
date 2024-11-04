<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PairwiseComparison extends Model
{
    public  function criteria1()
    {
        return $this->belongsTo(Criteria::class, 'criteria1_id', 'id');
    }

    public  function criteria2()
    {
        return $this->belongsTo(Criteria::class, 'criteria2_id', 'id');
    }

    public  function criteria3()
    {
        return $this->belongsTo(Criteria::class, 'criteria3_id', 'id');
    }
}
