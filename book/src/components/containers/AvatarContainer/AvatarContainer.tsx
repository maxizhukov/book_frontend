import React, {useEffect} from "react"
import "./AvatarContainer.css"
import {RootState} from "../../../redux/reducers/rootReducer"
import {connect} from "react-redux"

interface CustomProps {
	avatars?: any
}

function AvatarContainer({avatars}:CustomProps) {

	return(
		<div className="page">
			<div className="avatar_box">
				<div className="avatar_container">
					<div
						className="avatar_faceSkin"
						style={{backgroundImage: `url("${avatars[0].faceOval}")`}}
					/>
					<div
						className="avatar_hair"
						style={{backgroundImage: `url("${avatars[0].hair}")`}}
					/>
					<div
						className="avatar_eyes"
						style={{backgroundImage: `url("${avatars[0].eyes}")`}}
					/>
					<div
						className="avatar_eyebrows"
						style={{backgroundImage: `url("${avatars[0].eyebrows}")`}}
					/>
					<div
						className="avatar_lips"
						style={{backgroundImage: `url("${avatars[0].lips}")`}}
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
