export function createCookie(name:string, value:any, days:number) {
	let expires
	if (days) {
		let date = new Date()
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
		expires = "; expires=" + date.toUTCString()
	}
	else {
		expires = ""
	}
	console.log("NOW: ",  name + "=" + value + expires + "; path=/")
	document.cookie = name + "=" + value + expires + "; path=/"
}

export function getCookie(cName:string) {
	if (document.cookie.length > 0) {
		let cStart = document.cookie.indexOf(cName + "=")
		if (cStart !== -1) {
			cStart = cStart + cName.length + 1
			let cEnd = document.cookie.indexOf(";" + cName)
			if (cEnd === -1) {
				cEnd = document.cookie.length
			}
			return unescape(document.cookie.substring(cStart, cEnd))
		}
	}
	return ""
}
