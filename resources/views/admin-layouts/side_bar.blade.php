<!-- Sidebar -->
<ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
      <!-- Sidebar - Brand -->
      <a class="sidebar-brand d-flex align-items-center justify-content-center" href="{{url('')}}">

        <div class="sidebar-brand-text mx-3">
          <img src="{{asset('/assets/img/logo.png')}}" alt="" width="100%">
          <!--<sup>2</sup>-->
        </div>
      </a>
      <!-- Divider -->
      <hr class="sidebar-divider my-0">
      <!-- Nav Item - Dashboard -->
      <li class="nav-item active">
        <a class="nav-link" href="{{ url('/') }}">
          <i class="fas fa-fw fa-tachometer-alt"></i>
          <span>Home</span></a>
      </li>
      <!-- Divider -->
      <hr class="sidebar-divider">

      <!-- Nav Item - Pages Collapse Menu -->
      <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#projectmodule" aria-expanded="true"
          aria-controls="projectmodule">
          <i class="fas fa-fw fa-folder"></i>
          <span>Category</span>
        </a>
        <div id="projectmodule" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
          <div class="bg-white py-2 collapse-inner rounded">
            <a class="collapse-item" href=" ">Add Category</a>
            <a class="collapse-item" href=" ">All Projects</a>
          </div>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#employeemodule" aria-expanded="true"
          aria-controls="employeemodule">
          <i class="fas fa-fw fa-folder"></i>
          <span>Project</span>
        </a>
        <div id="employeemodule" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
          <div class="bg-white py-2 collapse-inner rounded">
            <a class="collapse-item" href="">Add Project</a>
            <a class="collapse-item" href="">All Project</a>
          </div>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#managermodule" aria-expanded="true"
          aria-controls="managermodule">
          <i class="fas fa-fw fa-folder"></i>
          <span>Invoices</span>
        </a>
        <div id="managermodule" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
          <div class="bg-white py-2 collapse-inner rounded">
            <a class="collapse-item" href="">Add Invoices</a>
            <a class="collapse-item" href="">All Invoices</a>
          </div>
        </div>
      </li>

      <!-- Sidebar Toggler (Sidebar) -->
      <div class="text-center d-none d-md-inline" style="padding-top: 42px;">
        <button class="rounded-circle border-0" id="sidebarToggle"></button>
      </div>
 </ul>
 <!-- /End of Sidebar -->
