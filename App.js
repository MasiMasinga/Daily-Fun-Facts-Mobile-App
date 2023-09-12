// Gluestack UI
import { GluestackUIProvider } from '@gluestack-ui/themed';

// React Navigation
import RootNavigation from './src/navigation/RootNavigation';

// Context
import { AuthProvider } from './src/common/context/AuthContext';

export default function App() {
    return (
        <GluestackUIProvider>
            <AuthProvider>
                <RootNavigation />
            </AuthProvider>
        </GluestackUIProvider>
    );
}