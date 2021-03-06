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
        <link rel="stylesheet" type="text/css" href="/css/dev_data.css" />

        <!-- the hugo stuff -->
        <script src="/js/bower_components/jquery/dist/jquery.min.js"></script>
        <!-- <script src="/js/main.js"></script> -->

        @if(isset($morlan))
        <!-- extra Morlan stuff -->
        <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="/js/bower_components/bootstrap/dist/css/bootstrap.min.css" media="screen" />
        <link rel="stylesheet" type="text/css" href="/css/estilo.css" media="screen"/>
        @endif

        <style type="text/css">
        /* fix for the link on the left nav */
        .reportajes aside h2 a{
            color: #8ba7c0;
        }
        /* fix the yellow bars */
        p .btn_link{
            width:100%;
        }
        @media screen and (max-width: 480px){
          .home .likeaboss {
            display: block;
          }
          .home .likeaboss figure{
            height: 480px;
          }
        }
        </style>

    </head>
    <body class="@yield('body_class') fide-menu-push">
	     <!--nav-->
	     @include('layouts.nav')	     
         <!--content-->
         @yield('content')
			
        <!--footer-->
		@include('layouts.footer')
    </body>
</html>