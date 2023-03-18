import useSettings from 'app/hooks/useSettings';
import SecondarySidenavTheme from '../MatxTheme/SecondarySidenavTheme/SecondarySidenavTheme';
import SecondarySidebarContent from './SecondarySidebarContent';
import SecondarySidebarToggle from './SecondarySidebarToggle';

const SecondarySidebar = () => {
    const { settings } = useSettings();
    const secondarySidebarTheme =
        settings.themes[settings.secondarysidebar.theme];

    return (
        <SecondarySidenavTheme theme={secondarySidebarTheme}>
            {settings.secondarysidebar.open && <SecondarySidebarContent />}
            <SecondarySidebarToggle />
        </SecondarySidenavTheme>
    );
};

export default SecondarySidebar;
