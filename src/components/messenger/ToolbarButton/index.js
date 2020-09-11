import React from 'react';
import './ToolbarButton.css';
import { IconButton } from '@material-ui/core';

export default function ToolbarButton(props) {
    const { icon } = props;
    return (
      <IconButton>{icon}</IconButton>
    );
}