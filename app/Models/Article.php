<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $fillable = ['title', 'subtitle','author','author_name', 'image', 'lead'];

    public function content(){
      return $this->hasMany('App\Models\ArticlesContent');
    }
}
