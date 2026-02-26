import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { DB } from '@/db/db';

interface Customer {
  id: number;
  created_at: string;
  first_name: string;
  last_name: string;
  email: number;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const db = new DB();
  const customers = await db.getCustomers();

  return {
    props: {
      customers: customers.map((c) => ({
        ...c,
        created_at: String(c.created_at),
        updated_at: String(c.updated_at),
      })),
    },
  };
};

export default function CustomersIndex({ customers }: { customers: Customer[] }) {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        <p className="text-sm text-gray-500 mt-1">{customers.length} total customers</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left px-4 py-3 font-medium text-gray-500">ID</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Name</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Email</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Joined</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <Link className="text-blue-600 hover:text-blue-800 font-medium" href={`/customers/${customer.id}`}>#{customer.id}</Link>
                </td>
                <td className="px-4 py-3 text-gray-900 font-medium">
                  <Link href={`/customers/${customer.first_name}-${customer.last_name}`} className="hover:text-blue-600 transition-colors">
                    {customer.first_name} {customer.last_name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {new Date(customer.created_at).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
