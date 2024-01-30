import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { Layout } from './layout/Layout';
import { WagmiProvider } from 'wagmi';
import { config } from './utils/config';
import { RegisterProject } from './components/forms/RegisterProject';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { TxProvider } from './contexts/TxContext';
import { Projects } from './pages/Projects';

const queryClient = new QueryClient();
export default function App() {
  return (
    <BrowserRouter>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <TxProvider>
              <Projects />
              {/* <RegisterProject /> */}
            </TxProvider>
          </Layout>
        </QueryClientProvider>
      </WagmiProvider>
    </BrowserRouter>
  );
}
