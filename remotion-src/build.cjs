const path=require('node:path');
const {createRequire}=require('node:module');
const source=process.env.REMOTION_PACKAGE_ROOT;
const dependencies=source?createRequire(path.resolve(source,'package.json')):require;
const esbuild=dependencies('esbuild');
esbuild.build({entryPoints:[path.join(__dirname,'player.jsx')],bundle:true,minify:true,format:'iife',platform:'browser',target:['es2020'],outfile:path.join(__dirname,'../assets/becoming-process.js'),nodePaths:source?[path.join(source,'node_modules')]:[],define:{'process.env.NODE_ENV':'"production"'},jsx:'automatic',legalComments:'eof',metafile:true}).then(result=>console.log('Remotion Player bundled:',Object.keys(result.metafile.outputs).join(', '))).catch(()=>process.exit(1));
