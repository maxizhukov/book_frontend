import React, {useEffect} from "react"
import "./AvatarContainer.css"
import {RootState} from "../../../redux/reducers/rootReducer"
import {connect} from "react-redux"

interface CustomProps {
	pagesAvatar?: any,
	existingIndex?: number,
	avatars?: any
}

function AvatarContainer({avatars, existingIndex, pagesAvatar}:CustomProps) {
	const avatarIndex:number = +window.location.search.slice(1,2)

	let index = existingIndex ? existingIndex : avatarIndex

	return(
		<div className="page" id={index.toString()}>
			<div className="avatar_box">
				<div className="avatar_container">
					<div
						className="avatar_faceSkin"
						style={{backgroundImage: `url("${pagesAvatar 
							? pagesAvatar.faceOval 
							: avatars[index].faceOval}")`}}
					/>
					{avatars[index].hair
						? <img src={avatars[index].hair} className="hair" alt=""/>
						: null
					}
					{avatars[index].hairBack
						? <img src={avatars[index].hairBack} className="hair_back" alt=""/>
						: null
					}
					<div
						className="avatar_eyes"
						style={{backgroundImage: `url("${pagesAvatar 
							? pagesAvatar.eyes 
							: avatars[index].eyes}")`}}
					/>
					<div
						className="avatar_eyebrows"
						style={{backgroundImage: `url("${pagesAvatar 
							? pagesAvatar.eyebrows 
							: avatars[index].eyebrows}")`}}
					/>
					<div
						className="avatar_lips"
						style={{backgroundImage: `url("${pagesAvatar 
							? pagesAvatar.lips 
							: avatars[index].lips}")`}}
					/>
					<div
						className="avatar_nose"
						style={{backgroundImage: `url("${pagesAvatar 
							? pagesAvatar.nose 
							: avatars[index].nose}")`}}
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
