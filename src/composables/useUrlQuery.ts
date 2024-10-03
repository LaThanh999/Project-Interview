import { computed } from "vue";

export function useUrlQuery() {
  const getParamValue = (param: string): string | null => {
    if (typeof window !== "undefined") {
      const queryParams = new URLSearchParams(window.location.search);
      return queryParams.get(param);
    }
    return null;
  };

  const setParamValue = (param: string, value: string | undefined): void => {
    const queryParams = new URLSearchParams(window.location.search);

    if (value === undefined || value === null || value === "") {
      queryParams.delete(param);
    } else {
      queryParams.set(param, value);
    }

    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    window.history.pushState({}, "", newUrl);
  };

  const getAllParams = computed(() => {
    if (typeof window !== "undefined") {
      const queryParams = new URLSearchParams(window.location.search);
      const params: { [key: string]: string } = {};

      queryParams.forEach((value, key) => {
        params[key] = value;
      });

      return params;
    }
    return {};
  });

  return {
    getParamValue,
    setParamValue,
    getAllParams,
  };
}
