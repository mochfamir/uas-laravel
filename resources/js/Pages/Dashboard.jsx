import { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Sidebar from "@/Components/Sidebar";
import MenuProduct from "@/Components/MenuProduct";

export default function Dashboard({ auth }) {
    const [selectedKey, setSelectedKey] = useState("products");
    const [content, setContent] = useState(<h1>halo</h1>);

    useEffect(() => {
        console.log(selectedKey);
        switch (selectedKey) {
            case "products":
                setContent(<MenuProduct />);
                break;

            default:
                setContent(<h1>HOHOHO</h1>);
                break;
        }
    }, [selectedKey]);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Sidebar setSelectedKey={setSelectedKey} content={content} />
        </AuthenticatedLayout>
    );
}
