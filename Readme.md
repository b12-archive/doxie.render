[![Coveralls – test coverage
](https://img.shields.io/coveralls/studio-b12/doxie.render.svg?style=flat-square)
](https://coveralls.io/r/studio-b12/doxie.render)
 [![Travis – build status
](https://img.shields.io/travis/studio-b12/doxie.render/master.svg?style=flat-square)
](https://travis-ci.org/studio-b12/doxie.render)
 [![David – status of dependencies
](https://img.shields.io/david/studio-b12/doxie.render.svg?style=flat-square)
](https://david-dm.org/studio-b12/doxie.render)
 [![Stability: unstable
](https://img.shields.io/badge/stability-unstable-yellowgreen.svg?style=flat-square)
](…)
 [![Code style: airbnb
](https://img.shields.io/badge/code%20style-airbnb-blue.svg?style=flat-square)
](https://github.com/airbnb/javascript)




<h1                                                                 id="/"><pre>
doxie --render
</pre></h1>


A plugin for *[doxie][]*.  
**Render a comment to markdown, HTML, or any other format.**

[doxie]:  https://github.com/studio-b12/doxie




<p align="center"><a
  title="Graphic by the great Justin Mezzell"
  href="http://justinmezzell.tumblr.com/post/89957156723"
  >
  <br/>
  <br/>
  <img
    src="Readme/Glasses.gif"
    width="400"
    height="300"
  />
  <br/>
  <br/>
</a></p>




CLI Usage
---------

**Note:** Don’t panic. `doxie --render` is a flexible, low-level plugin. We’re working on higher-level plugins which you can drop into your project without fiddling with configuration.

`doxie --render` is a plugin for the command-line tool *[doxie][]*. Most plugins are designed for *[dox][]* data. Install all three if you haven’t already:

```sh
$ npm install --global dox doxie doxie.render
```


Create the module `.doxie.render.js` in your project directory. Export a [template function][] from it. Then pass the option `--render` to *doxie* to put it in the plugin pipeline.

I’m including [`--output`][] to print the results of `doxie --render`.

```sh
$ echo '
module.exports = function (comment) {
  return comment.data.isPrivate ? "Sshhh…\n" : "Boom!\n"
};' > .doxie.render.js

$ dox < my.js | doxie --render --output
Sshhh…
Boom!
Boom!
```


If you want to put the [template function][] in another file, no problem:

```sh
$ doxie   --render build/my-template-function.js   --output
```


[dox]:                http://npm.im/dox
[`--output`]:         http://npm.im/doxie.output
[template function]:  #/template-function




Programmatic usage
------------------

`doxie.render` can be used directly with *[doxie-core][]* – the backend of *[doxie][]*. Install both if you haven’t already:

```sh
$ npm install doxie-core doxie.render
```


Pass the [template function][] to `doxie.render` to configure the plugin:

```js
const doxie = require('doxie-core');
const render = require('doxie.render');
const output = require('doxie.output');

const myTemplate = ({data}) => `${data.isPrivate ? 'Sshhh…' : 'Boom!'}\n`;
const myDoxData = [{isPrivate: true}, {isPrivate: false}, {isPrivate: false}];

doxie([
  render(myTemplate),
  output(),
])(myDoxData).output;
//» "Sshhh…\nBoom!\nBoom!\n"
```


[doxie-core]:  http://npm.im/doxie-core




<a                                                  id="/template-function"></a>
The template function
-------------------

*Work in progress…*




License
-------

[MIT][] © [Studio B12 GmbH][]

[MIT]:              ./License.md
[Studio B12 GmbH]:  http://studio-b12.de
