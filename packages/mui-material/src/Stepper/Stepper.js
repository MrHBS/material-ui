import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { integerPropType } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/core';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import { getStepperUtilityClass } from './stepperClasses';
import StepConnector from '../StepConnector';
import StepperContext from './StepperContext';

const useUtilityClasses = (ownerState) => {
  const { orientation, alternativeLabel, classes } = ownerState;
  const slots = {
    root: ['root', orientation, alternativeLabel && 'alternativeLabel'],
  };

  return composeClasses(slots, getStepperUtilityClass, classes);
};

const StepperRoot = styled('div', {
  name: 'MuiStepper',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    return [
      styles.root,
      styles[ownerState.orientation],
      ownerState.alternativeLabel && styles.alternativeLabel,
    ];
  },
})(({ ownerState }) => ({
  display: 'flex',
  ...(ownerState.orientation === 'horizontal' && {
    flexDirection: 'row',
    alignItems: 'center',
  }),
  ...(ownerState.orientation === 'vertical' && {
    flexDirection: 'column',
  }),
  ...(ownerState.alternativeLabel && {
    alignItems: 'flex-start',
  }),
}));

const defaultConnector = <StepConnector />;

const Stepper = React.forwardRef(function Stepper(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiStepper' });
  const {
    activeStep = 0,
    alternativeLabel = false,
    children,
    className,
    connector = defaultConnector,
    nonLinear = false,
    orientation = 'horizontal',
    ...other
  } = props;

  const ownerState = {
    ...props,
    alternativeLabel,
    orientation,
  };

  const classes = useUtilityClasses(ownerState);

  const childrenArray = React.Children.toArray(children).filter(Boolean);
  const steps = childrenArray.map((step, index) => {
    return React.cloneElement(step, {
      index,
      last: index + 1 === childrenArray.length,
      ...step.props,
    });
  });
  const contextValue = React.useMemo(
    () => ({ activeStep, alternativeLabel, connector, nonLinear, orientation }),
    [activeStep, alternativeLabel, connector, nonLinear, orientation],
  );

  return (
    <StepperContext.Provider value={contextValue}>
      <StepperRoot
        ownerState={ownerState}
        className={clsx(classes.root, className)}
        ref={ref}
        {...other}
      >
        {steps}
      </StepperRoot>
    </StepperContext.Provider>
  );
});

Stepper.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Set the active step (zero based index).
   * Set to -1 to disable all the steps.
   * @default 0
   */
  activeStep: integerPropType,
  /**
   * If set to 'true' and orientation is horizontal,
   * then the step label will be positioned under the icon.
   * @default false
   */
  alternativeLabel: PropTypes.bool,
  /**
   * Two or more `<Step />` components.
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
   * An element to be placed between each step.
   * @default <StepConnector />
   */
  connector: PropTypes.element,
  /**
   * If set the `Stepper` will not assist in controlling steps for linear flow.
   * @default false
   */
  nonLinear: PropTypes.bool,
  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default Stepper;
