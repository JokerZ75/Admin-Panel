import { Cards, Card } from "@/components/ui/Card";
import React, { useState } from "react";
import { columns, Order } from "../components/Data-table-Columns/OrdersPage";
import { DataTable } from "../components/data-table-orders";
import { Form, Input, Select } from "../components/ui/Form";
import { useFieldArray, useForm, set, FieldValues } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

const Orders = () => {
  const [selectedRow, setSelectedRow] = useState<Order>({} as Order);
  const [products, setProducts] = useState<any[]>([]);

  const { data, isError,refetch } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:8008/orders");
      return data as Order[];
    },
  });

  const { register, control, handleSubmit, setValue, getValues } = useForm({});
  const AddProduct = () => {
    setProducts([...products, {}]);
  };

  React.useEffect(() => {
    setProducts([]);
    if (selectedRow.name) {
      toast.success("Order Selected!");
      setValue("_id", selectedRow._id);
      setValue("name", selectedRow.name);
      setValue("email", selectedRow.email);
      setValue("address", selectedRow.address);
      setValue("phone", selectedRow.phone);
      setProducts(selectedRow.products);
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

  const handleSubmitOrder = (formValues: FieldValues, update = false) => {
    console.log(formValues.products);
    let payload = {
      name: formValues.name,
      email: formValues.email,
      address: formValues.address,
      phone: formValues.phone,
      products: formValues.products.flatMap((product: any) => {
        return [
          {
            item: product["item"],
            quantity: parseInt(product["quantity"]),
            price: parseInt(product["price"]),
          },
        ];
      }),
      amount: formValues.products.reduce((acc: number, product: any) => {
        return (
          acc +
          parseInt(product["quantity"]) *
            parseInt(product["price"])
        );
      }, 0),
      status: formValues.status,
      shipped: formValues.shipped,
    };
    console.log(payload);
    if (update) {
      const requestURL = `http://localhost:8008/orders/update/${formValues._id}`;
      axios.put(requestURL, payload).then((res) => {
        if (res.status === 200) {
          toast.success("Order Updated Successfully!");
          refetch();
        }
        else if (res.status === 400) {
          toast.error("Order Failed To Update!");
        }
      });
    } else {
      axios.post("http://localhost:8008/orders/add", payload).then((res) => {
        if (res.status === 200) {
          toast.success("Order Added Successfully!");
          refetch();
        }
        else if (res.status === 400) {
          toast.error("Order Failed To Add!");
        }
      });
    }
  };

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
                    event?.preventDefault();
                    handleSubmitOrder(formValues, true);
                  })}
                >
                  <input type="hidden" {...register("_id")} />
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
                  <div>
                    <label id="product-label" htmlFor="Products">
                      Products
                    </label>
                    <div id="products-form-inputs">
                      <input
                        type="button"
                        id="addProduct"
                        value={"Add Product"}
                        onClick={AddProduct}
                      />
                      {products.map((product, index) => {
                        return (
                          <div key={index}>
                            <label htmlFor={`item-${index}`}>
                              Product
                            </label>
                            <input
                              type="text"
                              id={`item-${index}`}
                              placeholder="Product Name"
                              {...register(`products.${index}.item`)}
                              defaultValue={product["item"]}
                            />
                            <label htmlFor={`quantity-${index}`}>
                              Quantity
                            </label>
                            <input
                              type="number"
                              id={`quantity-${index}`}
                              placeholder="Product Quantity"
                              min={1}
                              {...register(
                                `products.${index}.quantity`
                              )}
                              defaultValue={product["quantity"]}
                            />
                            <label htmlFor={`price-${index}`}>
                              Price
                            </label>
                            <input
                              type="number"
                              id={`price-${index}`}
                              placeholder="Product Price In £"
                              min={1}
                              {...register(`products.${index}.price`)}
                              defaultValue={product["price"]}
                            />
                            <input
                              type="button"
                              value="Remove"
                              data-index={index}
                              onClick={() => {
                                event?.preventDefault(); // @ts-expect-error
                                event?.target.parentElement?.remove();
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
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
                    event?.preventDefault();
                    handleSubmitOrder(formValues);
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
                  <div>
                    <label id="product-label" htmlFor="Products">
                      Products
                    </label>
                    <div id="products-form-inputs">
                      <input
                        type="button"
                        id="addProduct"
                        value={"Add Product"}
                        onClick={AddProduct}
                      />
                      {products.map((product, index) => {
                        return (
                          <div key={index}>
                            <label htmlFor={`item-${index}`}>
                              Product
                            </label>
                            <input
                              type="text"
                              id={`item-${index}`}
                              placeholder="Product Name"
                              {...register(`products.${index}.item`)}
                              value={product["item"]}
                            />
                            <label htmlFor={`quantity-${index}`}>
                              Quantity
                            </label>
                            <input
                              type="number"
                              id={`quantity-${index}`}
                              placeholder="Product Quantity"
                              min={1}
                              defaultValue={1}
                              {...register(
                                `products.${index}.quantity`
                              )}
                              value={product["quantity"]}
                            />
                            <label htmlFor={`price-${index}`}>
                              Price
                            </label>
                            <input
                              type="number"
                              id={`price-${index}`}
                              placeholder="Product Price In £"
                              min={1}
                              {...register(`products.${index}.price`)}
                              value={product["price"]}
                            />
                            <input
                              type="button"
                              value="Remove"
                              data-index={index}
                              onClick={() => {
                                event?.preventDefault(); // @ts-expect-error
                                event?.target.parentElement?.remove();
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
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
            cardClass="force-wrap"
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
