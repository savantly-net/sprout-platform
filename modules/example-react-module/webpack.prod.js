const path = require('path');

module.exports = {
	mode: "production",
    entry: path.join(__dirname, "src/main/browser/index.js"),
    output : {
		path : path.join(__dirname, 'build/resources/main/public/plugins/example'),
		filename : 'index.min.js',
		library : 'ExampleModuleComponent',
		libraryTarget: 'umd'
	},
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    externals: {
    	"react": "React",
        "react-dom": "ReactDOM"
    }
};