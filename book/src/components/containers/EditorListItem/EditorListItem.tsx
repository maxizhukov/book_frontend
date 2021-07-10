import React from "react"
import BeatLoader from "react-spinners/BeatLoader"
import "./EditorListItem.css"
import {RootState} from "../../../redux/reducers/rootReducer"
import {connect} from "react-redux"

interface CustomProps {
	item: any,
	chosenItem: boolean,
	menuState?: any,
	handleItemClick: (name:string, img:string, secondImage?:string) => void,
	preview?: boolean,
	imageLoaded: () => void,
	loading: boolean
}

function EditorListItem({
	item,
	chosenItem,
	menuState,
	handleItemClick,
	preview,
	imageLoaded,
	loading
}:CustomProps) {
	const url = "http://localhost:5000/"
	const image = preview ? `${url}${item.preview}` : `${url}${item.img}`

	return(
		
		<div
			onClick={() =>
				handleItemClick(
					item.name,
					preview ? `${url}${item.img}` : image,
					menuState.category === "hair" ? `${url}${item.secondImage}` : ""
				)}
			className={chosenItem ? "editor_list_item selected" : "editor_list_item"}
		>
			{loading
				? <BeatLoader loading={true} size={8} color={"#30A6D9"} />
				: null
			}
			<img
				onLoad={imageLoaded}
				width="80%"
				src={image}
				style={loading
					? {display: "none"}
					: {display: "block"}
				}
				alt=""/>
		</div>
	)
};

const mapStateToProps = (state:RootState) => {
	return {
		menuState: state.editorMenu.avatarMenu
	}
}

export default connect(mapStateToProps, null)(EditorListItem)
