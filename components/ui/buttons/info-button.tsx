import React, { useState } from 'react';
import styled from 'styled-components';

import { Tooltip } from 'primereact/tooltip';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

interface Props {
  color: string;
}

const InfoButton: React.FC<Props> = ({ color }) => {
  const [visible, setVisible] = useState<boolean>(false);

  const openDialog = () => {
    setVisible(true);
  };

  const closeDialog = () => {
    setVisible(false);
  };

  return (
    <div>
      <Tooltip target='.info-button' content='Click for more info' />

      <StyledButton
        className='info-button'
        icon='pi pi-info-circle'
        color={color}
        onClick={openDialog}
      />

      <Dialog header='Information' visible={visible} style={{ width: '50vw' }} modal onHide={closeDialog}>
        <p>This is some information text inside the modal dialog.</p>

        <Button label='Close' icon='pi pi-times' onClick={closeDialog} className='p-button-secondary' />
      </Dialog>
    </div>
  );
};

const StyledButton = styled(Button)<{ color: string }>`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  height: 2rem;
  width: 2rem;
  color: ${({ color }) => color};
  
  &:focus {
    box-shadow: none;
  }
  
  .pi {
    color: ${({ color }) => color};
  }
`;

export { InfoButton };
