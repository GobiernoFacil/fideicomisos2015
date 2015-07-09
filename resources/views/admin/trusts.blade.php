<!DOCTYPE html>
<html>
<head>
  <title>Dashboard</title>
</head>
<body>
  <h1>Fideicomisos</h1>
  <p>Aquí va la lista de fideicomisos</p>

  <ul>
    @foreach($trusts as $trust)
    <li>
      <a href="{{url('trusts/update/' . $trust->id)}}">
      {{$trust->designation}}</a>
    </li>
    @endforeach
  </ul>
</body>
</html>