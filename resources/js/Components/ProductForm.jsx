import { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Space } from "antd";
import InputFile from "./InputFile";
import axios from "axios";

const defaultData = {
    name: "",
    description: "",
    type: "obat",
    stock: 0,
    buy_price: 0,
    sell_price: 0,
    image: null,
};

const ProductForm = ({ dialogProps, setDialogProps }) => {
    const [data, setData] = useState({ ...defaultData });
    const showModal = () => {};
    const handleOk = () => {
        const bodyFormData = new FormData();
        bodyFormData.append("name", data.name);
        bodyFormData.append("description", data.description);
        bodyFormData.append("type", data.type);
        bodyFormData.append("stock", data.stock);
        bodyFormData.append("buy_price", data.buy_price);
        bodyFormData.append("sell_price", data.sell_price);

        if (typeof data.image !== "string") {
            bodyFormData.append("image", data.image);
        }

        if (data?.id) {
            axios({
                method: "POST",
                url: "/api/products/" + data.id,
                headers: {
                    accept: "application/json",
                    "Content-Type": "multipart/form-data",
                },
                data: bodyFormData,
            })
                .then((res) => handleCancel())
                .catch((err) => console.log(err));
        } else {
            axios({
                method: "POST",
                url: "/api/products",
                headers: {
                    accept: "application/json",
                    "Content-Type": "multipart/form-data",
                },
                data: bodyFormData,
            })
                .then((res) => handleCancel())
                .catch((err) => console.log(err));
        }
    };
    const handleCancel = () => {
        setDialogProps({ data: {}, isOpen: false });
    };
    const handleDelete = () => {
        axios({
            method: "DELETE",
            url: "/api/products/" + data.id,
            headers: {
                accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
        })
            .then((res) => handleCancel())
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        const dataProps = dialogProps.data;
        setData(dataProps?.id ? dataProps : defaultData);
    }, [dialogProps]);

    return (
        <Modal
            title={data?.id ? "Edit Produk" : "Produk Baru"}
            open={dialogProps.isOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button key="cancel" type="text" onClick={handleCancel}>
                    Cancel
                </Button>,
                data?.id ? (
                    <Button key="delete" danger onClick={handleDelete}>
                        Delete
                    </Button>
                ) : null,
                <Button key="submit" onClick={handleOk}>
                    Submit
                </Button>,
            ]}
        >
            <Space direction="vertical" style={{ width: "100%" }}>
                <div>
                    Nama Produk:{" "}
                    <Input
                        placeholder="name"
                        value={data.name}
                        onChange={(e) =>
                            setData({ ...data, name: e.target.value })
                        }
                    />
                </div>
                <div>
                    Deskripsi Produk:{" "}
                    <Input.TextArea
                        rows={4}
                        placeholder="description"
                        maxLength={200}
                        value={data.description}
                        onChange={(e) =>
                            setData({ ...data, description: e.target.value })
                        }
                    />
                </div>
                <div>
                    Upload Gambar:{" "}
                    <InputFile
                        setFile={(file) => setData({ ...data, image: file })}
                    />
                </div>
                <div>
                    Stock:{" "}
                    <Input
                        type="number"
                        placeholder="stock"
                        value={data.stock}
                        onChange={(e) =>
                            setData({
                                ...data,
                                stock: Number(e.target.value),
                            })
                        }
                    />
                </div>
                <div>
                    Harga Beli:{" "}
                    <Input
                        type="number"
                        placeholder="buy price"
                        value={data.buy_price}
                        onChange={(e) =>
                            setData({
                                ...data,
                                buy_price: Number(e.target.value),
                            })
                        }
                    />
                </div>
                <div>
                    Harga Jual:{" "}
                    <Input
                        type="number"
                        placeholder="sell price"
                        value={data.sell_price}
                        onChange={(e) =>
                            setData({
                                ...data,
                                sell_price: Number(e.target.value),
                            })
                        }
                    />
                </div>
            </Space>
        </Modal>
    );
};
export default ProductForm;
