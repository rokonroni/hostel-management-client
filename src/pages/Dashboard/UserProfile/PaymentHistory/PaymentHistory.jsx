import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });

  return (
    <>
      <SectionTitle
        title="Payment History"
        subTitle="---Your Payment History---"
      />
      <div className="overflow-x-auto mt-6 ">
          <table className="table">
            {/* head */}
            <thead className=" text-white font-semibold text-xl ">
              <tr className="bg-yellow-800 ">
                <th>#</th>
                <th>Price</th>
                <th>Transaction ID</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((item, idx) => (
                <tr key={item._id}>
                  <th>{idx + 1}</th>
                  <td>{item.price}</td>
                  <td>${item.transactionId}</td>
                  <td className="font-bold uppercase ">{item.status}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </>
  );
};

export default PaymentHistory;
