import { Component } from "react";

class Searchbar extends Component {
	state = {searchValue:""}

	filterOnChange = (event) => {
		this.setState({ searchValue: event.target.value });
		this.props.callbackFromParent(this.state.searchValue)
		console.log(this.state.searchValue);
		event.preventDefault();
	}


	render() {
		return (
			<div>
			    <h1 style={{ float: "left", marginTop: "2rem", marginLeft: "5rem" }}>
			    	<strong>Inventory</strong>
			    </h1>

			    <span style={{ float: "right" }}>
			        <div class="bg-none pl-5" style={{ paddingRight: "5rem", paddingTop: "2.25rem" }}>
			            <form action="inventory_page/" method="get">
			                <div class="input-group mb-4 border rounded-pill" style={{ height: "40px", width: "400px" }}>
			                    <input 
			                    	type="text" 
			                    	placeholder="   What are you searching for?" 
									name="s" 
									id="searchinput"
									onChange={this.filterOnChange}
			                    	aria-describedby="searchbutt" 
			                    	class="form-control bg-none border-0" 
			                    	style={{ borderColor: "none", boxShadow: "none", fontSize: "15px" }}
								/>
								
			                    <div class="input-group-append border-0">
			                        <button 
			                        	id="searchbutt" 
			                        	type="submit" 
			                        	class="btn btn-link text-secondary" 
			                        	style={{ borderColor: "none", boxShadow: "none" }}
			                        >
			                            <i class="material-icons">search</i>
			                        </button>
			                    </div>
			                </div>
			            </form>
			        </div>
			    </span>
			 </div>
		);
	}
}

export default Searchbar;
