<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Trusts;

use Illuminate\Http\Request;

class Sherlock extends Controller {

	const PAGE_SIZE = 50;
	/**
	 * Regresa una lista de fideicomisos
	 *
	 * @return Response
	 */
	public function index(Request $request)
	{
		$years    = $request->input("by_years", NULL);
		$years    = filter_var_array($years, FILTER_VALIDATE_INT);
		$fields   = $request->input("by_fields", NULL);
		$keywords = $request->input("by_keywords", NULL);
		$page     = $request->input("current_page", 0);
		$total    = $request->input("page_size", self::PAGE_SIZE);
		
		$query = Trusts::whereIn('year', $years);
		
		if(!empty($fields)){
			foreach($fields as $field){
				$query = $query->orderBy($field['field'], $field['order']);
			}
		}

		if(!empty($keywords)){
			foreach($keywords as $keyword){
				$query = $query->where($keyword['field'], 'like', "%" . $keyword['search'] . "%");
			}
		}

		$query = $query->skip($page*$total)->take($total);

		$query = $query->get();
		$response['trusts'] = $query;
		
		return response()->json($response);
	}
}
