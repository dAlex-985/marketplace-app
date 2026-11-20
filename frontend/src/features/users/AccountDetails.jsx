import { useAccountDetails } from "./useAccountDetails";

function AccountDetails() {
  const { error, user, isPending, isError } = useAccountDetails();

  const isAuthenticated = Boolean(user) && !isError;

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error.response?.data?.message || error.message}</p>;
  }

  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
}

export default AccountDetails;
