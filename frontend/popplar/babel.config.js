module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
		'module:react-native-dotenv',
			{
				"moduleName": "@env",
				"path": ".env",
				"blocklist": null,
				"allowlist": null,
				"blacklist": null,
				"whitelist": null,
				"safe": false,
				"allowUndefined": true,
				"verbose": false
			}
	  ]
		
  ],
};
