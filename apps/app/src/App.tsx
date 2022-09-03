import { AllTheProviders, BundledPackagesApp } from "./components/core";
import { RootLayout } from "./components/layout";

function App() {
  return (
    <AllTheProviders>
      <RootLayout>
        <BundledPackagesApp />
      </RootLayout>
    </AllTheProviders>
  );
}

export default App;
