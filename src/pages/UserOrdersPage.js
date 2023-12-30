import Navbar from "../features/navbar/Navbar";
import UserOrders from "../features/user/components/UserOrders";

const UserOrdersPage = () => {
  return (
    <Navbar>
      <h1 className="mx-auto font-semibold text-2xl ">My Orders</h1>
      <UserOrders />
    </Navbar>
  );
};

export default UserOrdersPage;
