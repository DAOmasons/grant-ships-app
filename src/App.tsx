import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { Layout } from './layout/Layout';
import { WagmiProvider } from 'wagmi';
import { config } from './utils/config';
import { RegisterProject } from './components/forms/RegisterProject';

export default function App() {
  return (
    <WagmiProvider config={config}>
      <Layout>
        <RegisterProject />
      </Layout>
    </WagmiProvider>
  );
}
