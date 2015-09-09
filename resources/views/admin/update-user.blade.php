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
    <p>Nombre<input type="text" name="name" id="name" value="{{$user->name}}"></p>
    <p>Correo <input type="email" name="email" id="email" value="{{$user->email}}"></p>
    <p><input type="checkbox" value="1" name="change_pass" id="change_pass" {{old('change_pass')? 'checked' : ''}}> Cambiar contraseña</p>
    <p>Contraseña:* <input type="password" name="password" id="password" disabled></p>
    <p>Confirmar Contraseña: <input type="password" name="confirm" id="confirm" disabled></p>
    <p>* ocho caracteres como mínimo para la contraseña</p>
    <p><input type="submit" value="Editar usuario"></p>
  </form>

<script>
  var change_pass = document.querySelector('#change_pass'),
      password    = document.querySelector('#password'),
      confirm     = document.querySelector('#confirm');

  if(change_pass.checked){
    password.disabled = false;
    confirm.disabled = false;
  }

  change_pass.onchange = function(e){
    if(this.checked){
      password.disabled = false;
      confirm.disabled = false;
    }
    else{
      password.disabled = true;
      confirm.disabled = true;
    }
  }
</script>

</body>
</html>