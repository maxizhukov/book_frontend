// USER
export function getUserLocalId () {
	const idString = window.localStorage.getItem("userId")
	if (idString) {
		const idEnd = idString.indexOf(";")
		return idString.substring(0, idEnd)
	} else {
		return null
	}
}

// BOOK
export function setBookLocalId (id:string) {
	let values:string[] = []
	values.push(id)
	const oneDay = new Date()
	oneDay.setHours(oneDay.getHours() + 240)
	values.push(oneDay.toString())
	window.localStorage.setItem("bookId", values.join(";"))
}

export function getBookLocalId() {
	const idString = window.localStorage.getItem("bookId")
	if (idString) {
		const idEnd = idString.indexOf(";")
		return idString.substring(0, idEnd)
	} else {
		return null
	}
}
