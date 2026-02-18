import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { DB } from '@/db/db';

interface Customer {
  id: number;
  created_at: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  email: number;
}

interface Order {
  id: number;
  created_at: string;
  value: number;
  net_value: number;
  discount_value: number | null;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const db = new DB();
  const customer = db.getCustomerById(Number(params?.id));

  if (!customer) {
    return { notFound: true };
  }

  const allOrders = await db.getOrders();
  const customerOrders = allOrders.filter((o) => o.customer_id === customer.id);

  return {
    props: {
      customer: {
        ...customer,
        created_at: String(customer.created_at),
        updated_at: String(customer.updated_at),
      },
      orders: customerOrders.map((o) => ({
        ...o,
        created_at: String(o.created_at),
        updated_at: String(o.updated_at),
      })),
    },
  };
};

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between py-3 border-b border-gray-100">
      <dt className="text-sm text-gray-500">{label}</dt>
      <dd className="text-sm font-medium text-gray-900">{children}</dd>
    </div>
  );
}

export default function CustomerDetail({ customer, orders }: { customer: Customer; orders: Order[] }) {
  const totalSpent = orders.reduce((sum, o) => sum + o.value, 0);

  return (
    <div>
      <Link href="/customers" className="text-sm text-blue-600 hover:text-blue-800 mb-4 inline-block">
        &larr; Back to customers
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {customer.first_name} {customer.last_name}
        </h1>
        <p className="text-sm text-gray-500 mt-1">{customer.email}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{orders.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Total Spent</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">£{totalSpent.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Avg. Order Value</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {orders.length > 0 ? `£${(totalSpent / orders.length).toFixed(2)}` : '—'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Customer Details</h2>
          <dl>
            <DetailRow label="ID">#{customer.id}</DetailRow>
            <DetailRow label="Name">
              {customer.first_name} {customer.last_name}
            </DetailRow>
            <DetailRow label="Email">{customer.email}</DetailRow>
            <DetailRow label="Created">{new Date(customer.created_at).toLocaleString('en-GB')}</DetailRow>
            <DetailRow label="Updated">{new Date(customer.updated_at).toLocaleString('en-GB')}</DetailRow>
          </dl>
        </div>
      </div>

      {orders.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Order History</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Order</th>
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
                    <td className="px-4 py-3 text-right font-mono text-gray-900">£{order.value.toFixed(2)}</td>
                    <td className="px-4 py-3 text-right font-mono text-gray-900">£{order.net_value.toFixed(2)}</td>
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
      )}
    </div>
  );
}
