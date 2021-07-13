import * as React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Form from './Form'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ selectedLook, editLook, openModal, handleCloseModal }) {
  if(!selectedLook){
    return null
  }
  return (
    <div>
      <Modal
        open={openModal}
        onClose={() => handleCloseModal()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Title: { selectedLook.name }
          </Typography>
          <Form id={selectedLook.id} hype_count={selectedLook.hype_count} hashtags={selectedLook.hashtags} editLook={editLook} />
        </Box>
      </Modal>
    </div>
  );
}