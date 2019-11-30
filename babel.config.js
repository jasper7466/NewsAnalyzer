const presets = [
	[
		"@babel/env",
		{
			useBuiltIns: "usage",
			corejs: "3.4.1",
			"targets":
			{
				"esmodules": true,
				"ie": "11"
			}
		},
	],
];

module.exports = { presets };