import { useState } from "react";

export function usePagination(initialPage = 1) {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const onPageChange = (page: number) => setCurrentPage(page);
    return { currentPage, onPageChange };
}
