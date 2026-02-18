import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { DB } from '@/db/db';

interface Order {
  id: number;
  created_at: string;
  value: number;
  net_value: number;
  discount_value: number | null;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const db = new DB();
  const orders = await db.getOrders();

  return {
    props: {
      orders: orders.map((o) => ({
        ...o,
        created_at: String(o.created_at),
        updated_at: String(o.updated_at),
      })),
    },
  };
};

export default function OrdersIndex({ orders }: { orders: Order[] }) {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <p className="text-sm text-gray-500 mt-1">{orders.length} total orders</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left px-4 py-3 font-medium text-gray-500">ID</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Customer</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Date</th>
              <th className="text-right px-4 py-3 font-medium text-gray-500">Value</th>
              <th className="text-right px-4 py-3 font-medium text-gray-500">Net Value</th>
              <th className="text-right px-4 py-3 font-medium text-gray-500">Discount</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <Link href={`/orders/${order.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                    #{order.id}
                  </Link>
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {new Date(order.created_at).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </td>
                <td className="px-4 py-3">
                  <Link href={`/customers/${order.customer_id}`} className="text-blue-600 hover:text-blue-800">
                    Customer #{order.customer_id}
                  </Link>
                </td>
                <td className="px-4 py-3 text-right font-mono text-gray-900">£{order.value.toFixed(4)}</td>
                <td className="px-4 py-3 text-right font-mono text-gray-900">£{order.net_value.toFixed(1)}</td>
                <td className="px-4 py-3 text-right font-mono">
                  {order.discount_value != null ? (
                    <span className="text-green-700">-£{order.discount_value.toFixed(2)}</span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
