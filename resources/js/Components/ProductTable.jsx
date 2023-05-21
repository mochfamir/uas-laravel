import { Space, Table, Tag } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const ProductTable = (props) => {
    const [data, setData] = useState([]);

    const columns = [
        {
            title: "Nama",
            dataIndex: "name",
            key: "name",
            render: (text, row) => (
                <a
                    onClick={() =>
                        props.setDialogProps({
                            isOpen: true,
                            data: row,
                        })
                    }
                >
                    {text}
                </a>
            ),
        },
        {
            title: "Gambar",
            dataIndex: "image",
            key: "image",
            render: (text) => <img width={64} src={text} />,
        },
        {
            title: "Harga Jual",
            dataIndex: "sell_price",
            key: "sell_price",
        },
        {
            title: "Stok",
            dataIndex: "stock",
            key: "stock",
        },
    ];

    useEffect(() => {
        if (props.dialogProps.isOpen === false) {
            axios
                .get("/api/products", {
                    headers: {
                        accept: "application/json",
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then(({ data }) =>
                    setData(
                        data.products.map((datum) => ({
                            ...datum,
                            key: datum.id,
                        }))
                    )
                )
                .catch((err) => console.log(err));
        }
    }, [props.dialogProps]);

    return <Table columns={columns} dataSource={data} size={2} />;
};
export default ProductTable;
