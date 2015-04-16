<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

use App\Fideicomisos;

class Data extends Controller {

	private $default_year;
	function __construct(){
		$this->default_year = date('Y') - 1;
	}
	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function getIndex(){
		return view('query', []);
	}

	/**
	 * Muestra un compromiso por ID
	 * @param  int  $id
	 * @return Response
	 */
	public function getId($id){
		$response = Fideicomisos::find($id);
		return response()->json($response);
	}

	/**
	 * Muestra los compromisos por AÑO
	 * @param  int  $id
	 * @return Response
	 */
	public function getYear($year){
		$response = Fideicomisos::where('year', '=', $year)->get();
		return response()->json($response);
	}

	/**
	 * Muestra los compromisos por CLAVE
	 * @param  int  $id
	 * @return Response
	 */
	public function getRegistry($registry){
		$response = Fideicomisos::where('registry', '=', $registry)->get();
		return response()->json($response);
	}

	/**
	 * Muestra los compromisos por RAMO
	 * @param  int  $id
	 * @return Response
	 */
	public function getBranch($branch, $year = false){
		$response = Fideicomisos::where(function($query) use($branch, $year){
			$query->where('branch_id', '=', $branch)
			      ->where('year', '=', $year ? $year : $this->default_year);
		})->get();
		return response()->json($response);
	}

	/**
	 * Muestra los compromisos por RAMO
	 * @return Response
	 */
	public function getAll(){
		// year, branch_id, type_id, scope_id, designation, registry
		$response = Fideicomisos::select('year', 'branch_id', 'type_id', 'scope_id', 'designation', 'registry')
		                          ->orderBy('year', 'desc')
		                          ->groupBy('registry')
		                          ->get();
		return response()->json($response);
	}

	/**
	 * Muestra los compromisos por estadística
	 * @return Response
	 */
	public function getStats(){
		$response = Fideicomisos::selectRaw('COUNT(*) AS total, registry,year, designation')
		                          ->orderBy('year', 'desc')
		                          ->groupBy('registry')
		                          ->get();
		return response()->json($response);
	}

}
