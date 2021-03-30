import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


class Sidebar extends Component {
	render() {
		return (
			<div class="wrapper">
				<nav id="sidebar">
					<div class="sidebar-header">
						<h3>Menu</h3>
					</div>

					<ul class="list-unstyled components">
						<li>
							<a href="/dashboard">Dashboard</a>
						</li>
						<li>
							<a href="/inventory">Inventory</a>
						</li>
						<li>
							<a href="#POsubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Part Order</a>
							<ul class="collapse list-unstyled" id="POsubmenu">
								<li>
									<a href="/order">PO Dashboard</a>
								</li>
								<li>
									<a href="/po_form">PO Form</a>
								</li>
							</ul>
						</li>
						<li>
							<a href="/settings">Settings</a>
						</li>
						<li>
							<a href="/logout">Log Out</a>
						</li>
					</ul>
				</nav>

				<div id="content">
					<nav class="navbar navbar-expand-lg navbar-light bg-light">
						<div class="container-fluid">
							<button type="button" id="sidebarCollapse" class="btn btn-info">
								<i class="fas fa-align-left"></i>
								<span>Sidebar</span>
							</button>
						</div>
					</nav>
				</div>
			</div>
		);
	}
}

export default Sidebar;
