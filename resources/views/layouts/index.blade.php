<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="Galaxy Computers Products with Category">
  <meta name="author" content="Sakander Tamoor">

  <link rel="icon" type="image/ico" href="{{ asset('assets/favicon.ico') }}"/>

  <title>Galaxy Computers</title>

  @include('layouts.header_files')

</head>

<body id="page-top">
  <!-- Page Wrapper -->
  <div id="wrapper">
    <!-- Sidebar -->
     @include('layouts.side_bar')
    <!-- End of Sidebar -->

    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">

      <!-- Main Content -->
      <div id="content">
        <!-- Topbar -->
         @include('layouts.header')
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
        @include('layouts.footer')
      <!-- End of Footer -->

    </div>
    <!-- End of Content Wrapper -->

  </div>
  <!-- End of Page Wrapper -->

  <!-- Scroll to Top Button-->
  <a class="scroll-to-top rounded" href="#page-top">
    <i class="fas fa-angle-up"></i>
  </a>

  <!-- bottom script -->
   @include('layouts.bottom_scripts')
  <!-- / end of bottom script -->

</body>
</html>
