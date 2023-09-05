import { Cards, Card } from "@/components/ui/Card";
import React, { useMemo, useState } from "react";
import { columns, Order } from "../components/Data-table-Columns/OrdersPage";
import { DataTable } from "../components/data-table-orders";
import { Form, Input, Select } from "../components/ui/Form";
import { useFieldArray, useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Orders = () => {
  const [selectedRow, setSelectedRow] = useState<Order>({} as Order);

  const { data, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:8008/orders");
      return data as Order[];
    },
  });

  const { register, control, handleSubmit, setValue } = useForm({});

  React.useEffect(() => {
    if (selectedRow.name) {
      setValue("id", selectedRow._id);
      setValue("name", selectedRow.name);
      setValue("email", selectedRow.email);
      setValue("address", selectedRow.address);
      setValue("phone", selectedRow.phone);
      setValue("products", selectedRow.products);
      setValue("amount", selectedRow.amount);
      setValue("status", selectedRow.status);
      setValue("shipped", selectedRow.shipped);
    } else {
      setValue("id", "");
      setValue("name", "");
      setValue("email", "");
      setValue("address", "");
      setValue("phone", "");
      setValue("products", "");
      setValue("amount", "");
      setValue("status", "");
      setValue("shipped", "");
    }
  }, [selectedRow]);

  return (
    <>
      <div id="main-content-container">
        <div id="heading">
          <h1>Orders</h1>
        </div>
        <Cards>
          <Card cardClass="smaller-card" title="Orders In Last 30 Days">
            <p className="card-text-large">
              {
                data?.filter((order: Order) => {
                  return (
                    new Date(order.createdAt) <
                      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) &&
                    new Date(order.createdAt) >
                      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                  );
                }).length
              }
            </p>
          </Card>
          <Card cardClass="smaller-card" title="Total Orders">
            {(data && <p className="card-text-large">{data?.length}</p>) || (
              <p>Loading...</p>
            )}
          </Card>
          {selectedRow.name ? (
            <Card title="Update Order (Unselect to Create)">
              <p className="card-text">
                <Form
                  id="order-form"
                  onSubmit={handleSubmit((formValues) => {
                    // @ts-expect-error
                    event.preventDefault();
                    console.log(formValues);
                  })}
                >
                  <Input
                    For="name"
                    Label="Name"
                    placeholder="John Doe"
                    Type="text"
                    register={register("name")}
                    required={true}
                  />
                  <Input
                    For="email"
                    Label="Email"
                    placeholder="John@email.com"
                    Type="text"
                    register={register("email")}
                    required={true}
                  />
                  <Input
                    For="address"
                    Label="Address"
                    placeholder="22 Combine St"
                    Type="text"
                    register={register("address")}
                    required={true}
                  />
                  <Input
                    For="phone"
                    Label="Phone"
                    placeholder="07575 39281"
                    Type="text"
                    register={register("phone")}
                    required={true}
                  />
                  <Input
                    For="products"
                    Label="Products"
                    placeholder="2x Eggs, 3x Item"
                    Type="text"
                    register={register("products")}
                    required={true}
                  />
                  <Input
                    For="Amount"
                    Label="Amount"
                    placeholder="£200"
                    Type="number"
                    register={register("amount")}
                    required={true}
                  />
                  <Select
                    For="status"
                    Label="Status"
                    Options={["Success", "Pending", "Cancelled"]}
                    register={register("status")}
                  />
                  <Select
                    For="shipped"
                    Label="Shipped"
                    Options={["Shipped", "Pending"]}
                    register={register("shipped")}
                  />
                  <input type="submit" />
                </Form>
              </p>
            </Card>
          ) : (
            <Card title="Create Order (Select From Table to Update)">
              <p className="card-text">
                <Form
                  id="order-form"
                  onSubmit={handleSubmit((formValues) => {
                    // @ts-expect-error
                    event.preventDefault();
                    console.log(formValues);
                  })}
                >
                  <Input
                    For="name"
                    Label="Name"
                    placeholder="John Doe"
                    Type="text"
                    register={register("name")}
                    required={true}
                  />
                  <Input
                    For="email"
                    Label="Email"
                    placeholder="John@email.com"
                    Type="text"
                    register={register("email")}
                    required={true}
                  />
                  <Input
                    For="address"
                    Label="Address"
                    placeholder="22 Combine St"
                    Type="text"
                    register={register("address")}
                    required={true}
                  />
                  <Input
                    For="phone"
                    Label="Phone"
                    placeholder="07575 39281"
                    Type="text"
                    register={register("phone")}
                    required={true}
                  />
                  <Input
                    For="products"
                    Label="Products"
                    placeholder="2x Eggs, 3x Item"
                    Type="text"
                    register={register("products")}
                    required={true}
                  />
                  <Input
                    For="Amount"
                    Label="Amount"
                    placeholder="£200"
                    Type="number"
                    register={register("amount")}
                    required={true}
                  />
                  <Select
                    For="status"
                    Label="Status"
                    Options={["Success", "Pending", "Cancelled"]}
                    register={register("status")}
                  />
                  <Select
                    For="shipped"
                    Label="Shipped"
                    Options={["Shipped", "Pending"]}
                    register={register("shipped")}
                  />
                  <input type="submit" />
                </Form>
              </p>
            </Card>
          )}
          <Card
            id="orders-datatable-card"
            bodyID="orders-datatable"
            title="Orders"
          >
            {(data && (
              <DataTable
                columns={columns}
                data={data}
                setRow={setSelectedRow}
              />
            )) || <p>Loading...</p>}
            {isError && (
              <p>
                There was an error fetching the data please try again later...
              </p>
            )}
          </Card>
        </Cards>
      </div>
    </>
  );
};

export default Orders;
