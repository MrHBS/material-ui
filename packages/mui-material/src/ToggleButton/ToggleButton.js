// @inheritedComponent ButtonBase
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/core';
import { alpha } from '../styles';
import ButtonBase from '../ButtonBase';
import capitalize from '../utils/capitalize';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import toggleButtonClasses, { getToggleButtonUtilityClass } from './toggleButtonClasses';

const useUtilityClasses = (ownerState) => {
  const { classes, fullWidth, selected, disabled, size, color } = ownerState;

  const slots = {
    root: [
      'root',
      selected && 'selected',
      disabled && 'disabled',
      fullWidth && 'fullWidth',
      `size${capitalize(size)}`,
      color,
    ],
  };

  return composeClasses(slots, getToggleButtonUtilityClass, classes);
};

const ToggleButtonRoot = styled(ButtonBase, {
  name: 'MuiToggleButton',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.root, styles[`size${capitalize(ownerState.size)}`]];
  },
})(({ theme, ownerState }) => {
  const selectedColor =
    ownerState.color === 'standard'
      ? theme.palette.text.primary
      : theme.palette[ownerState.color].main;
  return {
    ...theme.typography.button,
    borderRadius: theme.shape.borderRadius,
    padding: 11,
    border: `1px solid ${theme.palette.divider}`,
    color: theme.palette.action.active,
    ...(ownerState.fullWidth && {
      width: '100%',
    }),
    [`&.${toggleButtonClasses.disabled}`]: {
      color: theme.palette.action.disabled,
      border: `1px solid ${theme.palette.action.disabledBackground}`,
    },
    '&:hover': {
      textDecoration: 'none',
      // Reset on mouse devices
      backgroundColor: alpha(theme.palette.text.primary, theme.palette.action.hoverOpacity),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    [`&.${toggleButtonClasses.selected}`]: {
      color: selectedColor,
      backgroundColor: alpha(selectedColor, theme.palette.action.selectedOpacity),
      '&:hover': {
        backgroundColor: alpha(
          selectedColor,
          theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(selectedColor, theme.palette.action.selectedOpacity),
        },
      },
    },
    ...(ownerState.size === 'small' && {
      padding: 7,
      fontSize: theme.typography.pxToRem(13),
    }),
    ...(ownerState.size === 'large' && {
      padding: 15,
      fontSize: theme.typography.pxToRem(15),
    }),
  };
});

const ToggleButton = React.forwardRef(function ToggleButton(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiToggleButton' });
  const {
    children,
    className,
    color = 'standard',
    disabled = false,
    disableFocusRipple = false,
    fullWidth = false,
    onChange,
    onClick,
    selected,
    size = 'medium',
    value,
    ...other
  } = props;

  const ownerState = {
    ...props,
    color,
    disabled,
    disableFocusRipple,
    fullWidth,
    size,
  };

  const classes = useUtilityClasses(ownerState);

  const handleChange = (event) => {
    if (onClick) {
      onClick(event, value);
      if (event.defaultPrevented) {
        return;
      }
    }

    if (onChange) {
      onChange(event, value);
    }
  };

  return (
    <ToggleButtonRoot
      className={clsx(classes.root, className)}
      disabled={disabled}
      focusRipple={!disableFocusRipple}
      ref={ref}
      onClick={handleChange}
      onChange={onChange}
      value={value}
      ownerState={ownerState}
      aria-pressed={selected}
      {...other}
    >
      {children}
    </ToggleButtonRoot>
  );
});

ToggleButton.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
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
   * The color of the button when it is in an active state.
   * @default 'standard'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['standard', 'primary', 'secondary', 'error', 'info', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * @ignore
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * If `true`, the button is rendered in an active state.
   */
  selected: PropTypes.bool,
  /**
   * The size of the component.
   * The prop defaults to the value inherited from the parent ToggleButtonGroup component.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['small', 'medium', 'large']),
    PropTypes.string,
  ]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  /**
   * The value to associate with the button when selected in a
   * ToggleButtonGroup.
   */
  value: PropTypes.any.isRequired,
};

export default ToggleButton;
