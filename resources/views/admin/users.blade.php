<!DOCTYPE html>
<html>
<head>
  <title></title>
</head>
<body>
<h1>Users</h1>
@if(session("delete") !== NULL)
<p>{{session("delete") ? "El usuario se ha eliminado" : "no se logró eliminar al usuario :/"}}</p>
@endif
<p><a href="/users/add">Agregar usuario</a></p>
<ul>
  @foreach($users as $user)
  <li>
    {{$user->email}} 
    <a href="/users/update/{{$user->id}}">editar</a>
    <a href="/users/delete/{{$user->id}}">eliminar</a>
  </li>
  @endforeach
</ul>
</body>
</html>