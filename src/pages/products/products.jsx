import React, { useEffect, useState } from "react";

import {
    Add,
    FilterAltOutlined,
    Edit,
    PersonOffOutlined,
    PersonOutlineOutlined,
    Delete,
} from "@mui/icons-material";
import "../../css/main.css";
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { Modal, message } from "antd";
import CreateProduct from "./createProduct";
import { axiosInstance } from "../../utils/axiosIntance";

const Products = () => {
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(false);
    const [proData, setProData] = useState({});
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState({ name: "", code: "" });

    const [proUnits, setProUnits] = useState([]);

    useEffect(() => {
        getProducts();
        getProductUnits();
    }, []);

    const fillterData = () => {
        getProducts();
    };
    const getProducts = () => {
        axiosInstance
            .get("/api/pro/all", {
                params: {
                    name: filter.name,
                    code: filter.code,
                },
            })
            .then((data) => {
                console.log("products", data.data);
                setData(data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const updatePro = () => {
        console.log(proData);
        if (
            proData.name.length > 0 &&
            proData.code.length > 0 &&
            proData.price != 0
        ) {
            axiosInstance
                .patch("/api/pro/update", proData)
                .then((data) => {
                    message.success(data.data);
                    getProducts();
                    setUpdate(false);
                })
                .catch((err) => {
                    console.log(err);
                    message.warning("Network error!");
                });
        } else {
            message.warning("Maglumatlary doly girizin!");
        }
    };

    const DeleteProduct = (id) => {
        axiosInstance
            .patch("/api/pro/delete/" + id)
            .then((data) => {
                getProducts();
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const ActiveStore = (id) => {
        axiosInstance
            .patch("/api/store/active/" + id)
            .then((data) => {
                getProducts();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getProductUnits = () => {
        axiosInstance
            .get("/api/pro/unit/all")
            .then((data) => {
                setProUnits(data.data);
                console.log(data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className="w-full bg-background min-h-[100vh] pt-8 pb-8">
            <Modal
                className="font-roboto"
                width={700}
                open={open}
                onCancel={() => setOpen(false)}
                footer={false}
            >
                <div className="bg-white">
                    <CreateProduct
                        getData={getProducts}
                        onClose={() => setOpen(false)}
                    />
                </div>
            </Modal>
            <Modal
                className="font-roboto"
                width={700}
                open={update}
                onCancel={() => setUpdate(false)}
                footer={false}
            >
                <div className="bg-white">
                    <div className="w-full pt-0">
                        <h1 className="font-roboto text-black text-[24px] pb-4">
                            Haryt üýtgetmek
                        </h1>
                        <div className="my-3">
                            <TextField
                                className="h-[42px] font-roboto w-full"
                                id="outlined-basic"
                                label="Harydyň ady"
                                variant="outlined"
                                size="small"
                                value={proData.name}
                                onChange={(e) =>
                                    setProData({
                                        ...proData,
                                        name: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="my-3 flex justify-between">
                            <TextField
                                className="h-[42px] font-roboto w-[69%]"
                                id="outlined-basic"
                                label="Harydyň kody"
                                variant="outlined"
                                size="small"
                                value={proData.code}
                                onChange={(e) =>
                                    setProData({
                                        ...proData,
                                        code: e.target.value,
                                    })
                                }
                            />
                            <FormControl
                                size="small"
                                sx={{ m: 0, minWidth: "30%" }}
                            >
                                <InputLabel id="demo-simple-select-helper-label">
                                    Haryt ölçegi
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    // value={age}
                                    label="Wezipesi"
                                    defaultValue={proData.ProductUnit}
                                    onChange={(e) =>
                                        setProData({
                                            ...proData,
                                            ProductUnitId: e.target.value,
                                        })
                                    }
                                >
                                    {proUnits?.map((item) => {
                                        return (
                                            <MenuItem
                                                className="text-green"
                                                value={item.id}
                                            >
                                                {item.title}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="my-3 flex justify-between">
                            <TextField
                                className="h-[42px] font-roboto w-[48%]"
                                id="outlined-basic"
                                label="Harydyň bahasy"
                                variant="outlined"
                                size="small"
                                value={proData?.price}
                                onChange={(e) =>
                                    setProData({
                                        ...proData,
                                        price: e.target.value,
                                    })
                                }
                            />
                            <TextField
                                className="h-[42px] font-roboto w-[48%]"
                                id="outlined-basic"
                                label="Kredit göterimi"
                                variant="outlined"
                                size="small"
                                value={proData?.credit_precentage}
                                onChange={(e) =>
                                    setProData({
                                        ...proData,
                                        credit_precentage: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="my-3"></div>

                        <div className="w-full inline-flex justify-end mt-10">
                            <div className="mr-4">
                                <Button
                                    onClick={() => setUpdate(false)}
                                    color="error"
                                    variant="outlined"
                                >
                                    Goýbolsun et
                                </Button>
                            </div>
                            <div className="mr-0">
                                <Button
                                    onClick={() => updatePro()}
                                    variant="outlined"
                                >
                                    Üýtget
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            <div className="w-[95%] mx-auto">
                <div className="w-[100%]  py-4  m-auto inline-flex justify-between">
                    <h5 className="text-[24px] leading-[42px] text-black font-[500] font-roboto whitespace-nowrap">
                        Harytlar
                    </h5>

                    <Button
                        onClick={() => setOpen(true)}
                        startIcon={<Add />}
                        variant="contained"
                        className="h-[42px] !text-[12px] bg-primary-light font-roboto"
                    >
                        Täze goş
                    </Button>
                </div>

                <div className="w-[100%]  bg-white px-4 py-4  m-auto inline-flex justify-between">
                    <div className="inline-flex justify-start">
                        <div className="mr-4">
                            <TextField
                                className="h-[42px] font-roboto"
                                id="outlined-basic"
                                label="Harydyň ady"
                                variant="outlined"
                                size="small"
                                value={filter.name}
                                onChange={(e) =>
                                    setFilter({
                                        ...filter,
                                        name: e.target.value,
                                    })
                                }
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        fillterData();
                                    }
                                }}
                            />
                        </div>
                        <div className="mr-4">
                            <TextField
                                className="h-[42px] font-roboto"
                                id="outlined-basic"
                                label="Harydyň kody"
                                variant="outlined"
                                size="small"
                                value={filter.code}
                                onChange={(e) =>
                                    setFilter({
                                        ...filter,
                                        code: e.target.value,
                                    })
                                }
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        fillterData();
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <Button
                        onClick={() => fillterData()}
                        startIcon={<FilterAltOutlined />}
                        variant="contained"
                        className="h-[42px] !text-[12px] bg-primary-light font-roboto"
                    >
                        Filter
                    </Button>
                </div>
            </div>
            <div className="w-[95%] mt-6 mx-auto bg-white">
                <table className="w-full border-collapse ">
                    <thead>
                        <tr className="border-b-2">
                            <th className="py-4 px-5 font-roboto">
                                Harydyň ady
                            </th>
                            <th className="py-4 px-5 font-roboto">
                                Harydyň kody
                            </th>
                            <th className="py-4 px-5 font-roboto">
                                Ölçeg birligi
                            </th>
                            <th className="py-4 px-5 font-roboto">
                                Nagt Bahasy
                            </th>
                            <th className="py-4 px-5 font-roboto">
                                Kredit Göterimi
                            </th>
                            <th className="py-4 px-5 font-roboto">
                                Kredit Bahasy
                            </th>
                            <th className="py-4 px-5 font-roboto">
                                Hereketler
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((item) => {
                            return (
                                <tr
                                    key={item.id + "store"}
                                    className="border-b-2"
                                >
                                    <td className="py-4 px-5 font-roboto">
                                        {item?.name}
                                    </td>
                                    <td className="py-4 px-5 font-roboto">
                                        {item?.code}
                                    </td>
                                    <td className="py-4 px-5 font-roboto">
                                        {item?.ProductUnit?.title}
                                    </td>
                                    <td className="py-4 px-5 font-roboto">
                                        {item?.price}
                                    </td>
                                    <td className="py-4 px-5 font-roboto">
                                        {item?.credit_precentage}
                                    </td>
                                    <td className="py-4 px-5 font-roboto">
                                        {item?.price +
                                            (item?.price *
                                                item?.credit_precentage) /
                                                100}
                                    </td>
                                    <td className="py-4 px-5 font-roboto text-primary-dark">
                                        <Edit
                                            onClick={() => {
                                                setUpdate(true);
                                                setProData(item);
                                            }}
                                        />

                                        <Delete
                                            onClick={() =>
                                                DeleteProduct(item?.id)
                                            }
                                            className="text-red ml-2"
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Products;
