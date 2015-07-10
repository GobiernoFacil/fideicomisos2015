@extends('layouts.adminmaster')
@section('body_class', 'admin')

@section('title', 'Dashboard')
@section('description', "Dashboard")

@section('content')
<section>
 <div class="container">
  <h1>Dashboard</h1>
  <nav>
    <ul>
      <li><a href="{{url('admin/dashboard')}}">dashboard</a></li>
      <li><a href="{{url('navegador-de-fideicomisos')}}">fideicomisos</a></li>
    </ul>
  </nav>
 </div>
</section>
@endsection