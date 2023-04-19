import { useEffect, useState } from "react";
import getRepos, { Repository } from "../../graphql/getRepos";
import CommonTable from "../common/Table";

export default function Repos() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [nextHash, setNextHash] = useState<string>();
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);

  const headers = [
    {
      text: "Github Repo Name",
      align: "left",
    },
    {
      text: "Homepage Url",
      align: "right",
    },
    {
      text: "Url",
      align: "right",
    },
    {
      text: "Created At",
      align: "right",
    },
  ];

  const fetchRepos = async (offset?: string) => {
    const result = await getRepos(offset);
    setRepos([...(!offset ? [] : repos), ...result.search.nodes]);
    setNextHash(result.search.pageInfo.endCursor);
    setHasNextPage(result.search.pageInfo.hasNextPage);
  };

  const loadNextPage = () => {
    fetchRepos(nextHash);
  };

  const onRefresh = async () => {
    setRepos([]);
    await fetchRepos();
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  return (
    <CommonTable
      rows={repos}
      onRefresh={onRefresh}
      headers={headers}
      loadNextPage={loadNextPage}
      hasNextPage={hasNextPage}
    />
  );
}
