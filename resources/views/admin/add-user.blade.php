<!DOCTYPE html>
<html>
<head>
  <title></title>
</head>
<body>

  
  <!-- VALIDATION -->
  @if(count($errors) > 0)
  <ul>
    @foreach($errors->all() as $error)
    <li>{{$error}}</li>
    @endforeach
  </ul>
  @endif

  <form method="POST" action="/users/add">
    <!-- STATUS MESSAGE -->

    {!! csrf_field() !!}
    <p>Nombre<input type="text" name="name" id="name" value="{{old('name')}}"></p>
    <p>Correo <input type="email" name="email" id="email" value="{{old('email')}}"></p>
    <p>Contraseña:* <input type="password" name="password" id="password"></p>
    <p>Confirmar Contraseña: <input type="password" name="confirm" id="confirm"></p>
    <p>* ocho caracteres como mínimo para la contraseña</p>
    <p><input type="submit" value="Crear usuario"></p>
  </form>
</body>
</html>