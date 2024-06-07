import React from 'react';
import store from '../../../store/reducers/store.js';
import { Bar, Content, Title, Item } from './styles.js';

const StatusBar = ({itemA, itemB, itemC}) => {

  return (
    <Bar>
      <Item>
        <Title>{itemA.title}</Title>
        <Content>{itemA.content}</Content>
      </Item>
      <Item>
        <Title>{itemB.title}</Title>
        <Content>{itemB.content ? itemB.content : store.getState().bet && store.getState().bet[1]}</Content>
      </Item>
      <Item>
        <Title>{itemC?.title}</Title>
        <Content>{itemC?.content}</Content>
      </Item>
    </Bar>
  )
}

export default StatusBar;
