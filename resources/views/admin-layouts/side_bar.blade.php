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
          <span>Dashboard</span></a>
      </li>
      <!-- Divider -->
      <hr class="sidebar-divider">

      <!-- Nav Item - Pages Collapse Menu -->
      <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#projectmodule" aria-expanded="true"
          aria-controls="projectmodule">
          <i class="fas fa-fw fa-folder"></i>
          <span>Projects</span>
        </a>
        <div id="projectmodule" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
          <div class="bg-white py-2 collapse-inner rounded">
            <a class="collapse-item" href=" ">Add Project</a>
            <a class="collapse-item" href=" ">All Projects</a>
            <a class="collapse-item" href=" ">Import Projects</a>
          </div>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#employeemodule" aria-expanded="true"
          aria-controls="employeemodule">
          <i class="fas fa-fw fa-folder"></i>
          <span>Employees</span>
        </a>
        <div id="employeemodule" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
          <div class="bg-white py-2 collapse-inner rounded">
            <a class="collapse-item" href="">Add Employee</a>
            <a class="collapse-item" href="">All Employees</a>
          </div>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#managermodule" aria-expanded="true"
          aria-controls="managermodule">
          <i class="fas fa-fw fa-folder"></i>
          <span>Manager</span>
        </a>
        <div id="managermodule" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
          <div class="bg-white py-2 collapse-inner rounded">
            <a class="collapse-item" href="">Add Manager</a>
            <a class="collapse-item" href="">All Managers</a>
          </div>
        </div>
      </li>
    
      <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#designationmodule" aria-expanded="true"
          aria-controls="designationmodule">
          <i class="fas fa-fw fa-folder"></i>
          <span>Designation</span>
        </a>
        <div id="designationmodule" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
          <div class="bg-white py-2 collapse-inner rounded">
            <a class="collapse-item" href=" ">Add Designation</a>
            <a class="collapse-item" href=" ">All Designation</a>
          </div>
        </div>
      </li>
      
      <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#fieldWorkActivity" aria-expanded="true"
          aria-controls="fieldWorkActivity">
          <i class="fas fa-fw fa-folder"></i>
          <span>Field Work Activity</span>
        </a>
        <div id="fieldWorkActivity" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
          <div class="bg-white py-2 collapse-inner rounded">
            <a class="collapse-item" href=" ">Add Activity</a>
            <a class="collapse-item" href=" ">All Activities</a>
          </div>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#labWorkActivity" aria-expanded="true"
          aria-controls="labWorkActivity">
          <i class="fas fa-fw fa-folder"></i>
          <span>Lab Work Activity</span>
        </a>
        <div id="labWorkActivity" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
          <div class="bg-white py-2 collapse-inner rounded">
            <a class="collapse-item" href=" ">Add Activity</a>
            <a class="collapse-item" href=" ">All Activities</a>
          </div>
        </div>
      </li>
    
      <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#labTestTypes" aria-expanded="true"
          aria-controls="labTestTypes">
          <i class="fas fa-fw fa-folder"></i>
          <span>Lab Test Types</span>
        </a>
        <div id="labTestTypes" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
          <div class="bg-white py-2 collapse-inner rounded">
            <a class="collapse-item" href=" ">Add Test Type</a>
            <a class="collapse-item" href=" ">All Tests Types</a>
          </div>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#expenseActivity" aria-expanded="true"
          aria-controls="expenseActivity">
          <i class="fas fa-fw fa-folder"></i>
          <span>Expense Activity</span>
        </a>
        <div id="expenseActivity" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
          <div class="bg-white py-2 collapse-inner rounded">
            <a class="collapse-item" href=" ">Add Expense Activity</a>
            <a class="collapse-item" href=" ">All Expense Activity</a>
          </div>
        </div>
      </li> 

      <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#requestModule" aria-expanded="true"
          aria-controls="requestModule">
          <i class="fas fa-fw fa-folder"></i>
          <span>Requests</span><span class="badge badge-danger sidebar-request-counter" style="display:none;"></span>
        </a>
        <div id="requestModule" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
          <div class="bg-white py-2 collapse-inner rounded">
            <a class="collapse-item" href=" ">Pending Requests</a>
            <a class="collapse-item" href=" ">Approved Requests</a>
            <a class="collapse-item" href=" ">Cancelled Requests</a>
          </div>
        </div>
      </li>

      <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#deleteModule" aria-expanded="true"
          aria-controls="deleteModule">
          <i class="fas fa-fw fa-folder"></i>
          <span>Employees Works</span>
        </a>
        <div id="deleteModule" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
          <div class="bg-white py-2 collapse-inner rounded">
            <a class="collapse-item" href=" ">Field Works</a>
            <a class="collapse-item" href=" ">Lab Works</a>
          </div>
        </div>
      </li>

    

      <!-- Sidebar Toggler (Sidebar) -->
      <div class="text-center d-none d-md-inline" style="padding-top: 42px;">
        <button class="rounded-circle border-0" id="sidebarToggle"></button>
      </div>
 </ul>
 <!-- /End of Sidebar -->
