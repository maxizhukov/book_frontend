import React, {useEffect, useState} from "react"
import "./EditorInfo.css"
import {Link, useHistory} from "react-router-dom"
import RoundedButton from "../../buttons/RoundedButton/RoundedButton"
import {useTranslation} from "react-i18next"
import Input from "../../inputs/Input"
import {useFormik} from "formik"
import * as Yup from "yup"
import {RootState} from "../../../redux/reducers/rootReducer"
import {connect, useDispatch} from "react-redux"
import {changeAvatar} from "../../../redux/actions/avatarsActions"

interface CustomProps {
	avatars?: any
}

function EditorInfo({avatars}:CustomProps) {
	const avatarIndex:number = +window.location.search.slice(1,2)
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const history = useHistory()

	//Initialize form
	useEffect(() => {
		if (avatars[avatarIndex].avatarName && avatars[avatarIndex].avatarGender) {
			formik.values.name = avatars[avatarIndex].avatarName
			setGender(avatars[avatarIndex].avatarGender)
		}
		//Need to disable it, because eslint says, that I need to add
		//all dependencies from formik, but we need to update, when company
		// state is updated
		// eslint-disable-next-line
	}, [avatarIndex])

	// Formik values
	const formik = useFormik({
		initialValues: {
			name: ""
		},
		validationSchema: Yup.object().shape({
			name: Yup.string().required("")
		}),
		// handle form submitting
		onSubmit: () => console.log("CLICK"),
	})
	const [gender, setGender] = useState("male")

	// Handle Next button click
	const handleNextButton = () => {
		if (!formik.values.name.trim().length) {
			setInputError(t("warnings.name_required"))
		} else {
			const avatarCopy = [...avatars]
			avatarCopy[avatarIndex].avatarName =
				formik.values.name.charAt(0).toUpperCase()
				+ formik.values.name.toLowerCase().slice(1)
			avatarCopy[avatarIndex].avatarGender = gender
			dispatch(changeAvatar(avatarCopy))
			history.push(`/editor/avatar?${avatarIndex}`)
		}
	}

	// Show input error
	const [inputError, setInputError] = useState("")

	return(
		<>
			<div className="page_window_header">
				<Link to="/editor">
					<RoundedButton
						customStyle="outlined"
						text={t("editor.avatar.window_back_btn")}
					/>
				</Link>
				<RoundedButton
					handleClick={handleNextButton}
					customStyle="primary"
					text={t("editor.avatar.window_next_btn")}
				/>
			</div>
			<div className="info_main">
				<div style={{maxWidth: "500px", position: "relative"}}>
					<Input
						type="text"
						labelHtml="name"
						id="name"
						label={t("editor.avatar.character_name_label")}
						name="name"
						placeholder="Max"
						value={formik.values.name}
						handleChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					{inputError.length ?
						<p className="input_error">
							{inputError}
						</p>
						: null
					}
				</div>
				<div style={{maxWidth: "500px", marginTop: "25px"}}>
					<div className="info_tabs_radio_container">
						<div
							onClick={() => setGender("male")}
							className={gender === "male"
								? "info_tabs_radio_item center selected"
								: "info_tabs_radio_item center"
							}>
							{t("editor.avatar.male")}
						</div>
						<div
							onClick={() => setGender("female")}
							className={gender === "female"
								? "info_tabs_radio_item center selected"
								: "info_tabs_radio_item center"
							}>
							{t("editor.avatar.female")}
						</div>
						<div
							onClick={() => setGender("transgender")}
							className={gender === "transgender"
								? "info_tabs_radio_item center selected"
								: "info_tabs_radio_item center"
							}>
							{t("editor.avatar.transgender")}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

const mapStateToProps = (state:RootState) => {
	return {
		avatars: state.avatars.avatars
	}
}

export default connect(mapStateToProps, null)(EditorInfo)
