<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cookie extends Model
{
    protected $fillable = [
        'message',
        'timestamp',
        'creator',
    ];

    /**
     * Get the user who created the cookie.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'creator');
    }
}
