<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Trusts extends Model {

  protected $guarded = ['branch_id', 'type_id', 'scope_id', 
                       'income_num', 'yield_num','expenses_num',
                       'availability_num', 'initial_amount_num',
                       'initial_date_date', 'all'];
}
