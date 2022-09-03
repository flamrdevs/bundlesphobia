function objectToSearchParams(object: Record<string, string>) {
  const sp = new URLSearchParams();
  for (const key in object) sp.append(key, object[key]);
  return sp;
}

function createURLWithSearchParams(path: string, query: Record<string, string>) {
  return `${path}?${objectToSearchParams(query)}`;
}

export { createURLWithSearchParams };
