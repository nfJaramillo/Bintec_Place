import { Typography, Grid, Box } from "@mui/material"
import NFTlogo from '../assets/logo.svg'

const Home = () => {
    return (
        <Grid container direction={{xs: 'column-reverse', md: 'row' }} alignItems={'center'} justifyContent={'center'} maxWidth="xl" sx={{  bgcolor: '#cfe8fc', minHeight: '80vh', borderRadius: 1, mt: 3, background: 'linear-gradient(to bottom, #F8F8F8, #FFFFFF)' }}>
            <Grid item xs={6} >
                <Typography textAlign={{xs: 'center', md: 'left' }} sx={{ mt: {xs: 3, md: 3 }, ml: {xs: 0, md: 3  }, typography: {xs: 'h4', md:'h3'  } }}>Blockchain for Bintec</Typography>
                <Typography textAlign={{xs: 'center', md: 'left' }} variant="h5" sx={{ mt: {xs: 3, md: 3 }, ml: {xs: 0, md: 3  } }}>Crea tu billetera digital, deja tu huella en el lienzo y recibe un NFT por tu participación.</Typography>
            </Grid>
            <Grid  item xs={6} container  alignItems={'center'} justifyContent={'center'} >
                <Box component="img" 
                    sx={{maxHeight: { xs: 200, md: 400 }}}
                    alt="Logo"
                    src={NFTlogo}
                />
            </Grid>
        </Grid>
    )
}

export default Home

