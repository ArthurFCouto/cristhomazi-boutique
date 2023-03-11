import { Close } from '@mui/icons-material';
import { Alert, IconButton, Slide, Snackbar } from '@mui/material';
import { createContext, useContext, useState } from 'react';

interface IDialogContextData {
    showAlert: (message: string, severity: 'info' | 'error' | 'success' | 'warning', direction?: 'up' | 'right' | 'down' | 'left')=> void;
}

interface DialogProviderProps {
    children: React.ReactNode;
}

const DialogContext = createContext({} as IDialogContextData);

export const useDialogContext = () => {
    return useContext(DialogContext);
}

export const DialogProvider: React.FC<DialogProviderProps> = ({ children }) => {
    const [objAlert, setObjAlert] = useState({
        message: '',
        open: false
    });
    const [severityAlert, setSeverityAlert] = useState<'info' | 'error' | 'success' | 'warning'>('info');
    const [directionAlert, setDirectionAlert] = useState<'up' | 'right' | 'down' | 'left'>('up');

    const showAlert = (message: string, severity: 'info' | 'error' | 'success' | 'warning', direction?: 'up' | 'right' | 'down' | 'left') => {
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

    return (
        <DialogContext.Provider value={{
            showAlert
        }}>
            {children}
            <Snackbar
                    autoHideDuration={4000}
                    onClose={closeAlert}
                    open={objAlert.open}
                    TransitionComponent={(props)=> <Slide {...props} direction={directionAlert} />}
                    action={
                        <IconButton
                            size='small'
                            color='inherit'
                            onClick={closeAlert}
                        >
                            <Close fontSize='small' />
                        </IconButton>}
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