import React from "react"
import "./BookPages.css"
import RoundedButton from "../../buttons/RoundedButton/RoundedButton"
import {useTranslation} from "react-i18next"
import PagesEditorToolbar from "../../containers/PagesEditorToolbar/PagesEditorToolbar"
import PagesEditorSubToolbar from "../../containers/PagesEditorSubToolbar/PagesEditorSubToolbar"
import PagesDropdownMenu from "../../dropdown/PagesDropdownMenu/PagesDropdownMenu"

export default function BookPages() {
	const { t } = useTranslation()


	return(
		<div className="avatar_page">
			<div className="avatar_page_window">
				<div className="page_window_header">
					<RoundedButton customStyle="outlined" text={t("editor.pages.back_btn")} />
					<p>{t("editor.pages.page")} 1</p>
					<RoundedButton customStyle="primary" text={t("editor.pages.next_btn")} />
				</div>
				<div className="center" style={{width: "100%", height: "calc(100% - 50px)"}}>
					<div className="page" />
				</div>
			</div>
			<div className="avatar_page_menu">
				<PagesDropdownMenu />
				<PagesEditorToolbar />
				<PagesEditorSubToolbar />
			</div>
		</div>
	)
}

