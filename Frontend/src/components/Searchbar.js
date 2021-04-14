import { useHistory } from "react-router-dom";

const Searchbar=({ searchQuery, setSearchQuery }) => {
	const history = useHistory();
	const onSubmit = (e) => {
		history.push("?s=${searchQuery}");
		e.preventDefault();
	};

	return (
		<div>
		    <h3 style={{ float: "left", marginTop: "2rem", marginLeft: "2rem" }}>
		    	<strong>Inventory</strong>
		    </h3>

		    <span style={{ float: "right" }}>
		        <div class="bg-none pl-5 pr-5" style={{ paddingTop: "2rem" }}>
		            <form action="inventory_page/" method="get">
		                <div class="input-group mb-4 border rounded-pill" style={{ height: "40px", width: "400px" }}>
		                    <input 
		                    	value={searchQuery}
		                    	onSubmit={onSubmit}
		                    	type="text" 
		                    	placeholder="What are you searching for?" 
		                    	name="s" 
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
};

export default Searchbar;
