const presets = [
	[
		"@babel/env",
		{
			targets:
			{
				chrome: "80",
				chromeandroid: "78",
				firefox: "71",
				safari: "13",
				edge: "18"
            },
			useBuiltIns: "usage",
			corejs: "3.4.1",
			"targets":
			{
				"esmodules": true,
				"ie": "11"
			}
		}
	],
];

module.exports = { presets };