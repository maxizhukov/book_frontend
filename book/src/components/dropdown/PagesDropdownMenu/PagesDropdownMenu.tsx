import React, {useState} from "react"
import "./PagesDropdownMenu.css"

export default function PagesDropdownMenu() {
	
	const [selectedTab, setSelectedTab] = useState("1")
	
	return(
		<div className="row" style={{backgroundColor: "#f0f0f0"}}>
			<div 
				onClick={() => setSelectedTab("1")}
				className={selectedTab === "1" 
					? "pages_menu_dropdown selected" 
					: "pages_menu_dropdown"}
			>
				Elements
			</div>
			<div
				onClick={() => setSelectedTab("2")}
				className={selectedTab === "2"
					? "pages_menu_dropdown selected"
					: "pages_menu_dropdown"}
			>
				Editor
			</div>
		</div>
	)
}
