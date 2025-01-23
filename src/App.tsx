import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Conversations from './screens/Conversation';
import { halogenThemeOptions } from './assets/styles/themes/halogen.theme';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: true,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={createTheme(halogenThemeOptions)}>
        <Conversations />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App;
