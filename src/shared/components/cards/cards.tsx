import { Box, Paper, Typography } from "@mui/material"

interface ICardArea {
    children: React.ReactNode;
}

/* Criar o tipo de item*/
interface ICard {
    item: any;
}

export const CardArea: React.FC<ICardArea> = ({ children }) => {
    return (
        <Box
            display='flex'
            overflow='auto'
            width='100%'
        >
            {children}
        </Box>
    )
}

export const Card: React.FC<ICard> = ({ item }) => {
    const { produto: { titulo } } = item;
    return (
        <Box component={Paper}>
            <Typography>{titulo}</Typography>
        </Box>
    )
}