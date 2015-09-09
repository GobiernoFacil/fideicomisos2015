<!DOCTYPE html>
<html>
<head>
  <title></title>
</head>
<body>
<h1>Users</h1>

<ul>
  @foreach($users as $user)
  <li>{{$user->email}} <a href="/users/update/{{$user->id}}">editar</a></li>
  @endforeach
</ul>
</body>
</html>