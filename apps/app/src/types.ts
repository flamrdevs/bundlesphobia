type Package = {
  name: string;
  version: string;
  description: string;
  links: {
    npm: string;
  };
};

type SizeType<T> = {
  min: T;
  minGzip: T;
};

type DownloadTime = {
  n3G: number;
  n4G: number;
  n5G: number;
};

type Bundle = Omit<Package, "links"> & {
  size: SizeType<number>;
  downloadTime: SizeType<DownloadTime>;
};

type BundledPackage = Package & {
  bundle?: Bundle;
};

export type { SizeType, DownloadTime };
export type { Package, Bundle, BundledPackage };
