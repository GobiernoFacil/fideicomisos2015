<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Trusts;

use Illuminate\Http\Request;

class Sherlock extends Controller {

	const PAGE_SIZE = 50;
	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index(Request $request)
	{
		$years    = $request->input("by_years", NULL);
		$fields   = $request->input("by_fields", NULL);
		$keywords = $request->input("by_keywords", NULL);
		$filters  = $request->input("by_filters", NULL);
		$page     = $request->input("current_page", 0);
		$total    = $request->input("page_size", self::PAGE_SIZE);

		$trusts = Trusts::whereIn('year', $years)->skip($page*$total)->take($total)->get();

		$response = $request->all();

		$response['trusts'] = $trusts;

		// var_dump($response);
		return response()->json($response);
	}
}
