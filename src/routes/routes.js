import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";

import {
    Customers,
    Employees,
    Home,
    Loans,
    Login,
    Products,
    Stores,
} from "../pages/index";
import { Loading } from "../components/loading";

const PrivateRoute = lazy(() => import("./PrivateRoute"));
const PublicRoute = lazy(() => import("./PublicRoute"));
const App = () => {
    return (
        // forceRefresh={true}
        // history={history}
        <BrowserRouter>
            <Suspense fallback={<Loading />}>
                <Switch>
                    <PublicRoute
                        restricted={true}
                        component={Login}
                        path="/"
                        exact
                    />
                    <PrivateRoute
                        restricted={true}
                        component={Home}
                        path="/home"
                        exact
                    />
                    <PrivateRoute
                        restricted={true}
                        component={Loans}
                        path="/loans"
                        exact
                    />
                    <PrivateRoute
                        restricted={true}
                        component={Customers}
                        path="/customers"
                        exact
                    />
                    <PrivateRoute
                        restricted={true}
                        component={Stores}
                        path="/stores"
                        exact
                    />
                    <PrivateRoute
                        restricted={true}
                        component={Employees}
                        path="/employees"
                        exact
                    />
                    <PrivateRoute
                        restricted={true}
                        component={Products}
                        path="/products"
                        exact
                    />
                    <PrivateRoute
                        restricted={true}
                        component={Home}
                        path="/reports"
                        exact
                    />

                    <Route path="*" component={Login} />
                </Switch>
            </Suspense>
        </BrowserRouter>
    );
};

export default App;
