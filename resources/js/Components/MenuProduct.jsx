import { Button, Row, Typography } from "antd";
import ProductTable from "./ProductTable";
import { useState } from "react";
import ProductForm from "./ProductForm";

const defaultDialogProps = {
    isOpen: false,
    data: {},
};

const MenuProduct = (props) => {
    const [dialogProps, setDialogProps] = useState({ ...defaultDialogProps });

    return (
        <>
            <Row justify="space-between">
                <Typography.Title level={3}>Products</Typography.Title>
                <Button
                    type="default"
                    onClick={() =>
                        setDialogProps({ ...defaultDialogProps, isOpen: true })
                    }
                >
                    Add New Product
                </Button>
            </Row>
            <br />
            <ProductTable setDialogProps={setDialogProps} dialogProps={dialogProps} />
            <ProductForm
                dialogProps={dialogProps}
                setDialogProps={setDialogProps}
            />
        </>
    );
};

export default MenuProduct;
