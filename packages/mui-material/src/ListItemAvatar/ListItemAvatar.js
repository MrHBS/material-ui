import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/core';
import ListContext from '../List/ListContext';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { getListItemAvatarUtilityClass } from './listItemAvatarClasses';

const useUtilityClasses = (ownerState) => {
  const { alignItems, classes } = ownerState;

  const slots = {
    root: ['root', alignItems === 'flex-start' && 'alignItemsFlexStart'],
  };

  return composeClasses(slots, getListItemAvatarUtilityClass, classes);
};

const ListItemAvatarRoot = styled('div', {
  name: 'MuiListItemAvatar',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.root, ownerState.alignItems === 'flex-start' && styles.alignItemsFlexStart];
  },
})(({ ownerState }) => ({
  minWidth: 56,
  flexShrink: 0,
  ...(ownerState.alignItems === 'flex-start' && {
    marginTop: 8,
  }),
}));

/**
 * A simple wrapper to apply `List` styles to an `Avatar`.
 */
const ListItemAvatar = React.forwardRef(function ListItemAvatar(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiListItemAvatar',
  });

  const { className, ...other } = props;
  const context = React.useContext(ListContext);
  const ownerState = { ...props, alignItems: context.alignItems };
  const classes = useUtilityClasses(ownerState);

  return (
    <ListItemAvatarRoot
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      ref={ref}
      {...other}
    />
  );
});

ListItemAvatar.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component, normally an `Avatar`.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default ListItemAvatar;
