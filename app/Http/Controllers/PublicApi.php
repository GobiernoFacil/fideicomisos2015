<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Trusts;

class PublicApi extends Controller{

  const PAGE_SIZE        = 50;
  const MAX_PAGE_SIZE    = 100;
  private $text_fields   = ['designation', 'objective', 'report', 'comments',
                            'initial_amount_comments'];
  private $string_fields = ['branch', 'type', 'scope', 'unit', 'settlor', 
                            'registry', 'fiduciary', 'theme', 'availability_type', 
                            'initial_date'];
  private $num_fields    = ['income', 'yield', 'expenses', 'availability',
                            'initial_amount'];
  private $categories    = ["branch", "type", "scope", "theme", "unit", "settlor", "fiduciary"];

  public function index(){

  }

  //
  // T O D O S   L O S   F I D E I C O M I S O S
  //
  //
  public function Trusts($orderBy = "availability", $year = 0, $order = 0, $textfields = 0){
    $query = Trusts::groupBy("registry");
    if($year){
      $query->where("year", $year);
    }
    if(in_array($orderBy, $this->num_fields)){
      $query->orderBy($orderBy . "_num", $order ? "desc": "asc");
    }
    else{
      $query->orderBy("availability_num", $order ? "desc": "asc");
    }

    $fields = ["id"];
    $fields = array_merge($fields, $this->num_fields, $this->string_fields);
    if($textfields){
      $fields = array_merge($fields, $this->text_fields);
    }
    $query->select($fields);

    $response = $query->get();

    return response()->json($response)->header('Access-Control-Allow-Origin', '*');
  }

  //
  // U N   F I D E I C O M I S O 
  //
  //
  public function Trust($key){
    $trust = Trusts::where('registry', $key)
              ->orderBy('year', 'asc')->get();

    if($trust->isEmpty()){
      $trust = Trusts::find($key);
    }

    return response()->json($trust)->header('Access-Control-Allow-Origin', '*');
  }

  //
  // A L G U N O S   F I D E I C O M I S O S
  //
  //
  public function Registry($registry){
    // separa los registros
    $list     = explode('|', $registry);
    // obtiene todos los fideicomisos con el mismo registro
    $response = Trusts::whereIn('registry', $list)->get();

    // los regresa en JSONxCORS
    return response()->json($response)->header('Access-Control-Allow-Origin', '*');
  }

  //
  // B U S C A   F I D E I C O M I S O S
  //
  //
  public function Search($query, $page = 0, $size = null){
    $query  = filter_var($query, FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_LOW);
    $total  = $size ? $size : self::PAGE_SIZE;
    
    // get the results
    $fields = array_merge($this->string_fields, $this->text_fields);
    $trusts = Trusts::where(array_shift($fields), 'like', '%'.$query.'%');
    foreach($fields as $field){
      $trusts = $trusts->orWhere($field, 'like', '%'.$query.'%');
    }
    $trusts = $trusts->orderBy("id")->groupBy('registry')->skip($page*$total)->take($total)->get();

    // get the total
    $fields = array_merge($this->string_fields, $this->text_fields);
    $count = Trusts::where(array_shift($fields), 'like', '%'.$query.'%');
    foreach($fields as $field){
      $count = $count->orWhere($field, 'like', '%'.$query.'%');
    }
    $count = $count->groupBy('registry')->select("registry")->get()->count();


    $response = [];
    $response['page']        = $page;
    $response['pages']       = ceil($count/$total);
    $response['query_total'] = $count;
    $response['trusts']      = $trusts;
    
    return response()->json($response)->header('Access-Control-Allow-Origin', '*');
  }

  //
  // O B T I E N E   F I D E I C O M I S O S   P O R   C A T E G O R Í A
  //
  //
  public function Categories($name, $page = 0, $category = "branch", $year = 0, $textfields = 0, $full = 0){
    $trusts = $year ? Trusts::where("year", $year) : Trusts::where("year", ">", "2000");

    if(in_array($category, $this->categories)){
      $trusts->where($category, $name);
    }
    else{
      $trusts->where("branch", $name);
    }

    $fields = ["id"];
    $fields = array_merge($fields, $this->num_fields, $this->string_fields);
    if($textfields){
      $fields = array_merge($fields, $this->text_fields);
    }
    $trusts->select($fields);

    if(!$full){
      $trusts->groupBy('registry');
    }
    $trusts = $trusts->orderBy("id")->skip($page*self::MAX_PAGE_SIZE)->take(self::MAX_PAGE_SIZE)->get();

    return response()->json($trusts)->header('Access-Control-Allow-Origin', '*');
  }

}
