<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Trusts;

use Illuminate\Http\Request;

class Sherlock extends Controller {

	const PAGE_SIZE        = 50;
	const MAX_PAGE_SIZE    = 500;
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
	public function index(Request $request)
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
		return $query->count();
	}
}
