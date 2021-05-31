import React from "react"
import "./AvatarContainer.css"
import {RootState} from "../../../redux/reducers/rootReducer"
import {connect} from "react-redux"

interface CustomProps {
	existingIndex?: number,
	avatars?: any
}

function AvatarContainer({avatars, existingIndex}:CustomProps) {
	const avatarIndex:number = +window.location.search.slice(1,2)

	const index = existingIndex ? existingIndex : avatarIndex

	return(
		<div className="page" id={index.toString()}>
			<div className="avatar_box">
				<div className="avatar_container">
					<div
						className="avatar_faceSkin"
						style={{backgroundImage: `url("${avatars[index].faceOval}")`}}
					/>
					<div
						className="avatar_hair"
						style={{backgroundImage: `url("${avatars[index].hair}")`}}
					/>
					<div
						className="avatar_eyes"
						style={{backgroundImage: `url("${avatars[index].eyes}")`}}
					/>
					<div
						className="avatar_eyebrows"
						style={{backgroundImage: `url("${avatars[index].eyebrows}")`}}
					/>
					<div
						className="avatar_lips"
						style={{backgroundImage: `url("${avatars[index].lips}")`}}
					/>
					<div
						className="avatar_nose"
						style={{backgroundImage: `url("${avatars[index].nose}")`}}
					/>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state:RootState) => {
	return {
		avatars: state.avatars.avatars
	}
}

export default connect(mapStateToProps, null)(AvatarContainer)
