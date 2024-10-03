import { computed, watch, toRef, ref, watchEffect, Ref } from "vue";

interface PaginationProps {
  totalItem: any[] | Ref<any[]>;
  currentPage: number | Ref<number>;
  pageSize?: number;
}

export function usePagination({
  currentPage = 1,
  pageSize = 10,
  totalItem,
}: PaginationProps) {
  const itemCurrentRef = ref<any[]>([]);
  const totalPageRef = ref(0);

  watchEffect(() => {
    const currentPageValue =
      typeof currentPage === "number" ? currentPage : currentPage.value;
    const totalItemValue = Array.isArray(totalItem)
      ? totalItem
      : totalItem.value;

    if (totalItemValue) {
      const startIndex = (currentPageValue - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      itemCurrentRef.value = totalItemValue.slice(startIndex, endIndex);
      totalPageRef.value = Math.ceil(totalItemValue.length / pageSize);
    }
  });

  return {
    itemCurrent: itemCurrentRef,
    totalPage: totalPageRef,
  };
}
