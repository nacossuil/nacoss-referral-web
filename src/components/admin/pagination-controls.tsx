import { Button } from "@/components/ui/button";

interface Props {
  page: number;
  total: number;
  pageSize: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export function PaginationControls({ page, total, pageSize, setPage }: Props) {
  const lastPage = Math.ceil(total / pageSize);

  return (
    <div className="flex justify-between items-center mt-6 text-sm">
      <Button
        variant="ghost"
        disabled={page === 1}
        onClick={() => setPage((p) => Math.max(1, p - 1))}
      >
        Previous
      </Button>
      <span>
        Page {page} of {lastPage}
      </span>
      <Button
        variant="ghost"
        disabled={page >= lastPage}
        onClick={() => setPage((p) => p + 1)}
      >
        Next
      </Button>
    </div>
  );
}
