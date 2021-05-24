module.exports = {
	"extends": "react-app",
	"rules" : {
		"react/prop-types": "off",
		"no-use-before-define": "off",
		"no-mixed-spaces-and-tabs": "off",
		"@typescript-eslint/no-explicit-any": "off",
		"no-unused-vars": "off",
		"@typescript-eslint/no-unused-vars": "off",
		"@typescript-eslint/no-use-before-define": ["error", {"variables": false}],
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"indent": [
			"error",
			"tab"
		],
		"semi": [
			"error",
			"never"
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"double"
		],
		"max-len": [
			"error",
			{
				"code": 100
			}
		],
		"camelcase": [
			"error",
			{
				"properties": "always"
			}
		]
	}
}
