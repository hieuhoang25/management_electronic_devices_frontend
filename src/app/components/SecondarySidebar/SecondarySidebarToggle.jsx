import { Fab, Icon, IconButton } from '@mui/material';
import { styled, useTheme } from '@mui/system';
import useSettings from 'app/hooks/useSettings';
import clsx from 'clsx';

const Toggle = styled('div')(() => ({
    position: 'fixed',
    right: '30px',
    bottom: '50px',
    zIndex: 99,
    transition: 'all 0.15s ease',
    '&.open': {
        right: '10px',
    },
}));

const SecondarySidebarToggle = () => {
    const { settings, updateSettings } = useSettings();

    const toggle = () => {
        updateSettings({
            secondarysidebar: { open: !settings.secondarysidebar.open },
        });
    };

    const { palette } = useTheme();
    const textColor = palette.primary.contrastText;

    return (
        <Toggle className={clsx({ open: settings.secondarysidebar.open })}>
            {settings.secondarysidebar.open && (
                <IconButton onClick={toggle} size="small" aria-label="toggle">
                    <Icon sx={{ color: textColor }}>close</Icon>
                </IconButton>
            )}

            {!settings.secondarysidebar.open && (
                <Fab color="primary" aria-label="expand" onClick={toggle}>
                    <Icon sx={{ color: textColor }}>settings</Icon>
                </Fab>
            )}
        </Toggle>
    );
};

export default SecondarySidebarToggle;
