export function rewriteCurrency(amount:number, currencyCode:string) {
	return Intl.NumberFormat("de-AT",
		{ style: "currency", currency: currencyCode }).format(amount)
}
