/** @jsx jsx */

import React from 'react';
import {css, jsx} from '@emotion/core';
import nanoid from 'nanoid';

const containerCss = css`
  display: flex;
  min-height: 800px;
  background: blue;

  & div {
    display: flex;
  }
`;

const composerCss = css`
  flex: 1 0 0;

  flex-flow: column;
`;

const toolsCss = css`
  flex: 0 0 300px;

  flex-flow: column;
  background: black;
  color: white;

  > * {
    margin: 0 10px;
    margin-bottom: 10px;
  }
`;

const menuItem = css`
  cursor: grab;
  background: #333;
`;

export default function EmailEditor() {
  const [state, dispatch] = React.useReducer(reduce, defaultState);

  return (
    <div css={containerCss}>
      <div css={composerCss}>
        <BlockSet blocks={state.blocks} />
      </div>

      <div css={toolsCss}>
        <header>Tools</header>
        <div css={menuItem} onClick={() => dispatch({type: 'add-block'})}>
          Block
        </div>
        <div css={menuItem} onClick={() => dispatch({type: 'add-text'})}>
          Text
        </div>
      </div>
    </div>
  );
}

function BlockSet({blocks}) {
  return blocks.map(block => {
    let Component;
    switch(block.type) {
      case 'text':
        Component = TextBlock;
        break;
      case 'div':
      default:
        Component = DivBlock;
        break;
    }
    return <Component key={block.id} block={block} />;
  });
}

function TextBlock({block}) {
  return 'text';
}

const divCss = css`
  min-height: 20px;
  margin: 0 10px;
  border: 1px dashed #000;
`;

function DivBlock({block}) {
  return <div css={divCss}>
    <BlockSet blocks={block.blocks} />
  </div>;
}

const defaultState = {
  blocks: [],
};

function reduce(state, action) {
  switch (action.type) {
    case 'add-block':
      return {
        ...state,
        blocks: [...state.blocks, {id: nanoid(), type: 'div', blocks: []}],
      };
      break;

    case 'add-text':
      let [block, ...rest] = state.blocks;

      block = {
        ...block,
        blocks: [...block.blocks, {id: nanoid(), type: 'text'}],
      };

      return {
        ...state,
        blocks: [block, ...rest],
      };
      break;
  }

  return state;
}
