import { useEffect, useState } from "react";
import { User, getUsers } from "../../graphql/getUsers";
import CommonTable from "../common/Table";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [nextHash, setNextHash] = useState<string>();
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);

  const headers = [
    { text: "User Id", align: "left" },
    { text: "User Name", align: "right" },
    {
      text: "User profile",
      align: "right",
    },
    {
      text: "User avatar",
      align: "right",
    },
    {
      text: "Joined At",
      align: "right",
    },
  ];

  const fetchUsers = async (offset?: string) => {
    const result = await getUsers(offset);
    setUsers([...(!offset ? [] : users), ...result.search.nodes]);
    setNextHash(result.search.pageInfo.endCursor);
    setHasNextPage(result.search.pageInfo.hasNextPage);
  };

  const loadNextPage = () => {
    fetchUsers(nextHash);
  };

  const onRefresh = async () => {
    setUsers([]);
    await fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <CommonTable
      rows={users}
      onRefresh={onRefresh}
      headers={headers}
      loadNextPage={loadNextPage}
      hasNextPage={hasNextPage}
    />
  );
}
