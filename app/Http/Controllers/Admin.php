<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Models\Trusts;
use App\User;
use Hash;

class Admin extends Controller{

  const PAGE_SIZE = 50;

  // [ DASHBARD ]
  public function index(){
    return view('admin/dashboard');
  }


  // [ ADMINS ]
  public function users(){
    $users = User::all();
    return view('admin.users')->with('users', $users);
  }

  public function createUser(Request $request){
    return view('admin.add-user');
  }

  public function storeUser(Request $request){
    $email = trim($request->input('email'));

    $request->merge(['email' => $email]);
    $this->validate($request, [
      'email'    => 'required|email|unique:users|max:255',
      'password' => 'required|min:8',
      'confirm'  => 'same:password'
    ]);

    $user           = new User();
    $pass           = $request->password;
    $user->name     = $request->name;
    $user->email    = $request->email;
    $user->password = Hash::make($request->password);
    $user->save();

    return redirect('users');
  }

  public function editUser($id){
    $user = User::find($id);
    return view('admin.update-user')->with('user', $user);
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
    $trust = Trusts::find($id);
    $trust->update($request->all());
    return redirect('trusts/update/' . $trust->id);
  }

  // [ DELETE TRUST ]
  public function deleteTrust($id){
    return redirect('home');
  }

  // [ TRUSTS HELPERS ]
  private function get_common_fields($fields){
    $common = [
      'initial_date' => $fields['initial_date']
    ];
  }


  // [ ARTICLES ]

  // [ ADD ARTICLE FORM ]

  // [ ADD ARTICLE ]

  // [ UPDATE ARTICLE FORM ]

  // [ UPDATE ARTICLE ]

  // [ DELETE ARTICLE ]
}
