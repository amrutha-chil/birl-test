import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { DB } from '@/db/db';

interface Order {
  id: number;
  created_at: string;
  updated_at: string;
  customer_id: number;
  value: number;
  net_value: number;
  discount_value: number | null;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const db = new DB();
  const order = db.getOrderById(Number(params?.id));

  if (!order) {
    return { notFound: true };
  }

  return {
    props: {
      order: {
        ...order,
        created_at: String(order.created_at),
        updated_at: String(order.updated_at),
      },
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

export default function OrderDetail({ order }: { order: Order }) {
  return (
    <div>
      <Link href="/orders" className="text-sm text-blue-600 hover:text-blue-800 mb-4 inline-block">
        &larr; Back to orders
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Order #{order.id}</h1>
        <p className="text-sm text-gray-500 mt-1">
          Placed on{' '}
          {new Date(order.created_at).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Order Details</h2>
          <dl>
            <DetailRow label="Order ID">#{order.id}</DetailRow>
            <DetailRow label="Customer">
              <Link href={`/customers/${order.customer_id}`} className="text-blue-600 hover:text-blue-800">
                Customer #{order.customer_id}
              </Link>
            </DetailRow>
            <DetailRow label="Created">
              {new Date(order.created_at).toLocaleString('en-GB')}
            </DetailRow>
            <DetailRow label="Updated">
              {new Date(order.updated_at).toLocaleString('en-GB')}
            </DetailRow>
          </dl>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Financials</h2>
          <dl>
            <DetailRow label="Value">
              <span className="font-mono">£{order.value.toFixed(2)}</span>
            </DetailRow>
            <DetailRow label="Net Value">
              <span className="font-mono">£{order.net_value.toFixed(2)}</span>
            </DetailRow>
            <DetailRow label="Discount">
              {order.discount_value != null ? (
                <span className="font-mono text-green-700">-£{order.discount_value.toFixed(2)}</span>
              ) : (
                <span className="text-gray-400">None</span>
              )}
            </DetailRow>
          </dl>
        </div>
      </div>
    </div>
  );
}
