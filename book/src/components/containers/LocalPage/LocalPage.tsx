import React, {useEffect, useRef, useState} from "react"
import {RootState} from "../../../redux/reducers/rootReducer"
import {connect} from "react-redux"
import AvatarContainer from "../AvatarContainer/AvatarContainer"

import testBg from "../../../img/bg_text_2.png"
import personOne from "../../../img/b1.png"
import personTwo from "../../../img/b1.png"

interface CustomProps {
	avatars?: any
}

const personOneFaceStyle = {
	"position": "absolute",
	"left": "35%",
	"top": "58.5%",
	"zIndex": 0,
	"width": "6%"
}

const personTwoFaceStyle = {
	"position": "absolute",
	"left": "65%",
	"top": "42.5%",
	"zIndex": 0,
	"width": "13%"
}

const personOneStyle = {
	"position": "absolute",
	"left": "35%",
	"top": "62%",
	"zIndex": 0,
	"width": "6%"
}

const personTwoStyle = {
	"position": "absolute",
	"left": "65%",
	"top": "50%",
	"zIndex": 0,
	"width": "13%"
}

// eslint-disable-next-line max-len
const text = "I love you!"

const textStyle = {
	"transform": "rotateZ(-12deg)",
	"position": "absolute",
	"left": "10%",
	"top": "65%",
	"width": "80%",
	"height": "inherit",
	"maxHeight": "20%",
	"fontSize": "9",
	"fontWeight": "bold",
	"color": "yellow",
	"fontFamily": "'Stint Ultra Condensed', cursive",
	"textAlign": "center"
}

// eslint-disable-next-line max-len
const textTwo = "Your touch does to me what a pebble does when dropped into the calm waters of a lake. You send ripples through my body and my soul."

const textStyleTwo = {
	"position": "absolute",
	"left": "10%",
	"top": "20%",
	"width": "80%",
	"height": "inherit",
	"maxHeight": "40%",
	"fontSize": "18",
	"fontWeight": "bold",
	"color": "darkred",
	"fontFamily": "'Stint Ultra Condensed', cursive",
	"textAlign": "center"
}

function LocalPage({avatars}:CustomProps) {

	const url = "http://localhost:5000/"

	const data = {
		"name": "1",
		"types": [
			{
				"name": "1",
				"img": "uploads/myImage-1623705588538.jpeg",
				"preview": "uploads/myImage-1623705598438.jpeg"
			}
		],
		"style": {
			"texts": [
				{
					"text": "LOVE",
					"style": {
						"position": "absolute",
						"left": "46%",
						"top": "15%",
						"width": "6",
						"height": "13",
						"fontSize": "17",
						"fontWeight": "bold",
						"color": "red",
						"fontFamily": "Montserrat"
					}
				}
			],
			"personOne": {
				"style": {
					"position": "absolute",
					"left": "18%",
					"top": "43%",
					"zIndex": 0,
					"width": "20%"
				},
				"body": {
					"style": {
						"position": "absolute",
						"left": "17%",
						"top": "60%",
						"width": "22%"
					},
					"person": {
						"firstPerson": "uploads/myImage-1623705079998.png",
						"secondPerson": "uploads/myImage-1623705380645.png"
					}
				}
			},
			"personTwo": {
				"style": {
					"position": "absolute",
					"left": "42%",
					"top": "44%",
					"zIndex": 0,
					"width": "20%"
				},
				"body": {
					"style": {
						"position": "absolute",
						"left": "43%",
						"top": "54%",
						"width": "22%"
					},
					"person": {
						"firstPerson": "uploads/myImage-1623705346873.png",
						"secondPerson": "uploads/myImage-1623705440647.png"
					}
				}
			}
		},
		"_id": "60c7c3bc53a7de818016ef8a"
	}

	const [loadingPage, setLoadingPage] = useState(true)

	// Show loading till page will not rendered
	useEffect(() => {
		if (loadingPage) {
			setLoadingPage(false)
		}
		// eslint-disable-next-line
	}, [])

	// Take width of page container to set font size
	const [containerWidth, setContainerWidth] = useState(0)
	const pageRef:any = useRef(null)
	useEffect(() => {
		if (!loadingPage) {
			const width = pageRef.current ? pageRef.current.offsetWidth : 0
			setContainerWidth(width)
		}
		// eslint-disable-next-line
	}, [pageRef.current, loadingPage])

	const changeFontSize = (style:any) => {
		const changedStyles = {...style}
		const fontSize = containerWidth / +changedStyles.fontSize
		/*const width = containerWidth / +changedStyles.width
		const height = containerWidth / +changedStyles.height*/
		changedStyles.fontSize = `${fontSize}px`
		/*changedStyles.width = `${width}px`
		changedStyles.height = `${height}px`*/
		return changedStyles
	}

	return(
		<div className="avatar_box">
			<div
				ref={pageRef}
				className="pages_container"
				style={{backgroundImage:
						`url("${testBg}")`
				}}
			>
				{/*<div style={personOneStyle as React.CSSProperties}>
					<img src={personOne}
						 style={{width: "100%"}} alt="personOne"/>
				</div>
				<div
					style={personTwoStyle as React.CSSProperties}
				>
					<img src={personTwo}
						 style={{width: "100%"}} alt="personTwo"/>
				</div>
				<div
					style={personOneFaceStyle as React.CSSProperties}
				>
					<AvatarContainer
						pagesAvatar={avatars[1]}
					/>
				</div>
				<div
					style={personTwoFaceStyle as React.CSSProperties}
				>
					<AvatarContainer
						pagesAvatar={avatars[1]}
					/>
				</div>*/}
				<textarea
					className="page_element"
					style={changeFontSize(textStyle)}
					defaultValue={text}
				/>
				<textarea
					className="page_element"
					style={changeFontSize(textStyleTwo)}
					defaultValue={textTwo}
				/>
			</div>
		</div>
	)
}

const mapStateToProps = (state:RootState) => {
	return {
		avatars: state.avatars.avatars
	}
}

export default connect(mapStateToProps, null)(LocalPage)
