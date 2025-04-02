import { Route, Routes } from "react-router-dom"
import { ListGames } from "./listGames"
import { ListCategories } from "./listCategories"
import { AddCategory } from "./addCategory"
import { ListUsers } from "./listUsers"
import { Login } from "./login"
import { AddGame } from "./addGame"
import { HomePage } from "./productsList"
import DetailsGame from "./detailsGame"
import Cart from "./cart"
import { OrderHistory } from "./ordersBySupplier"
import { Register } from "./register"
import { DetailsOrder } from "./detailsOrder"
export const Routing = () => {

    return <Routes>
        <Route path="myLogin" element={<Login></Login>}></Route>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="myRegister" element={<Register></Register>}></Route>
        <Route path="myHome" element={<HomePage></HomePage>}></Route>
        <Route path="myGames" element={<ListGames></ListGames>} ></Route>
        <Route path="myCategories" element={<ListCategories></ListCategories>}></Route>
        <Route path="myUsers" element={<ListUsers></ListUsers>}></Route>
        <Route path="myAddCategory" element={<AddCategory></AddCategory>}></Route>
        <Route path="myAddGame" element={<AddGame></AddGame>}></Route>
        <Route path="myEditGame/:id" element={<AddGame></AddGame>}></Route>
        <Route path="myCart" element={<Cart></Cart>}></Route>
        <Route path="myOrdersHistory" element={<OrderHistory></OrderHistory>}></Route>
        <Route path="myEditCategory/:id" element={<AddCategory></AddCategory>}></Route>
        <Route path="details/:id" element={<DetailsGame></DetailsGame>}></Route>
        <Route path="detailsOrder/:id" element={<DetailsOrder></DetailsOrder>}></Route>

    </Routes>
}