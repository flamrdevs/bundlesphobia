import { createContext, forwardRef, useContext, useEffect, useMemo } from "react";

import { Autocomplete, Box, Button, Group, Highlight, Loader, Stack } from "@mantine/core";
import type { CSSObject, MantineTheme, AutocompleteItem, BoxProps, SelectItemProps } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";

import { Plus } from "phosphor-react";

import useSWR from "swr";

import type { Package } from "~/types";
import { hasByName, insert } from "~/stores/bundled-packages";
import { versionedName } from "~/utilities/package";
import NPMService from "~/services/npm";

type PackagesSearchFormContextType = { text: string };
const PackagesSearchFormContext = createContext<PackagesSearchFormContextType>({ text: "" });
function usePackagesSearchFormContext() {
  return useContext(PackagesSearchFormContext);
}

function getBackgroundImage(theme: MantineTheme) {
  const shade = theme.colorScheme === "dark" ? 5 : 7;
  return theme.fn.linearGradient(45, theme.colors.blue[shade], theme.colors.indigo[shade]);
}
const highlightStyles: (theme: MantineTheme) => CSSObject = (theme) => ({
  backgroundImage: getBackgroundImage(theme),
  fontWeight: 700,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
});
type AutocompletePackageItemProps = Omit<SelectItemProps, "label"> & { label: string };
const AutocompletePackageItem = forwardRef<HTMLDivElement, AutocompletePackageItemProps>((props, ref) => {
  const { text } = usePackagesSearchFormContext();

  return (
    <div ref={ref} {...props}>
      <Highlight highlight={text} highlightStyles={highlightStyles}>
        {props.label}
      </Highlight>
    </div>
  );
});

type SearchFormValues = {
  text: string;
};

function useSearchForm() {
  return useForm<SearchFormValues>({
    initialValues: {
      text: "",
    },
  });
}

async function fetcher(key: { type: "search"; text: string }) {
  const { text } = key;
  if (text === "") return undefined;
  return await NPMService.search({ text });
}
function useNPMSearch(key: () => { type: "search"; text: string }) {
  return useSWR(key, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
  });
}

function getAutocompleteData(packages: Package[]): AutocompleteItem[] {
  return packages.map(({ name, version }) => ({ label: versionedName(name, version), value: name }));
}
function findPackageInPackagesByName(search: string, packages: Package[]) {
  return packages.find(({ name }) => name === search);
}

type PackagesSearchFormProps = BoxProps;

function PackagesSearchForm(props: PackagesSearchFormProps) {
  const form = useSearchForm();

  const { text } = form.values;

  const { data, error, isValidating } = useNPMSearch(() => ({ type: "search", text: text }));

  const packages = useMemo(() => (Array.isArray(data) ? data : []), [JSON.stringify(data)]);

  useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  const autocompleteData = useMemo(() => getAutocompleteData(packages), [packages]);

  async function submitHandler(values: SearchFormValues) {
    const found = findPackageInPackagesByName(values.text, packages);
    if (found) {
      if (!hasByName(found.name)) {
        insert(found);
      } else {
        showNotification({
          id: found.name,
          message: `${found.name} package already added`,
          color: "yellow",
        });
      }
    }
  }

  return (
    <PackagesSearchFormContext.Provider value={{ text }}>
      <Box component="form" {...props} onSubmit={form.onSubmit(submitHandler)}>
        <Group>
          <div style={{ flexGrow: 1 }}>
            <Autocomplete
              placeholder="Search package..."
              data={autocompleteData}
              itemComponent={AutocompletePackageItem}
              limit={17}
              rightSection={isValidating ? <Loader size="xs" /> : undefined}
              {...form.getInputProps("text")}
            />
          </div>

          <div>
            <Button type="submit" leftIcon={<Plus />}>
              Add
            </Button>
          </div>
        </Group>
      </Box>
    </PackagesSearchFormContext.Provider>
  );
}

export default PackagesSearchForm;
