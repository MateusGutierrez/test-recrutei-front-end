import { ThemeProvider } from './components/theme-provider';
import GlobalRoute from './routes';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <GlobalRoute />
    </ThemeProvider>
  );
}

export default App;
