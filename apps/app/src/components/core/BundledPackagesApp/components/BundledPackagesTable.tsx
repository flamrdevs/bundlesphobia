import { useEffect } from "react";
import type { MouseEvent } from "react";

import { ActionIcon, Center, Group, Loader, Table, Text } from "@mantine/core";
import type { TableProps } from "@mantine/core";

import { X } from "phosphor-react";

import useSWR from "swr";

import type { BundledPackage } from "~/types";

import {
  useBundledPackages,
  useTotalBundledSizePackages,
  hasByName,
  insert,
  updateBundleByName,
  removeByName,
} from "~/stores/bundled-packages";
import BundlephobiaService from "~/services/bundlephobia";

function Head() {
  const bundledPackages = useBundledPackages();

  return (
    <thead>
      <tr>
        <th rowSpan={2}>Name ({bundledPackages.length})</th>
        <th rowSpan={2}>Version</th>
        <th colSpan={2}>
          <Text align="center">Size</Text>
        </th>
        <th></th>
      </tr>
      <tr>
        <th>
          <Text align="center">min</Text>
        </th>
        <th>
          <Text align="center">min+gzip</Text>
        </th>
        <th></th>
      </tr>
    </thead>
  );
}

const ONE_MB = 1024 * 1000;
function kb(value: number) {
  return value / 1024;
}
function mb(value: number) {
  return kb(value) / 1024;
}
function show(size: number) {
  return size >= ONE_MB ? { unit: "MB", value: mb(size).toFixed(2) } : { unit: "KB", value: kb(size).toFixed(2) };
}

type ShowSizeProps = {
  value: number;
};
function ShowSize(props: ShowSizeProps) {
  const { unit, value } = show(props.value);

  return (
    <Group spacing={7}>
      <Text size="sm" weight={700}>
        {value}
      </Text>
      <Text size="xs" weight={400}>
        {unit}
      </Text>
    </Group>
  );
}

async function fetcher(key: { type: "bundle"; name: string; version: string }) {
  const { name, version } = key;
  return await BundlephobiaService.size({ name, version });
}
function useBundlephobiaSize(key: () => { type: "bundle"; name: string; version: string }) {
  return useSWR(key, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
  });
}

type BundleRowProps = {
  bundledPackage: BundledPackage;
};

function BundleRow(props: BundleRowProps) {
  const { name, version, description, links, bundle } = props.bundledPackage;

  const { data, error, isValidating } = useBundlephobiaSize(() => ({ type: "bundle", name, version }));

  const handleRemove = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    removeByName(name);
  };

  useEffect(() => {
    data && (hasByName(name) ? updateBundleByName(name, data) : insert({ name, version, description, links, bundle: data }));
  }, [name, version, description, data]);

  useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  const loaderOrNull = isValidating ? <Loader size="xs" m="0.4rem" /> : <Text>Null</Text>;

  const real = data || bundle;

  return (
    <tr>
      <td>
        <Text>{name}</Text>
      </td>
      <td>
        <Text>{version}</Text>
      </td>
      <td>
        <Group position="right">{real ? <ShowSize value={real.size.min} /> : loaderOrNull}</Group>
      </td>
      <td>
        <Group position="right">{real ? <ShowSize value={real.size.minGzip} /> : loaderOrNull}</Group>
      </td>
      <td>
        <Group position="right">
          <ActionIcon size="sm" color="red" radius="xl" onClick={handleRemove}>
            <X />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  );
}

function EmptyRow() {
  return (
    <tr>
      <td colSpan={4}>
        <Center p="xl">
          <Text>No packages</Text>
        </Center>
      </td>
    </tr>
  );
}

function TotalBundlesRow() {
  const totalBundlesSize = useTotalBundledSizePackages();

  return (
    <tr>
      <td colSpan={2}></td>
      <td>
        <Group position="right">
          <ShowSize value={totalBundlesSize.min} />
        </Group>
      </td>
      <td>
        <Group position="right">
          <ShowSize value={totalBundlesSize.minGzip} />
        </Group>
      </td>
      <td></td>
    </tr>
  );
}

function Body() {
  const bundledPackages = useBundledPackages();
  const empty = bundledPackages.length === 0;

  return (
    <tbody>
      {bundledPackages.map((bundledPackage) => (
        <BundleRow key={bundledPackage.name} bundledPackage={bundledPackage} />
      ))}

      {empty ? <EmptyRow /> : <TotalBundlesRow />}
    </tbody>
  );
}

type BundledPackagesTableProps = TableProps;

function BundledPackagesTable(props: BundledPackagesTableProps) {
  return (
    <Table {...props}>
      <Head />
      <Body />
    </Table>
  );
}

export type { BundledPackagesTableProps };
export default BundledPackagesTable;
