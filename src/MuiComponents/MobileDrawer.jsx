import * as React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import TableRowsRoundedIcon from '@mui/icons-material/TableRowsRounded';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import IconButton from '@mui/material/IconButton'
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import Typography from '@mui/material/Typography'





const drawerBleeding = 56;

const Root = styled('div')(({ theme }) => ({
  height: '80%',
  backgroundColor: grey[100],
  [theme.breakpoints.up('dark')]: {
    backgroundColor: theme.palette.background.default,
  },
}));


export default function MobileDrawer(props) {
  const { window } = props;
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(22% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      <Box sx={{ textAlign: 'left', pt: 1, ml:0.5}}>
        <IconButton><img className="logo" src="https://img.freepik.com/psd-gratuit/livres-empiles-isoles-fond-transparent_191095-17333.jpg?ga=GA1.1.596290338.1724375721&semt=ais_hybrid" alt="" />
        <Typography variant="h6" style={{
            fontFamily:'Roboto',
            fontSize:18,
            color:'black',
        }}>Book Haven</Typography>
        </IconButton>

        <IconButton onClick={toggleDrawer(true)} sx={{float:'right' , mr:1}}>


        <TableRowsRoundedIcon fontSize='large'/>

        </IconButton>
       

      </Box>

      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
       
<IconButton aria-label="">
  <LocalLibraryIcon/>
</IconButton>


      </SwipeableDrawer>
    </Root>
  );
}