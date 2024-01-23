import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { Layout } from './layout/Layout';
import { WagmiProvider } from 'wagmi';
import { config } from './utils/config';
import { RegisterProject } from './components/forms/RegisterProject';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
export default function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <RegisterProject />
        </Layout>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
