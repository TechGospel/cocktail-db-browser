interface PaginationProps {
  page: number;
  total: number;
  onChange: (page: number) => void;
}

const PAGE_SIZE = 8;


export function Pagination({ page, total, onChange }: PaginationProps) {
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="flex gap-2 justify-center mt-6">
      <button disabled={page === 1} onClick={() => onChange(page - 1)}>
        Prev
      </button>

      <span>
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
}
