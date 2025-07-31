<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cookie extends Model
{
    protected $fillable = [
        'message',
        'creator',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'creator');
    }

    public function hasCreator(): bool
    {
        return !is_null($this->creator);
    }

    public function getCreatorNameAttribute(): string
    {
        return $this->user ? $this->user->name : 'Anonymous';
    }
}