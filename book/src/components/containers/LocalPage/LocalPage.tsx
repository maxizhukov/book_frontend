import React, {useEffect, useRef, useState} from "react"
import {RootState} from "../../../redux/reducers/rootReducer"
import {connect} from "react-redux"
import AvatarContainer from "../AvatarContainer/AvatarContainer"

interface CustomProps {
	avatars?: any
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
	}, [])

	// Take width of page container to set font size
	const [containerWidth, setContainerWidth] = useState(0)
	const pageRef:any = useRef(null)
	useEffect(() => {
		if (!loadingPage) {
			const width = pageRef.current ? pageRef.current.offsetWidth : 0
			setContainerWidth(width)
		}
	}, [pageRef.current, loadingPage])

	const changeFontSize = (style:any) => {
		const changedStyles = {...style}
		const fontSize = containerWidth / +changedStyles.fontSize
		const width = containerWidth / +changedStyles.width
		const height = containerWidth / +changedStyles.height
		changedStyles.fontSize = `${fontSize}px`
		changedStyles.width = `${width}px`
		changedStyles.height = `${height}px`
		return changedStyles
	}

	return(
		<div className="avatar_box">
			<div
				ref={pageRef}
				className="pages_container"
				style={{backgroundImage:
						`url("${url}${data.types[0].img}")`
				}}
			>
				<div style={data.style.personOne.body.style as React.CSSProperties}>
					<img src={`${url}${data.style.personOne.body.person.firstPerson}`}
						 style={{width: "100%"}} alt="personOne"/>
				</div>
				<div
					style={data.style.personTwo.body.style as React.CSSProperties}
				>
					<img src={`${url}${data.style.personTwo.body.person.secondPerson}`}
						 style={{width: "100%"}} alt="personTwo"/>
				</div>
				<div
					style={data.style.personOne.style as React.CSSProperties}
				>
					<AvatarContainer
						pagesAvatar={avatars[0]}
					/>
				</div>
				<div
					style={data.style.personTwo.style as React.CSSProperties}
				>
					<AvatarContainer
						pagesAvatar={avatars[1]}
					/>
				</div>
				{
					data.style.texts.map((text:any, i:number) => (
						<textarea
							className="page_element"
							key={`${text}${i}`}
							style={changeFontSize(text.style)}
							defaultValue={text.text}
						/>
					))
				}
				{/*HERE PAGES*/}
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
