<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="utf-8">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">

  <link rel="icon" type="image/ico" href="{{ asset('assets/favicon.ico') }}"/>

  <title>Engtec - Admin</title>

  <!-- Custom fonts for this template-->
  <link href="{{asset('/assets/vendor/fontawesome-free/css/all.min.css')}}" rel="stylesheet" type="text/css">
  <link
    href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
    rel="stylesheet">
    <link rel="stylesheet" href="{{asset('css/app.css')}}">

  <!-- Custom styles for this template-->
  <link href="{{asset('/assets/css/sb-admin-2.min.css')}}" rel="stylesheet">
  <link href="{{asset('/assets/css/custom.css')}}" rel="stylesheet">
  <link href="{{asset('/assets/select2/select2.min.css')}}" rel="stylesheet">

  <!-- formvalidation.io -->
  <link href="{{asset('/assets/formvalidation/dist/css/formValidation.css')}}">
  <link href="{{asset('/assets/formvalidation/dist/css/formValidation.min.css')}}">

    @stack('styles')
    <style>
    .sidebar .nav-item .nav-link span {
      font-size: 0.85rem;
      display: inline;
      font-size: large;
    }
    .sidebar .nav-item .nav-link {
    display: block;
    width: 100%;
    text-align: left;
    padding: 1rem;
    width: 15rem;
  }
  .sidebar {
    width: 15rem!important;
   }
    </style>
  
</head>

<body id="page-top">
  <!-- Page Wrapper -->
  <div id="wrapper">
    <!-- Sidebar -->
     @include('admin-layouts.side_bar')
    <!-- End of Sidebar -->

    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">

      <!-- Main Content -->
      <div id="content">
        <!-- Topbar -->
         @include('admin-layouts.header')
        <!-- End of Topbar -->

        <!-- Begin Page Content -->
        <div class="container-fluid">
        @if (session('success'))
        <div class="alert alert-success alert-dismissible fade show" id="success_alert" role="alert">
           {{ session('success') }}
          <button type="button" class="close" data-dismiss="alert" id="error_alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        @endif
        @if (session('error'))
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
           {{ session('error') }}
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        @endif

          @stack('content')


        </div>
        <!-- /.container-fluid -->

      </div>
      <!-- End of Main Content -->

      <!-- Footer -->
        @include('admin-layouts.footer')
      <!-- End of Footer -->

    </div>
    <!-- End of Content Wrapper -->

  </div>
  <!-- End of Page Wrapper -->

  <!-- Scroll to Top Button-->
  <a class="scroll-to-top rounded" href="#page-top">
    <i class="fas fa-angle-up"></i>
  </a>


  <!-- Bootstrap core JavaScript-->
  <!-- <script src="vendor/jquery/jquery.min.js"></script> -->
  <!-- <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script> -->

  <!-- bottom script -->
   @include('admin-layouts.bottom_scripts')
  <!-- / end of bottom script -->
  @stack('scripts')
</body>

</html>
