<!DOCTYPE html>
<html>
<head>
  <title>Login</title>
</head>
<body>
  <h1>Login</h1>
  <form method="POST" action="/auth/login">
    {!! csrf_field() !!}
    <p>Correo<input type="email" name="email" value="{{old('email')}}"></p>
    <p>Contraseña<input type="password" name="password" id="password"></p>
    <p><button type="submit">Iniciar sesión</button></p>
  </form>
</body>
</html>