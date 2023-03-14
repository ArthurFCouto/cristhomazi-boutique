import { Close } from '@mui/icons-material';
import { Alert, IconButton, Slide, Snackbar } from '@mui/material';
import { createContext, useContext, useState } from 'react';

type ISeverity = 'info' | 'error' | 'success' | 'warning';

type IDirection = 'up' | 'right' | 'down' | 'left';

interface IDialogContextData {
    showAlert: (message: string, severity: ISeverity, direction?: IDirection) => void;
}

interface DialogProviderProps {
    children: React.ReactNode;
}

const DialogContext = createContext({} as IDialogContextData);

export const useDialogContext = () => {
    return useContext(DialogContext);
}

export const DialogProvider: React.FC<DialogProviderProps> = ({ children }) => {
    const [severityAlert, setSeverityAlert] = useState<ISeverity>('info');
    const [directionAlert, setDirectionAlert] = useState<IDirection>('up');
    const [objAlert, setObjAlert] = useState({
        message: '',
        open: false
    });

    const showAlert = (message: string, severity: ISeverity, direction?: IDirection) => {
        setSeverityAlert(severity);
        setDirectionAlert(direction || 'up');
        setObjAlert({
            message,
            open: true
        });
    };

    const closeAlert = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setObjAlert({
            message: '',
            open: false
        });
    };

    const SnackbarAction: React.FC = () => (
        <IconButton
            size='small'
            color='inherit'
            onClick={closeAlert}
        >
            <Close fontSize='small' />
        </IconButton>
    )

    return (
        <DialogContext.Provider value={{
            showAlert
        }}>
            {children}
            <Snackbar
                autoHideDuration={5000}
                onClose={closeAlert}
                open={objAlert.open}
                TransitionComponent={(props) => <Slide {...props} direction={directionAlert} />}
                action={<SnackbarAction />}
            >
                <Alert
                    onClose={closeAlert}
                    severity={severityAlert}
                    sx={{ width: '100%' }}
                >
                    {objAlert.message}
                </Alert>
            </Snackbar>
        </DialogContext.Provider>
    )
}