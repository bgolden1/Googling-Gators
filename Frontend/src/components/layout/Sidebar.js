import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


class Sidebar extends Component {
	openNav() {
		document.getElementById("sidebar").style.width="250px";
	}

	closeNav() {
		document.getElementById("sidebar").style.width="0px";
	}

	render() {
		return (
			<div id="sidenav" class="sidenav">

				<div id="content">
					<nav class="navbar navbar-expand-lg navbar-light bg-light">
						<div class="container-fluid">
							<button type="button" id="sidebarCollapse" class="btn btn-info">
								<i class="fas fa-align-left"></i>
								<span onclick="openNav()">Sidebar</span>
							</button>
						</div>
					</nav>
				</div>

				<nav id="sidebar">
					<div class="sidebar-header">
						<h3>i am broken</h3>
					</div>

					<ul class="list-unstyled components">
						<li class="nav-item">
							<a class="nav-link" href="/dashboard">Dashboard</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="/inventory_page">Inventory</a>
						</li>
						<li class="nav-item dropdown">
							<a href="#" id="navbarDrop" data-bs-toggle="dropdown" aria-expanded="false" class="nav-link dropdown-toggle">Part Order</a>
							<ul class="dropdown-menu" aria-labelledby="navbarDrop">
								<li>
									<a class="dropdown-item" href="/order">PO Dashboard</a>
								</li>
								<li>
									<a class="dropdown-item" href="/po_form">PO Form</a>
								</li>
							</ul>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="/settings">Settings</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="/logout">Log Out</a>
						</li>
					</ul>
				</nav>
			</div>
		);
	}
}

export default Sidebar;