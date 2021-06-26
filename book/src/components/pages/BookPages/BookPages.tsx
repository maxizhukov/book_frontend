import React, {useEffect, useRef, useState} from "react"
import {useTranslation} from "react-i18next"
import {useLocation, useParams} from "react-router"
import {useHistory} from "react-router-dom"
import * as htmlToImage from "html-to-image"
import {connect, useDispatch} from "react-redux"
import {handleChosenItem} from "../../../redux/actions/editorMenuActions"
import {RootState} from "../../../redux/reducers/rootReducer"
import {changePages, changePagesImages, showPagesImagesLoading} from "../../../redux/actions/pagesActions"
import {changeCartItems} from "../../../redux/actions/cartActions"

import "./BookPages.css"

import RoundedButton from "../../buttons/RoundedButton/RoundedButton"
import AvatarContainer from "../../containers/AvatarContainer/AvatarContainer"
import PagesEditorToolbar from "../../containers/PagesEditorToolbar/PagesEditorToolbar"
import PagesMenuContainer from "../../containers/PagesMenuContainer/PagesMenuContainer"
import PagesEditorSubToolbar from "../../containers/PagesEditorSubToolbar/PagesEditorSubToolbar"
import LocalPage from "../../containers/LocalPage/LocalPage"

import {ICartItem} from "../../../utils/interface"

interface CustomProps {
	chosenItem?: any,
	pages?: any,
	avatars?: any,
	pagesImages?: any,
	pagesImagesLoading?: boolean,
	cartItems?: any
}

function BookPages(
	{chosenItem, pages, avatars, pagesImages, pagesImagesLoading, cartItems}:CustomProps) {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const history = useHistory()
	const id:any = useParams()
	const location = useLocation()

	const url = "http://localhost:5000/"

	/*NEED FOR TRANSFORM FOR FORM DATA POST*/
	/*const DataURIToBlob = (dataURI: string) => {
		const splitDataURI = dataURI.split(",")
		const byteString = splitDataURI[0].indexOf("base64") >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
		const mimeString = splitDataURI[0].split(":")[1].split(";")[0]

		const ia = new Uint8Array(byteString.length)
		for (let i = 0; i < byteString.length; i++)
			ia[i] = byteString.charCodeAt(i)

		return new Blob([ia], { type: mimeString })
	}
*/
	/*const update = async (data:any) => {
		const file = DataURIToBlob(data)
		let bodyFormData = new FormData()
		bodyFormData.append("myImage", file)
		bodyFormData.append("name", "preview")
		const config = {
			headers: { "Content-Type": "multipart/form-data" }
		}
		try {
			const response = await axios.put(
				"http://localhost:5000/api/pages/60ce38a84de18f101bf2d8b0",
				bodyFormData,
				config)
			console.log(response)
		} catch (e) {
			console.log(e)
		}
	}
*/
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
		// eslint-disable-next-line
	}, [location])

	// Change font size
	const changeFontSize = (style:any) => {
		const changedStyles = {...style}
		const fontSize = containerWidth / +changedStyles.fontSize
		changedStyles.fontSize = `${fontSize}px`
		return changedStyles
	}

	// Show loading till page will not rendered
	useEffect(() => {
		if (loadingPage && pageData.background) {
			setLoadingPage(false)
		}
		// eslint-disable-next-line
	}, [pageData.background])


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
		let domElement = document.getElementById("my-node")
		dispatch(showPagesImagesLoading())
		let img = ""
		if (+pageNumber > 0) {
			const objCopy = {...pagesImages}
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
			objCopy[pageNumber] = img
			dispatch(changePagesImages(objCopy))
			const prevPage = +pageNumber - 1
			history.push(`/editor/pages/${prevPage}`)
		}
	}

	const nextPage = async () => {
		let domElement = document.getElementById("my-node")
		dispatch(showPagesImagesLoading())
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
		objCopy[pageNumber] = img
		dispatch(changePagesImages(objCopy))
		if (+pageNumber < 20) {
			const nexPage = +pageNumber + 1
			history.push(`/editor/pages/${nexPage}`)
		} else if (pageNumber === "20") {
			const newCartItem:ICartItem = {
				itemType: "book",
				previewImage: pagesImages[0],
				name: t("cartItems.book.name", {
					personOne: avatars[0].avatarName,
					personTwo: avatars[1].avatarName}),
				description: t("cartItems.book.description"),
				price: 39.99
			}
			const newCartItemsArray = [...cartItems, newCartItem]
			dispatch(changeCartItems(newCartItemsArray))
			history.push("/checkout")
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

	const getImageUrl = (person:number) => {
		if (person === 0) {
			return `${url}${pageData.pageItem.style.personOne.body.person.firstPerson}`
		} else {
			return `${url}${pageData.pageItem.style.personTwo.body.person.secondPerson}`
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
						text={pageNumber === "20"
							? t("editor.pages.save_btn")
							: t("editor.pages.next_btn")}
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
								<div>
									{pagesImagesLoading
										? <p className="book_saving">Saving</p> : null}
									<div className="avatar_box">
										<div
											id="my-node"
											ref={pageRef}
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
				<PagesMenuContainer />
			</div>
		</div>
	)
}

const mapStateToProps = (state:RootState) => {
	return {
		chosenItem: state.editorMenu.chosenItem,
		pages: state.pages.pages,
		avatars: state.avatars.avatars,
		pagesImages: state.pages.pagesImages,
		pagesImagesLoading: state.pages.pagesImagesLoading,
		cartItems: state.cart.items
	}
}

export default connect(mapStateToProps, null)(BookPages)

