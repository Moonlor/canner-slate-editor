// @flow
import * as React from "react";
import { Editor } from "slate-react";
import type {Value, Change} from 'slate';
import styled from 'styled-components';
import Toolbar from './menuToolbar';
import toolbar from 'slate-toolbar';
import sidebar from 'slate-sidebar';
import {MarkdownPlugin} from 'slate-md-editor';
import {BLOCKS} from '@canner/slate-constant';

import Blockquote, {BlockquotePlugin} from '@canner/slate-icon-blockquote';
import Bold, {BoldPlugin} from '@canner/slate-icon-bold';
import Code, {CodePlugin} from '@canner/slate-icon-code';
import Clean from '@canner/slate-icon-clean';
import {CodeBlockPlugin} from '@canner/slate-icon-codeblock';
import {TablePlugin} from '@canner/slate-icon-table';
import {FontBgColorPlugin} from '@canner/slate-icon-fontbgcolor';
import {FontColorPlugin} from '@canner/slate-icon-fontcolor';
import {Header1, Header2, HeaderOnePlugin, HeaderTwoPlugin, HeaderThreePlugin} from '@canner/slate-icon-header';
import Hr, {HrPlugin} from '@canner/slate-icon-hr';
import Italic, {ItalicPlugin} from '@canner/slate-icon-italic';
import {LinkPlugin} from '@canner/slate-icon-link';
import {OlList, UlList, ListPlugin} from '@canner/slate-icon-list';
import StrikeThrough, {StrikeThroughPlugin} from '@canner/slate-icon-strikethrough';
import Underline, {UnderlinePlugin} from '@canner/slate-icon-underline';
import {VideoPlugin} from '@canner/slate-icon-video';
import {ParagraphPlugin} from '@canner/slate-icon-shared';

import EditList from 'slate-edit-list';
import EditBlockquote from 'slate-edit-blockquote';

import EditPrism from 'slate-prism'
import EditCode from 'slate-edit-code'
import TrailingBlock from 'slate-trailing-block'

import {TerminalPlugin} from './components/terminal/terminalIcon';
import {CloudwarePlugin} from './components/cloudware/cloudwareIcon';
import {ImagePlugin} from './components/image/imageIcon';


import "prismjs/themes/prism.css";

// default value
import {DEFAULT as DEFAULTLIST} from '@canner/slate-helper-block-list';
import {DEFAULT as DEFAULTBLOCKQUOTE} from '@canner/slate-helper-block-quote';

import "github-markdown-css";

const plugins = [
  MarkdownPlugin(),
  EditPrism({
    onlyIn: node => node.type === 'code_block',
    getSyntax: node => node.data.get('syntax')
  }),
  EditCode({
    onlyIn: node => node.type === 'code_block'
  }),
  TrailingBlock(),
  EditList(DEFAULTLIST),
  EditBlockquote(DEFAULTBLOCKQUOTE),
  ParagraphPlugin(),
  BlockquotePlugin(),
  BoldPlugin(),
  CodePlugin(),
  CodeBlockPlugin(),
  FontBgColorPlugin({
    backgroundColor: (mark) => mark.data.get('color').color
  }),
  FontColorPlugin({
    color: (mark) => mark.data.get('color').color
  }),
  ItalicPlugin(),
  StrikeThroughPlugin(),
  UnderlinePlugin(),
  HeaderOnePlugin(),
  HeaderTwoPlugin(),
  HeaderThreePlugin(),
  TablePlugin(),
  HrPlugin(),
  LinkPlugin(),
  ListPlugin(),
  VideoPlugin(),
  TerminalPlugin(),
  CloudwarePlugin(),
  ImagePlugin()
];

type Props = {
  value: Value,
  onChange: (change: Change) => void,
  serviceConfig?: any,
  readOnly: any,
  currentElement: any
}

type State = {
  isFull: boolean
}

const Container = styled.div`
  ${props => props.isFull && (`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1000
  `)}
  background-color: #FFF;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 1px 1px rgba(0,0,0,0.16);
  overflow-y: ${props => props.isFull ? 'scroll' : 'initial'};
`

const EditorContainer = styled.div`
  padding: 25px;
  margin-top: ${props => props.isFull ? '60px' : '10px'};
`

const FixedToolbar = styled.div`
  ${props => props.isSticky && (`
    position: fixed;
    top: 10px;
    padding-right: 40px;
  `)}
  z-index: 10;
  width: ${props => {
    return props.isSticky ? '100%':'100%'
  }
}
  margin-bottom: 30px;
`

const toolbarOptions = {
  icons: [
    Bold,
    Italic,
    StrikeThrough,
    Underline,
    Code,
    Clean
  ],
  position: 'top',
  disabledTypes: [
    BLOCKS.CODE,
    BLOCKS.CODE_LINE,
    BLOCKS.HEADING_1,
    BLOCKS.HEADING_2,
    BLOCKS.HEADING_3,
    BLOCKS.HEADING_4,
    BLOCKS.HEADING_5,
    BLOCKS.HEADING_6
  ]
}

const sidebarOptions = {
  icons: [
    {
      icon: OlList,
      title: "Order List"
    },
    {
      icon: UlList,
      title: "Unorder List"
    },
    {
      icon: Header1,
      title: "Header One"
    },
    {
      icon: Header2,
      title: "Header Two"
    },
    {
      icon: Hr,
      title: "Ruler"
    },
    {
      icon: Blockquote,
      title: "Blockquote"
    }
  ]
};

export default class EditorComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.fixedToolbarRef = React.createRef();
    this.state = {
      isFull: false,
      isSticky:false
    };
  }

  handleScroll = () => {
    if(this.props.readOnly){
      return;
    }
    var sticky = this.fixedToolbarRef.current.offsetTop;
    let width = this.fixedToolbarRef.current.parentElement.offsetWidth+'px';
    if(window.pageYOffset >= sticky){
      this.setState({isSticky:true})
      this.fixedToolbarRef.current.style.width = width;
    }else {
      this.setState({isSticky:false})
    }
  }
  componentDidMount(){
    window.addEventListener('scroll',this.handleScroll)
  }
  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll);
  }

  goFull = () => {
    this.setState({ isFull: !this.state.isFull });
  }

  render() {
    const {value, onChange, serviceConfig, readOnly, ...rest} = this.props;
    const {isFull,isSticky} = this.state;
    return (
      <Container isFull={isFull} isSticky={isSticky} readOnly={readOnly} {...rest}>
        {
          readOnly ? (<div></div>):(
            <div ref={this.fixedToolbarRef}>
              <FixedToolbar isSticky={isSticky}>
                <Toolbar
                  value={value}
                  serviceConfig={serviceConfig}
                  onChange={onChange}
                />
              </FixedToolbar>
            </div>
          )
        }
        <EditorContainer isFull={isFull} isSticky={isSticky} readOnly={readOnly}>
          <CannerEditor value={value} onChange={onChange} readOnly={readOnly}/>
        </EditorContainer>
      </Container>
    );
  }
}

@toolbar(toolbarOptions)
//@sidebar(sidebarOptions)
class CannerEditor extends React.Component<Props> {

  shouldComponentUpdate(nextProps: Props) {
    if (this.props.value === nextProps.value)
      return false
    return true
  }

  render() {
    const {value, onChange} = this.props;
    return (
      <Editor 
        className="markdown-body"
        readOnly={this.props.readOnly}
        value={value}
        onChange={onChange}
        plugins={plugins}
        />
    )
  }
}
