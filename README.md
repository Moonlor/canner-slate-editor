# canner-slate-editor [![NPM version][npm-image]][npm-url]  [![Dependency Status][daviddm-image]][daviddm-url]
> Another rich text editor using [Slate framework](https://docs.slatejs.org).

<img src="./docs/demo.png" height="600px"/>

## Installation

```sh
$ npm install --save canner-slate-editor
```

## Features

- [x] Support full screen edit mode
- [x] Support inline toolbar
- [x] Support inline sidebar
- [x] Support markdown syntax, support list: https://github.com/Canner/slate-md-editor#feature-toc

## Usage

```js
// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import {Value} from 'slate';

import CannerEditor from 'canner-slate-editor';

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'A line of text in a paragraph.',
              }
            ],
          },
        ],
      },
    ],
  },
});

class DemoEditor extends React.Component<*, {value: Value}> {
  // Set the initial state when the app is first constructed.
  state = {
    value: initialValue
  }


  render() {
    const {value} = this.state;
    const onChange = ({value}) => this.setState({value});

    return (
      <div style={{margin: '20px'}}>
        <CannerEditor
          value={value}
          onChange={onChange}
          />
      </div>
    );
  }
}

ReactDOM.render(
  <DemoEditor/>
, (document: any).getElementById('root'));

```

see https://github.com/Canner/canner-slate-editor/blob/master/docs/index.js

## Start example server

```
npm start
```

## License

Apache 2.0 [Canner](https://www.canner.io)


[npm-image]: https://badge.fury.io/js/canner-slate-editor.svg
[npm-url]: https://npmjs.org/package/canner-slate-editor
[travis-image]: https://travis-ci.org/Canner/canner-slate-editor.svg?branch=master
[travis-url]: https://travis-ci.org/Canner/canner-slate-editor
[daviddm-image]: https://david-dm.org/Canner/canner-slate-editor.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/Canner/canner-slate-editor
