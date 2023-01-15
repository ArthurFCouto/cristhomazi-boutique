import { ButtonBase, FormControl, InputAdornment, Link, OutlinedInput, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { Instagram, Search, WhatsApp } from '@mui/icons-material';
import { useAppThemeContext } from '../../shared/contexts'

export const Home: React.FC = () => {
  const { toggleTheme } = useAppThemeContext();
  const theme = useTheme();
  return (
    <>
      <Box width={'100%'}>
        <Box
          bgcolor={theme.palette.background.paper}
          display={'flex'}
          alignContent={'center'}
          justifyContent={'center'}
          width={'100%'}
        >
          <Box
            display={'flex'}
            columnGap={theme.spacing(5)}
            alignContent={'center'}
            justifyContent={'end'}
            flexDirection={'row'}
            marginX={theme.spacing(1)}
            paddingY={theme.spacing(0.5)}
            maxWidth={'md'}
            width={'100%'}
          >
            <Box
              display={'flex'}
              alignContent={'center'}
            >
              <Instagram fontSize='small' />
              <Typography variant='body2' ml={theme.spacing(0.5)}>
                <Link href='https://www.instagram.com/cristhomaziboutique/' underline='none'>
                  @cristhomaziboutique
                </Link>
              </Typography>
            </Box>
            <Box
              display={'flex'}
              alignContent={'center'}
            >
              <WhatsApp fontSize='small' htmlColor={theme.palette.primary.contrastText} />
              <Typography variant='body2' ml={theme.spacing(0.5)}>
                <Link href='https://api.whatsapp.com/send?phone=553897326440&text=Ol%C3%A1!%20' underline='none'>
                  (38) 99732-6440
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          display={'flex'}
          alignContent={'center'}
          justifyContent={'center'}
          width={'100%'}
        >
          <Box
            display={'flex'}
            marginX={theme.spacing(1)}
            paddingY={theme.spacing(0.5)}
            maxWidth={'md'}
            width={'100%'}
          >
            <Box display={'flex'} width={'25%'}>
              <ButtonBase
                sx={{
                  marginRight: 'auto',
                  width: theme.spacing(15),
                  height: theme.spacing(15)
                }}
              >
                <img
                  alt="Logo CrisThomazi"
                  src="/public/logo.jpg"
                  width={theme.spacing(10)}
                  height={theme.spacing(10)}
                  loading="lazy"
                />
              </ButtonBase>
            </Box>
            <Box
              display={'flex'}
              justifyContent={'center'}
              flexDirection={'column'}
              width={'50%'}
            >
              <Typography
                variant='caption'
                display={'block'}>
                Bem-vindo(a)! Acesse sua conta
              </Typography>
              <FormControl sx={{ width: '100%' }}>
                <OutlinedInput
                  placeholder="Colcci, Santa Lolla, Calvin Klein, ..."
                  size='small'
                  sx={{
                    bgcolor: theme.palette.background.paper
                  }}
                  startAdornment={
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>}
                />
              </FormControl>
            </Box>
            <Box display={'flex'} width={'25%'}>
              <ButtonBase
                sx={{
                  marginLeft: 'auto',
                  width: theme.spacing(15),
                  height: theme.spacing(15)
                }}
              >
                <img
                  alt="Logo CrisThomazi"
                  src="/public/logo.jpg"
                  width={theme.spacing(10)}
                  height={theme.spacing(10)}
                  loading="lazy"
                />
              </ButtonBase>
            </Box>
          </Box>
        </Box>
      </Box>
      <span onClick={toggleTheme} style={{ cursor: 'pointer' }}>Mudar o tema!</span>
    </>
  )
}