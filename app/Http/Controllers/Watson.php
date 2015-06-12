<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Trusts;
use App\Models\Definitions;

use Illuminate\Http\Request;

class Watson extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		//
		$total_trusts = Trusts::count();
		$definitions = Definitions::all();
		$years = Trusts::select('year')->groupBy('year')->lists('year');
		return view('watson', [
			'total'       => $total_trusts, 
			'years'       => $years,
			'definitions' => $definitions
			]);
	}
}
