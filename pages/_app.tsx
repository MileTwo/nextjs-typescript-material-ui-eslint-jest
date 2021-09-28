import { AppProps } from 'next/app';
import { ThemeProvider, Theme, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from 'lib/theme';
import React, { useEffect } from 'react';

declare module '@mui/styles/defaultTheme' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface DefaultTheme extends Theme {}
}

// Determines if we are running on server or in client.
const isServerSideRendered = () => {
    return typeof window === 'undefined';
};

/**
 * Accessibility tool - outputs to devtools console on dev only and client-side only.
 * @see https://github.com/dequelabs/axe-core-npm
 */
if (process.env.NODE_ENV !== 'production' && !isServerSideRendered()) {
    import('react-dom').then((ReactDOM) => {
        import('@axe-core/react').then((axe) => {
            axe.default(React, ReactDOM, 1000, {});
        });
    });
}

const App = ({ Component, pageProps }: AppProps) => {
    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement?.removeChild(jssStyles);
        }
    }, []);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
