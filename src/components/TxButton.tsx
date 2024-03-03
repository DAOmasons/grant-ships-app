import {
  Button,
  ButtonProps,
  ElementProps,
  createPolymorphicComponent,
} from '@mantine/core';
import React, { forwardRef } from 'react';

interface Base extends ElementProps<'button'> {}

type CustomButtonProps = Base & ButtonProps;

export const TxButton = createPolymorphicComponent<'button', CustomButtonProps>(
  forwardRef<HTMLButtonElement, CustomButtonProps>(
    ({ onClick, ...props }, ref) => {
      const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
      };

      return <Button {...props} ref={ref} onClick={handleClick} />;
    }
  )
);
