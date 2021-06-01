import React, {useEffect, useRef, useState} from "react"
import "./BookPages.css"
import RoundedButton from "../../buttons/RoundedButton/RoundedButton"
import {useTranslation} from "react-i18next"
import ElementsTabs from "../../containers/Tabs/ElementsTabs/ElementsTabs"
import EditorTabs from "../../containers/Tabs/EditorTabs/EditorTabs"
import {useParams} from "react-router"
import {useHistory} from "react-router-dom"
import sampleImage from "../../../img/photo_2021-06-01 19.32.15.jpeg"
import {getCookie} from "../../../utils/cookie"
import AvatarContainer from "../../containers/AvatarContainer/AvatarContainer"
import {useDispatch} from "react-redux"
import {handleChosenItem} from "../../../redux/actions/editorMenuActions"

export default function BookPages() {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const history = useHistory()
	const id:any = useParams()

	const [avatarsFromCookie, setAvatarsFromCookie] = useState([])

	const [loadingPage, setLoadingPage] = useState(true)

	useEffect(() => {
		const jsonStr = getCookie("mycookie")
		const arr = JSON.parse(jsonStr)
		setAvatarsFromCookie(arr)
	}, [])

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

	const handleItemFocus = (name:string, i:number) => {
		dispatch(handleChosenItem(
			{name: name, index: i}
		))
	}

	/*TEST OBJECT*/
	const testObj:any = {
		personOne: {
			style: {
				position: "absolute",
				left: "18%",
				top: "43%",
				zIndex: 0,
				width: "20%"
			}
		},
		personTwo: {
			style: {
				position: "absolute",
				left: "42%",
				top: "44%",
				zIndex: 0,
				width: "20%"
			}
		},
		texts: [
			{
				text: "LOVE",
				style: {
					position: "absolute",
					left: "46%",
					top: "15%",
					width: `${containerWidth/6}px`,
					height: `${containerWidth/13}px`,
					fontSize: `${containerWidth/17}px`,
					fontWeight: "bold",
					color: "red",
					fontFamily: "Montserrat"
				}
			}
		]
	}



	const [pageNumber, setPageNumber] = useState("0")

	useEffect(() => {
		setPageNumber(id.number)
	}, [id])
	
	const [selectedTab, setSelectedTab] = useState("1")
	const renderTab = () => {
		switch (selectedTab) {
		case "1":
			return <ElementsTabs />
		case "2":
			return <EditorTabs />
		}
	}

	// Handle pages click
	const previousPage = () => {
		if (+pageNumber > 0) {
			const prevPage = +pageNumber - 1
			history.push(`/editor/pages/${prevPage}`)
		}
	}

	const nextPage = () => {
		if (+pageNumber < 20) {
			const nexPage = +pageNumber + 1
			history.push(`/editor/pages/${nexPage}`)
		}
	}

	return(
		<div className="book_page">
			<div className="avatar_page_window">
				<div className="page_window_header">
					<RoundedButton
						handleClick={previousPage}
						customStyle="outlined"
						text={t("editor.pages.back_btn")}
					/>

					{pageNumber === "0"
						?
						<p className="page_title">{t("editor.pages.cover")}</p>
						:
						<p className="page_title">{t("editor.pages.page")} {pageNumber}</p>
					}

					<RoundedButton
						handleClick={nextPage}
						customStyle="primary"
						text={t("editor.pages.next_btn")}
					/>
				</div>
				<div className="center" style={{width: "100%", height: "calc(100% - 50px)"}}>
					{loadingPage
						? <h1>Loading...</h1>
						:
						<div className="page">
							<div className="avatar_box">
								<div
									ref={pageRef}
									className="pages_container"
									style={{backgroundImage: `url("${sampleImage}")`}}
								>
									<div
										className="page_avatar_box"
										style={testObj.personOne.style}
									>
										<AvatarContainer
											pagesAvatar={avatarsFromCookie[0]}
										/>
									</div>
									<div
										className="page_avatar_box"
										style={testObj.personTwo.style}
									>
										<AvatarContainer
											pagesAvatar={avatarsFromCookie[1]}
										/>
									</div>
									{
										testObj.texts.map((text:any, i:number) => (
											<textarea
												onClick={() => handleItemFocus("text", i)}
												className="page_element"
												key="text"
												style={text.style}
												defaultValue={text.text}
											/>
										))
									}
									{/*HERE PAGES*/}
								</div>
							</div>
						</div>
					}
				</div>
			</div>
			<div className="avatar_page_menu">
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
				{renderTab()}
			</div>
		</div>
	)
}


