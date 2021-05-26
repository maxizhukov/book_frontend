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
						style={{backgroundImage: `url("${avatars[0].faceSkin}")`}}
					/>
					<div
						className="avatar_hair"
						style={{backgroundImage: `url("${avatars[0].hair}")`}}
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
