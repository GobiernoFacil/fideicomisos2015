<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Models\Trusts;

class Admin extends Controller{

  const PAGE_SIZE = 50;

  // [ DASHBARD ]
  public function index(){
    return view('admin/dashboard');
  }

  // [ TRUSTS ]
  public function trusts($page = 1){
    $trusts = Trusts::skip(($page-1)*self::PAGE_SIZE)->take(self::PAGE_SIZE)->get();
    return view('admin/trusts')->with('trusts', $trusts);
  }

  // [ ADD TRUST FORM ]
  public function saveTrustForm(){
    return view('admin/add-trust');
  }

  // [ ADD TRUST ]
  public function saveTrust(Request $request){
    return redirect('admin/update-trust');
  }

  // [ UPDATE TRUST FORM ]
  public function updateTrustForm($id){
    $trust = Trusts::find($id);
    return view('admin/update-trust')->with('trust', $trust);
  }

  // [ UPDATE TRUST ]
  public function updateTrust(Request $request, $id){
    return redirect('admin/update-trust');
  }

  // [ DELETE TRUST ]
  public function deleteTrust($id){
    return redirect('home');
  }

  // [ ARTICLES ]

  // [ ADD ARTICLE FORM ]

  // [ ADD ARTICLE ]

  // [ UPDATE ARTICLE FORM ]

  // [ UPDATE ARTICLE ]

  // [ DELETE ARTICLE ]
}
