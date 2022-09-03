import { Stack } from "@mantine/core";

import PackagesSearchForm from "./components/PackagesSearchForm";
import BundledPackagesTable from "./components/BundledPackagesTable";

function BundledPackagesApp() {
  return (
    <Stack spacing="xl" my="xs">
      <PackagesSearchForm />
      <BundledPackagesTable />
    </Stack>
  );
}

export default BundledPackagesApp;
