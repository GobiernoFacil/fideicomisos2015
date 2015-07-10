<!doctype html>
<html lang="es-MX">
    <head>
	    <meta charset="utf-8">
	    <!--
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::	
.oPYo.        8       o                              ooooo     .o         o 8 
8    8        8                                      8                      8 
8      .oPYo. 8oPYo. o8 .oPYo. oPYo. odYo. .oPYo.   o8oo   .oPYo. .oPYo. o8 8 
8   oo 8    8 8    8  8 8oooo8 8  `' 8' `8 8    8    8     .oooo8 8    '  8 8 
8    8 8    8 8    8  8 8.     8     8   8 8    8    8     8    8 8    .  8 8 
`YooP8 `YooP' `YooP'  8 `Yooo' 8     8   8 `YooP'    8     `YooP8 `YooP'  8 8 
:....8 :.....::.....::..:.....:..::::..::..:.....::::..:::::.....::.....::....
:::::8 :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
:::::..:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
-->
        <title>@yield('title')</title>
        <meta name="description" content="@yield('description')">
        <meta name="viewport" content="width=device-width">
        <link rel="canonical" href="">	
        
        <link rel="shortcut icon" href="/icon_universal.png">
		<link rel="stylesheet" type="text/css"  href="/css/normalize.css">
		<link rel="stylesheet" type="text/css" href="/css/styles.css" />
    </head>
    <body class="@yield('body_class') fide-menu-push">
	     <!--nav-->
	     @include('layouts.admin_nav')	     
         <!--content-->
         @yield('content')
			
        <!--footer-->
		@include('layouts.footer')
    </body>
</html>