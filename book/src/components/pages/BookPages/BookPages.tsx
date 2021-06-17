import React, {useEffect, useRef, useState} from "react"
import "./BookPages.css"
import RoundedButton from "../../buttons/RoundedButton/RoundedButton"
import {useTranslation} from "react-i18next"
import {useParams} from "react-router"
import {useHistory} from "react-router-dom"
import {getCookie} from "../../../utils/cookie"
import AvatarContainer from "../../containers/AvatarContainer/AvatarContainer"
import {connect, useDispatch} from "react-redux"
import {handleChosenItem, handlePagesMenu} from "../../../redux/actions/editorMenuActions"
import {RootState} from "../../../redux/reducers/rootReducer"
import {changeAvatar} from "../../../redux/actions/avatarsActions"
import PagesEditorToolbar from "../../containers/PagesEditorToolbar/PagesEditorToolbar"
import PagesMenuContainer from "../../containers/PagesMenuContainer/PagesMenuContainer"
import PagesEditorSubToolbar from "../../containers/PagesEditorSubToolbar/PagesEditorSubToolbar"
import {changePages} from "../../../redux/actions/pagesActions"
import LocalPage from "../../containers/LocalPage/LocalPage"

interface CustomProps {
	chosenItem?: any,
	pages?: any,
	avatars?: any
}

function BookPages({chosenItem, pages, avatars}:CustomProps) {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const history = useHistory()
	const id:any = useParams()

	const url = "http://localhost:5000/"

	const [avatarsFromCookie, setAvatarsFromCookie] = useState([])

	const [loadingPage, setLoadingPage] = useState(true)

	// Current page
	const [currentPage, setCurrentPage] = useState("")

	// Set page data
	const [pageData, setPageData] = useState<any>({})

	// Take page from url and save to state
	useEffect(() => {
		setCurrentPage(window.location.pathname.slice(14, +window.location.pathname.length))
		setPageData(pages[window.location.pathname.slice(14, +window.location.pathname.length)])
	}, [window.location.pathname])

	useEffect(() => {
		const jsonStr = getCookie("mycookie")
		console.log(jsonStr)
		const arr = JSON.parse(jsonStr)
		dispatch(changeAvatar(arr))
		setAvatarsFromCookie(arr)
	}, [])

	// Change font size
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

	const [pageNumber, setPageNumber] = useState("0")

	useEffect(() => {
		setPageNumber(id.number)
	}, [id])


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

	const handleItemFocus = (name:string, i:string) => {
		dispatch(handleChosenItem(
			{name: name, index: i}
		))
	}

	const handleTextChange = (e:any, i:number) => {
		const pagesCopy:any = [...pages]
		pagesCopy[currentPage].pageItem.style.texts[i].text = e.target.value
		dispatch(changePages(pagesCopy))
	}

	// Handle menu click
	const handleMenuClick = (menuItem:string) => {
		dispatch(handlePagesMenu(menuItem, [], ""))
	}

	const getImageUrl = (person:number) => {
		if (person === 0) {
			return `${url}${pageData.pageItem.style.personOne.body.person.firstPerson}`
		} else {
			return `${url}${pageData.pageItem.style.personOne.body.person.secondPerson}`
		}
	}

	const [local, setLocal] = useState(false)

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
							{local
								?
								<LocalPage />
								:
								<div className="avatar_box">
									<div
										ref={pageRef}
										className="pages_container"
										style={{backgroundImage:
												`url("${url}${pageData.pageItem.types[0].img}")`
										}}
									>
										<div
											style={pageData.pageItem.style.personOne.body.style}
										>
											<img src={getImageUrl(0)} style={{width: "100%"}} alt="personOne"/>
										</div>
										<div
											style={pageData.pageItem.style.personTwo.body.style}
										>
											<img src={getImageUrl(1)} style={{width: "100%"}} alt="personTwo"/>
										</div>
										<div
											style={pageData.pageItem.style.personOne.style}
										>
											<AvatarContainer
												pagesAvatar={avatars[0]}
											/>
										</div>
										<div
											style={pageData.pageItem.style.personTwo.style}
										>
											<AvatarContainer
												pagesAvatar={avatars[1]}
											/>
										</div>
										{
											pageData.pageItem.style.texts.map((text:any, i:number) => (
												<textarea
													onChange={(value:any) => handleTextChange(value, i)}
													onClick={() => handleItemFocus(
														"text",
														i.toString())}
													className="page_element"
													key={`${currentPage}${text}${i}`}
													style={changeFontSize(text.style)}
													defaultValue={text.text}
												/>
											))
										}
									</div>
								</div>
							}
						</div>
					}
				</div>
			</div>
			<div className="avatar_page_menu" >
				<PagesEditorToolbar />
				<PagesEditorSubToolbar />
				<PagesMenuContainer />
			</div>
		</div>
	)
}

const mapStateToProps = (state:RootState) => {
	return {
		chosenItem: state.editorMenu.chosenItem,
		pages: state.pages.pages,
		avatars: state.avatars.avatars
	}
}

export default connect(mapStateToProps, null)(BookPages)

