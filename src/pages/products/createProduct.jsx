import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { axiosInstance } from "../../utils/axiosIntance";
import { message } from "antd";

const CreateProducts = (props) => {
    const [data, setData] = useState({
        name: "",
        code: "",
        price: 0,
        credit_precentage: 0,
        discount: 0,
        ProductUnitId: 0,
    });

    const [proUnits, setProUnits] = useState([]);

    useEffect(() => {
        getProductUnits();
    }, []);

    const createStore = () => {
        console.log(data);
        if (
            data.name.length > 0 &&
            data.code.length > 0 &&
            data.price != 0 &&
            data.ProductUnitId != 0
        ) {
            axiosInstance
                .post("/api/pro/create", data)
                .then((data) => {
                    console.log(data.data);

                    message.success("Success!");
                    props.getData();
                    props.onClose();
                })
                .catch((err) => {
                    console.log(err);
                    message.warning("Network error!");
                });
        } else {
            message.warning("Maglumatlary doly girizin!");
        }
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
        <div className="w-full pt-0">
            <h1 className="font-roboto text-black text-[24px] pb-4">
                Haryt döretmek
            </h1>
            <div className="my-3">
                <TextField
                    className="h-[42px] font-roboto w-full"
                    id="outlined-basic"
                    label="Harydyň ady"
                    variant="outlined"
                    size="small"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                />
            </div>
            <div className="my-3 flex justify-between">
                <TextField
                    className="h-[42px] font-roboto w-[69%]"
                    id="outlined-basic"
                    label="Harydyň kody"
                    variant="outlined"
                    size="small"
                    value={data.code}
                    onChange={(e) => setData({ ...data, code: e.target.value })}
                />
                <FormControl size="small" sx={{ m: 0, minWidth: "30%" }}>
                    <InputLabel id="demo-simple-select-helper-label">
                        Haryt ölçegi
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        // value={age}
                        label="Wezipesi"
                        onChange={(e) =>
                            setData({ ...data, ProductUnitId: e.target.value })
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
                    value={data?.price}
                    onChange={(e) =>
                        setData({ ...data, price: e.target.value })
                    }
                />
                <TextField
                    className="h-[42px] font-roboto w-[48%]"
                    id="outlined-basic"
                    label="Kredit göterimi"
                    variant="outlined"
                    size="small"
                    value={data?.credit_precentage}
                    onChange={(e) =>
                        setData({ ...data, credit_precentage: e.target.value })
                    }
                />
            </div>
            <div className="my-3"></div>

            <div className="w-full inline-flex justify-end mt-10">
                <div className="mr-4">
                    <Button
                        onClick={() => props.onClose()}
                        color="error"
                        variant="outlined"
                    >
                        Goýbolsun et
                    </Button>
                </div>
                <div className="mr-0">
                    <Button onClick={() => createStore()} variant="outlined">
                        Döret
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default React.memo(CreateProducts);
