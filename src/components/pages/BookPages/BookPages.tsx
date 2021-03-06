import React, {useEffect, useRef, useState} from "react"
import {useTranslation} from "react-i18next"
import {useLocation, useParams} from "react-router"
import {useHistory} from "react-router-dom"
import * as htmlToImage from "html-to-image"
import {connect, useDispatch} from "react-redux"
import {handleChosenItem, handlePagesMenu} from "../../../redux/actions/editorMenuActions"
import {RootState} from "../../../redux/reducers/rootReducer"
import {changePages} from "../../../redux/actions/pagesActions"
import {changeCartItems} from "../../../redux/actions/cartActions"
import { useScreenshot } from "use-react-screenshot"

import PropagateLoader from "react-spinners/PropagateLoader"
import "./BookPages.css"

import RoundedButton from "../../buttons/RoundedButton/RoundedButton"
import AvatarContainer from "../../containers/AvatarContainer/AvatarContainer"
import PagesEditorToolbar from "../../containers/PagesEditorToolbar/PagesEditorToolbar"
import PagesMenuContainer from "../../containers/PagesMenuContainer/PagesMenuContainer"
import PagesEditorSubToolbar from "../../containers/PagesEditorSubToolbar/PagesEditorSubToolbar"
import LocalPage from "../../containers/LocalPage/LocalPage"

import {ICartItem} from "../../../utils/interface"
import {postNewBook, showBooksPagesLoading, updateBook} from "../../../redux/actions/serverBooksActions"
import {getBookLocalId, getUserLocalId} from "../../../utils/localId"
import SavingContainer from "../../containers/SavingContainer/SavingContainer"
import LoadingBookPage from "../../containers/LoadingBookPage/LoadingBookPage"

interface CustomProps {
	chosenItem?: any,
	pages?: any,
	avatars?: any,
	pagesImages?: any,
	pagesImagesLoading?: boolean,
	cartItems?: any
}

function BookPages(
	{ pages, avatars, pagesImages, pagesImagesLoading, cartItems}:CustomProps) {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const history = useHistory()
	const id:any = useParams()
	const location = useLocation()

	const url = "http://localhost:5000/"

	useEffect(() => {
		if (!getBookLocalId()) {
			const userId = getUserLocalId()
			if (userId) {
				dispatch(postNewBook(userId, {
					0: ""
				}))
			} else {
				console.log("Something with userId")
			}
		}
		// eslint-disable-next-line
	}, [])

	const [loadingPage, setLoadingPage] = useState(true)

	// Current page
	const [currentPage, setCurrentPage] = useState("")

	// Set page data
	const [pageData, setPageData] = useState<any>({})

	// Take page from url and save to state
	useEffect(() => {
		const pageNumber = +window.location.pathname.slice(14, +window.location.pathname.length)
		setCurrentPage(pageNumber.toString())
		setPageData(pages[pageNumber])
		if (loadingPage && pages[pageNumber] && pages[pageNumber].background) {
			setLoadingPage(false)
		}
		// eslint-disable-next-line
	}, [location, pages])

	// Change font size
	const changeFontSize = (style:any) => {
		const changedStyles = {...style}
		const fontSize = containerWidth / +changedStyles.fontSize
		changedStyles.fontSize = `${fontSize}px`
		return changedStyles
	}

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

	const [pageNumber, setPageNumber] = useState("0")

	useEffect(() => {
		setPageNumber(id.number)
	}, [id])

	// Handle pages click
	const previousPage = async () => {
		if (+pageNumber > 0) {
			let domElement = document.getElementById("my-node")
			dispatch(showBooksPagesLoading())
			let img = ""
			if (domElement) {
				await htmlToImage.toPng(domElement)
					.then(function (dataUrl) {
						if (dataUrl) {
							img = dataUrl
						}
					})
					.catch(function (error) {
						console.error("oops, something went wrong!", error)
						return "error"
					})
			}
			const objCopy = {...pagesImages}
			dispatch(updateBook(pageNumber, img))
			objCopy[pageNumber] = img
			const prevPage = +pageNumber - 1
			history.push(`/editor/pages/${prevPage}`)
		}
	}

	const nextPage = async () => {
		let domElement = document.getElementById("my-node")
		dispatch(showBooksPagesLoading())
		let img = ""
		if (domElement) {
			await htmlToImage.toPng(domElement)
				.then(function (dataUrl) {
					if (dataUrl) {
						img = dataUrl
					}
				})
				.catch(function (error) {
					console.error("oops, something went wrong!", error)
					return "error"
				})
		}
		const objCopy = {...pagesImages}
		dispatch(updateBook(pageNumber, img))
		objCopy[pageNumber] = img
		if (+pageNumber < 20) {
			const nexPage = +pageNumber + 1
			if (pageNumber === "0") {
				dispatch(handlePagesMenu("background", ["image", "text"], "image"))
			}
			history.push(`/editor/pages/${nexPage}`)
		} else if (pageNumber === "20") {
			const newCartItem:ICartItem = {
				itemType: "book",
				name: t("cartItems.book.name", {
					personOne: avatars[0].avatarName,
					personTwo: avatars[1].avatarName}),
				description: t("cartItems.book.description"),
				price: 39.99,
				id: window.localStorage.getItem("bookId") || ""
			}
			const newCartItemsArray = [...cartItems, newCartItem]
			dispatch(changeCartItems(newCartItemsArray))
			history.push("/checkout")
		}
	}

	const handleClickToPreview = async () => {
		let domElement = document.getElementById("my-node")
		dispatch(showBooksPagesLoading())
		let img = ""
		if (domElement) {
			await htmlToImage.toPng(domElement)
				.then(function (dataUrl) {
					if (dataUrl) {
						img = dataUrl
					}
				})
				.catch(function (error) {
					console.error("oops, something went wrong!", error)
					return "error"
				})
		}
		const objCopy = {...pagesImages}
		dispatch(updateBook(pageNumber, img))
		objCopy[pageNumber] = img
		const newCartItem:ICartItem = {
			itemType: "book",
			name: t("cartItems.book.name", {
				personOne: avatars[0].avatarName,
				personTwo: avatars[1].avatarName}),
			description: t("cartItems.book.description"),
			price: 39.99,
			id: window.localStorage.getItem("bookId") || ""
		}
		dispatch(changeCartItems([newCartItem]))
		history.push("/checkout")
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

	const getImageUrl = (person:number) => {
		if (person === 0) {
			return `${url}${pageData.pageItem.style.personOne.body.person.firstPerson}`
		} else {
			return `${url}${pageData.pageItem.style.personTwo.body.person.secondPerson}`
		}
	}

	const [local, setLocal] = useState(false)

	// Show loading when background changed
	const [backgroundChangeLoading, setBackgroundChangeLoading] = useState(false)
	const showBackgroundChangeLoading = () => {
		setBackgroundChangeLoading(true)
		setTimeout(() => {
			setBackgroundChangeLoading(false)
		}, 200)
	}

	// Set is user came from edit page from checkout
	const [editPage, setEditPage] = useState(false)

	useEffect(() => {
		if (location.search === "?edit") {
			setEditPage(true)
		}
	}, [location])

	return(
		<div className="book_page">
			<div className="avatar_page_window">
				{editPage
					?
					<div className="center" style={{
						marginTop: "20px",
						marginBottom: "-20px",
						position: "relative",
						zIndex: 1000
					}}>
						<RoundedButton
							handleClick={handleClickToPreview}
							customStyle="outlined"
							text={t("editor.pages.btn_save_and_go_to_checkout")}
							disabled={pagesImagesLoading}
						/>
					</div>
					:
					<div className="page_window_header">
						<RoundedButton
							handleClick={previousPage}
							customStyle="outlined"
							text={t("editor.pages.back_btn")}
							disabled={pagesImagesLoading}
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
							disabled={pagesImagesLoading}
							text={pageNumber === "20"
								? t("editor.pages.save_btn")
								: t("editor.pages.next_btn")}
						/>
					</div>
				}
				<div className="center" style={{width: "100%", height: "calc(100% - 50px)"}}>
					{loadingPage
						? <PropagateLoader />
						:
						<div className="page">
							{local
								?
								<LocalPage />
								:
								<div>
									{pagesImagesLoading
										? <SavingContainer /> : null}
									{backgroundChangeLoading
										? <LoadingBookPage /> : null}
									<div className="avatar_box">
										<div
											ref={pageRef}
											id="my-node"
											className="pages_container"
											style={{backgroundImage:
													`url("${pageData.background}")`
											}}
										>
											{pageData.pageItem.type === "text"
												? null
												:
												<>
													<div
														style={pageData.pageItem.style.personOne.body.style}
													>
														<img
															src={getImageUrl(0)}
															style={{width: "100%"}} alt="personOne"/>
													</div>
													<div
														style={pageData.pageItem.style.personTwo.body.style}
													>
														<img
															src={getImageUrl(1)}
															style={{width: "100%"}} alt="personTwo"/>
													</div>
													<div
														style={pageData.pageItem.style.personOne.style}
													>
														<AvatarContainer
															pagesAvatar={avatars[0]}
															existingIndex={0}
														/>
													</div>
													<div
														style={pageData.pageItem.style.personTwo.style}
													>
														<AvatarContainer
															pagesAvatar={avatars[1]}
															existingIndex={1}
														/>
													</div>
												</>
											}
											{
												pageData.pageItem.style.texts.map((text:any, i:number) => (
													<textarea
														onChange={(value:any) => handleTextChange(value, i)}
														onClick={() => handleItemFocus(
															"text",
															i.toString())}
														className="page_element"
														key={`${currentPage}${i}${pageData.pageItem._id}`}
														style={changeFontSize(text.style)}
														defaultValue={text.text}
													/>
												))
											}
										</div>
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
				<PagesMenuContainer showBackgroundChangeLoading={showBackgroundChangeLoading} />
			</div>
		</div>
	)
}

const mapStateToProps = (state:RootState) => {
	return {
		chosenItem: state.editorMenu.chosenItem,
		pages: state.pages.pages,
		avatars: state.avatars.avatars,
		pagesImagesLoading: state.serverBook.loading,
		cartItems: state.cart.items
	}
}

export default connect(mapStateToProps, null)(BookPages)

