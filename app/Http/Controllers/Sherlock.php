<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Trusts;

use Illuminate\Http\Request;

class Sherlock extends Controller {

	const PAGE_SIZE        = 50;
	const MAX_PAGE_SIZE    = 100;
	private $text_fields   = ['designation', 'objective', 'report', 'comments',
	                          'initial_amount_comments'];
	private $string_fields = ['branch', 'type', 'scope', 'unit', 'settlor', 
	                          'registry', 'fiduciary', 'theme', 'availability_type', 
	                          'initial_date'];
	private $num_fields    = ['income', 'yield', 'expenses', 'availability',
	                          'initial_amount'];

	/**
	 * Regresa una lista de fideicomisos en JSON
	 *
	 * @return Response
	 */
	public function index($query, $page = 0, $size = null){
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
		
		return response()->json($response);
	}

	/**
	 * Regresa una lista de fideicomisos en JSON
	 *
	 * @return Response
	 */
	public function advanced(Request $request)
	{
		$years  = $request->input("years", NULL);
		$years  = filter_var_array($years, FILTER_VALIDATE_INT);
		$fields = $request->input("by_fields", NULL);
		$query  = $request->input("query", NULL);
		$query  = filter_var($query, FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_LOW);
		$page   = $request->input("current_page", 0);
		$total  = $request->input("page_size", self::PAGE_SIZE);
		
		$settings = ['years' => $years, 'fields' => $fields, 'query' => $query];
		
		$response = [];
		$response['query_total'] = $this->_count_result($settings); 
		$response['trusts']      = $this->_get_result($settings, $page, $total);
		/*
		if(!empty($fields)){
			foreach($fields as $field){
				$query = $query->orderBy($field['field'], $field['order']);
			}
		}
		*/
		
		return response()->json($response);
	}

	/**
	 * Regresa una lista de fideicomisos
	 *
	 * @return List
	 */
	private function _get_result($settings, $page, $total){
		$query = Trusts::whereIn('year', $settings['years']);

		$fields = array_merge($this->string_fields, $this->text_fields);
		$query = $query->where(array_shift($fields), 'like', '%'.$settings['query'].'%');
		foreach($fields as $field){
			$query = $query->orWhere($field, 'like', '%'.$settings['query'].'%');
		}

		$query = $query->skip($page*$total)->take($total);
		$query = $query->get();
		return $query;
	}

	/**
	 * Regresa el número de fideicomosos en la búsqueda
	 *
	 * @return Number
	 */
	private function _count_result($settings){
		$query = Trusts::whereIn('year', $settings['years']);

		$fields = array_merge($this->string_fields, $this->text_fields);
		$query = $query->where(array_shift($fields), 'like', '%'.$settings['query'].'%');
		foreach($fields as $field){
			$query = $query->orWhere($field, 'like', '%'.$settings['query'].'%');
		}

		return $query->count();
	}
}
