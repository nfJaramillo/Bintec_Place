import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import BancolombiaIcon from './/assets/logo.svg'
import { useNavigate } from 'react-router-dom';
import { NavLink as ReactNav } from 'react-router-dom'
import { Web3Button } from '@web3modal/react'


export function AppBarTop() {



    // Lo siguientes 3 ajustes se pueden editar
    // Paginas que se muestran en el menu
    const pages = ['Canvas'];
    // Titulo que se muestra cuando el tamaño de pantalla es de un computador
    const titulo = 'BINTEC PLACE'
    // Titulo que se muestra cuando el tamaño de pantalla es de un celular
    const tituloResumido = 'Bintec'
    // Link base de la pagina que debe ser igual al estipulado en App.jsx
    const linkBase = 'Bintec-Place/'

    const navigate = useNavigate();


    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };


    const handleCloseNavMenu = (page) => {
        page = page.toLowerCase();
        page = page.replace(" ", "")
        navigate(linkBase + page);
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static" sx={{ borderRadius: 1 }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box component="img" src={BancolombiaIcon} alt="Logo de Bancolombia" sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, maxWidth: 40 }} />

                    <MenuItem onClick={() => handleCloseNavMenu("")} sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                '&:hover': { bgcolor: 'white', color: 'black' },
                                borderRadius: 1
                            }}
                        >
                            {titulo}
                        </Typography>
                    </MenuItem>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={() => handleCloseNavMenu("")}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)} autoFocus >
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        onClick={() => handleCloseNavMenu("")}
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        {tituloResumido}
                    </Typography>
                    <Box sx={{ flexGrow: 1, textAlign: 'center', display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                component={ReactNav}
                                to={linkBase + page.replace(" ", "")}
                                key={page}
                                onClick={() => handleCloseNavMenu(page)}
                                sx={{ mr: 1, my: 2, color: 'white', active: 'true', display: 'block', '&:hover': { bgcolor: 'white', color: 'black' }, '&.active': { bgcolor: 'white', color: 'black' } }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                        <Web3Button />
                    </Box>

                    <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
                        <Web3Button />
                    </Box>

                </Toolbar>
            </Container>
        </AppBar >
    )
}