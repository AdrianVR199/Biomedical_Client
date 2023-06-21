import React from 'react'
import { Dialog,DialogTitle,DialogContent,makeStyles } from '@mui/material'

function Popup(props) {
    const{title,children,openPopup,setOpenPopup, scroll, width, titulo, heigth,setinfo}=props;
  return (
    <Dialog open={openPopup} fullWidth={true} scroll={scroll} maxWidth={width}  maxheight={heigth} >
        <DialogTitle sx={{paddingBottom:"5px"}}>
            <div>{titulo}</div>
        </DialogTitle>
        <DialogContent >
            {children}
        </DialogContent>
    </Dialog>
  )
}

export default Popup
