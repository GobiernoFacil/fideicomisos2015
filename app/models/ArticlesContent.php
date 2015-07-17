<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ArticlesContent extends Model
{
  protected $fillable = ['article_id', 'type','content','order'];

  public function article(){
    return $this->belongsTo('App\Models\Article');
  }
}
