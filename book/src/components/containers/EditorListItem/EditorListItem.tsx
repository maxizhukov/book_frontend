import React from "react"
import "./EditorListItem.css"

interface CustomProps {
	item: any,
	chosenItem: boolean,
	menuState?: any,
	handleItemClick: (name:string, img:string) => void
}

export default function EditorListItem({item, chosenItem, menuState, handleItemClick}:CustomProps) {
	const url = "http://localhost:5000/"
	const image = `${url}${item.img}`

	return(
		<div
			onClick={() => handleItemClick(item.name, image)}
			className={chosenItem ? "editor_list_item selected" : "editor_list_item"}
			style={{backgroundImage: `url("${image}")`}}
		>
			{chosenItem
				?
				<div className="checked_dot">
					<i className="fas fa-check" />
				</div>
				: null}
		</div>
	)
};
