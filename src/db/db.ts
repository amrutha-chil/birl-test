import * as fs from 'node:fs';

const ORDERS: Order[] = JSON.parse(fs.readFileSync(`${process.cwd()}/src/db/orders.json`, 'utf-8'));
const CUSTOMERS: Customer[] = JSON.parse(fs.readFileSync(`${process.cwd()}/src/db/customers.json`, 'utf-8'));

interface Order {
  id: number;
  created_at: Date;
  updated_at: Date;
  customer_id: number;
  value: number;
  net_value: number;
  discount_value: number | null;
}

interface Customer {
  id: number;
  created_at: Date;
  updated_at: Date;
  first_name: string;
  last_name: string;
  email: string;
  status: 'active' | 'inactive';
}

class BaseQuery<T> implements PromiseLike<T[]> {
  protected data: T[];

  constructor(data: T[]) {
    this.data = data;
  }

  limit(n: number): this {
    this.data = this.data.slice(0, n);
    return this;
  }

  offset(n: number): this {
    this.data = this.data.slice(n);
    return this;
  }

  first(n: number): Promise<T[]> {
    return Promise.resolve(this.data.slice(0, n));
  }

  then<TResult1 = T[], TResult2 = never>(
    onfulfilled?: (value: T[]) => TResult1 | PromiseLike<TResult1>,
    onrejected?: (reason: any) => TResult2 | PromiseLike<TResult2>
  ): Promise<TResult1 | TResult2> {
    return Promise.resolve(this.data).then(onfulfilled, onrejected);
  }
}

class OrderQuery extends BaseQuery<Order> {}

class CustomerQuery extends BaseQuery<Customer> {}

// So, this is a simple mock db using static data, nothing special
export class DB {
  getOrders() {
    return new OrderQuery(ORDERS);
  }

  getOrderById(id: number) {
    return ORDERS.find((o) => o.id === id);
  }

  getCustomers() {
    return new CustomerQuery(CUSTOMERS);
  }

  getCustomerById(id: number) {
    return CUSTOMERS.find((c) => c.id === id);
  }

  getCustomerBySlug(slug: string) {
    const [first_name, last_name] = slug.split('-')

    if (!first_name || !last_name) return null

    return CUSTOMERS.find((c) => c.first_name === first_name && c.last_name === last_name)
  }
}
