<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    <title>ST DENTAL</title>
    <style>
        .title{
            margin-top: 230px;
            color: cadetblue;
        }
    </style>
</head>
<body>

<div id="root-appoint"></div>
    <script src="{{ mix('js/index.js') }}"></script>
</body>
</html>
