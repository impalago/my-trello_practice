<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Card extends Model
{

    /**
     * The card that belong to the card list.
     */
    public function cards()
    {
        return $this->belongsTo('App\CardList');
    }
}
