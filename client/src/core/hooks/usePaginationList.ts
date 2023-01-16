// import { Console } from '@sentry/node/dist/integrations'
import _ from "lodash";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

type responseItems = any[];

interface IProps<T> {
  limit?: number;
  page?: number;
  id?: number;
  fetchItems: (...arr: any[]) => any;
  serrializatorResponse?: <T>(data: T) => T;
  serrializatorItems?: (items: any[]) => T[];
  loadParams?: { [key: string]: string | boolean };
  needInit?: boolean;
  clearWhenReload?: boolean;
}

const defaultProps: IProps<any[]> = {
  limit: 20,
  page: 1,
  fetchItems: () => null /*  axios request */,
  serrializatorResponse: (data) => data,
  serrializatorItems: (items) => items as any,
  loadParams: {},
  needInit: true,
  clearWhenReload: true,
};

interface ILoadParams {
  limit: number | any;
  page: number | any;
  count?: number | any;
  sortField?: string | any;
  sort?: "ASC" | "DESC";
}

export const usePaginationList = <T extends { id: number }>(
  props: IProps<T>
) => {
  if (!props.fetchItems) {
    throw new Error("Use flat list need a fetchItems function");
  }

  props = Object.assign({ ...defaultProps }, props);

  const loadParams = useRef<ILoadParams>({
    limit: props.limit,
    page: props.page,
    count: undefined,
    sortField: undefined,
    sort: undefined,
    ...props.loadParams,
  });

  const blockLoadingRef = useRef(false);

  const [items, setItems] = useState<T[]>([]);
  const [isLoading, setLoading] = useState(true);

  const fetchItems = async (firstFetch = false) => {
    const { count, page, limit } = loadParams.current;
    setLoading(true);

    if (firstFetch) {
      loadParams.current.page = defaultProps.page;
      loadParams.current.count = undefined;
      // loadParams.current.sortField = 'id'
      // loadParams.current.sort = 'DESC'
    } else if (blockLoadingRef.current) {
      return;
    } else if (count && page > Math.ceil(count / limit)) {
      return;
    }

    blockLoadingRef.current = true;
    try {
      if (props.clearWhenReload) setItems([]);
      console.log("loadParams.current", loadParams.current);
      const response = props.serrializatorResponse(
        await props.fetchItems(loadParams.current)
      );

      loadParams.current = {
        ...props.loadParams,
        ...loadParams.current,
        limit: loadParams.current.limit,
        page: loadParams.current.page,
        count: response.data.count || response.data[1],
      };

      const fetchedItems = props.serrializatorItems(response.data.items);
      setItems(fetchedItems);
    } catch (e) {
      setItems([]);
    }

    blockLoadingRef.current = false;
    setTimeout(() => {
      setLoading(false);
    }, 200);
  };

  const resetFlatList = () => {
    fetchItems(true);
  };

  const loadMore = () => {
    fetchItems(false);
  };

  const loadPage = (page: number) => {
    loadParams.current = {
      ...loadParams.current,
      page: Number(page),
    };
    console.log(loadParams);
    fetchItems(false);
  };

  const setLoadParams = (params: any) => {
    loadParams.current = {
      ...loadParams.current,
      ...params,
    };
    fetchItems(true);
  };

  const setOrderBy = (field: string) => {
    const getSort = () => {
      if (!loadParams.current.sortField) return "ASC";
      if (loadParams.current.sort === "ASC") return "DESC";
      else return "ASC";
    };
    loadParams.current = {
      ...loadParams.current,
      page: 1,
      sortField: field,
      sort: getSort(),
    };
    fetchItems(false);
  };

  useEffect(() => {
    if (props.needInit) fetchItems(true);
  }, []);

  const removeItem = (id: number) => {
    const newItems = _.clone(items).filter((it) => it.id !== id);
    setItems(newItems);
  };

  return {
    items,
    isLoading,
    loadParams: loadParams.current as Record<string, any>,
    resetFlatList,
    loadMore,
    setLoadParams,
    loadPage,
    setOrderBy,
    setItems,
    removeItem,
  };
};
