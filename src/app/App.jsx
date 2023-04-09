import '../fake-db';
import { Provider } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import { MatxTheme } from './components';
import { AuthProvider } from './contexts/JWTAuthContext';
import { SettingsProvider } from './contexts/SettingsContext';
import routes from './routes';
import Store from './redux/Store';
import { PersistGate } from 'redux-persist/integration/react';

let { store, persistor } = Store();

const App = () => {
    const content = useRoutes(routes);

    return (
            <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <SettingsProvider>
                    <MatxTheme>
                        {/* {content} */}
                        <AuthProvider>{content}</AuthProvider>
                    </MatxTheme>
                </SettingsProvider>
            </PersistGate>
        </Provider>
    );
};

export default App;
