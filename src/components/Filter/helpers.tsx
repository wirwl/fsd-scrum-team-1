const getQueryProps = (): {[key: string]: string} => {
  const queryProps: {[key: string]: string} = {};

  if (process.browser) {
    const q = new URLSearchParams(window.location.search);

    q.forEach((_, key) => {
      queryProps[key] = q.get(key) as string;
    });
  }

  return queryProps;
};

export default getQueryProps;
