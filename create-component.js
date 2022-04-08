const fs = require('fs');
const path = require('path');
const { argv, exit } = require('process');

// FUNCTIONS
const toPascalCase = originalText => 
  originalText.replace(/(^\w|-\w)/g, text => text.replace(/-/,"").toUpperCase());

// Please note this is a fairly dangerous function and open to XSS,
// please be sure your template files & variables haven't been compromised!
const interpolateBuffer = (buffer, args) => {
	const names = Object.keys(args);
	const vals = Object.values(args);
	return new Function(...names, `return \`${buffer}\`;`)(...vals);
}

const nameFromPath = path => path.split('/').pop();

// PATHS & NAMES
//Do some proper error handling here to check for args
const rootPath = argv[2] || exit(1);
const componentPath = argv[3] || exit(1);

// const projectPath = path.resolve(rootPath, 'src/app');
const templatePath = path.resolve(__dirname, 'templates');
const componentLocation = path.resolve(rootPath, componentPath);

const componentName = nameFromPath(componentPath);
const pascalComponentName = toPascalCase(componentName);


const templateFiles = {
	componentTemplate: 'container.html',
	componentClass: 'container.ts',
};

var buffer = fs.readFileSync(path.resolve(templatePath, templateFiles.componentTemplate));
fs.writeFileSync(path.resolve(componentLocation, componentName + '-' + templateFiles.componentTemplate),
  interpolateBuffer(buffer, { componentName }));

buffer = fs.readFileSync(path.resolve(templatePath, templateFiles.componentClass));
fs.writeFileSync(path.resolve(componentLocation, componentName + '-' + templateFiles.componentClass),
  interpolateBuffer(buffer, { componentName, pascalComponentName }));
