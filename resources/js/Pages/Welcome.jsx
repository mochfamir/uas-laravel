import { useState, useEffect } from "react";
import { Link, Head } from "@inertiajs/react";
import { Card, Col, Row, Typography } from "antd";
import axios from "axios";

const { Meta } = Card;

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [data, setData] = useState([]);

    useEffect(() => {
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
    }, []);

    return (
        <>
            <Head title="Welcome" />
            <Typography.Title>Toko Obat</Typography.Title>
            <Row gutter={[16, 16]}>
                {data.map((datum) => (
                    <Col span={6}>
                        <Card
                            key={datum.id}
                            hoverable
                            style={{ width: 240 }}
                            cover={<img alt="example" src={datum.image} />}
                        >
                            <Meta
                                title={datum.name}
                                description={datum.description}
                            />
                            <Typography.Text>
                                Rp. {datum.sell_price}
                            </Typography.Text>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    );
}
