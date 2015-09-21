<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Models\Trusts;
use App\User;
use Hash;
use Auth;

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

  // [ AGREGAR USUARIO : VIEW ] 
  public function createUser(Request $request){
    return view('admin.add-user');
  }

  // [ AGREGAR USUARIO ]
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

  // [ EDITAR USUARIO : VIEW ] 
  public function editUser($id){
    $user = User::find($id);
    return view('admin.update-user')->with('user', $user);
  }

  // [ EDITAR USUARIO ]
  public function updateUser(Request $request, $id){
    $user  = User::find($id);
    
    $email = trim($request->input('email'));
    $request->merge(['email' => $email]);

    $unique = $user->email == $email ? "" : "|unique:users";
    $this->validate($request, [
      'email'    => 'required|email|max:255' . $unique,
      'password' => 'required_with:change_pass|min:8',
      'confirm'  => 'same:password'
    ]);

    if($request->input("change_pass")){
      $pass           = $request->password;
      $user->password = Hash::make($request->password);
    }
    $user->name     = $request->name;
    $user->email    = $request->email;
    $user->update();

    return redirect('users');
  }

  // [ ELIMINAR USUARIO ]
  public function deleteUser(Request $request, $id){
    $user  = Auth::user();
    $users = User::count();
    
    if($user->id != $id && $users>1){
      $zombie = User::find($id);
      $d = $zombie->delete();
      
      return redirect('users')->with("delete", $d);
    }
    else{
      return redirect('users')->with("delete", 0);
    }
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
