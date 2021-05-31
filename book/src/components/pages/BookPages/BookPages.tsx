import React, {useEffect, useState} from "react"
import "./BookPages.css"
import RoundedButton from "../../buttons/RoundedButton/RoundedButton"
import {useTranslation} from "react-i18next"
import ElementsTabs from "../../containers/Tabs/ElementsTabs/ElementsTabs"
import EditorTabs from "../../containers/Tabs/EditorTabs/EditorTabs"
import {useParams} from "react-router"
import {useHistory} from "react-router-dom"


export default function BookPages() {
	const { t } = useTranslation()
	const history = useHistory()
	const id:any = useParams()

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
		<div className="avatar_page">
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
					<div className="page">
						<div className="avatar_box">
							<div className="avatar_container">
								{/*HERE PAGES*/}
							</div>
						</div>
					</div>
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


