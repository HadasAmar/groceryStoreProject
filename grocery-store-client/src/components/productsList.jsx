import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames } from "../axios/gameAxios";
import { load_games } from "../redux/actions/gameAction";
import { Link } from "react-router-dom";
import { add_Item } from "../redux/actions/orderAction";
import { getAllCategories } from "../axios/ordersAxios";
import { load_categories } from "../redux/actions/categoryAction";

export const HomePage = () => {

    let myGames = useSelector((x) => x.dataGameReducer.listGames);
    let myCategories = useSelector((x) => x.dataCategoryReducer.listCategories);

    const [filterGames, setFilterGames] = useState([])
    const dispatch = useDispatch();

    useEffect(() => {
        if (myGames != null && myGames.length == 0) {
            getAllGames()
                .then((x) => dispatch(load_games(x.data)))
                .catch((err) => console.log(err));
        }
        if (myGames && myGames.length > 0) {
            setFilterGames(myGames);
        }
   
        if (myCategories != null && myCategories.length === 0) {
            getAllCategories()
                .then((x) => dispatch(load_categories(x.data)))
                .catch((err) => console.log(err));
        }
    }, [myGames, myCategories]);

    const addToCart = (item) => {

        const obj = { ...item, amount: 1 }
        dispatch(add_Item(obj))
    }

    console.log("games ", myGames)
    console.log("filter ", filterGames)
    return (
        <>
            <div style={{ backgroundColor: "#e9f7fc", minHeight: "100vh" }}>
                <div className="container m-0 d-flex justify-content-center p-3" style={{ gap: "20px" }}>
                    <input
                        className="form-control w-50 m-0"
                        placeholder="חפש לפי שם..."
                        onChange={(e) => {
                            if (myGames && myGames.length > 0) {
                                setFilterGames(myGames.filter(x => x.name.startsWith(e.target.value)));
                            }
                        }}

                    />
                    <select
                        className="form-select w-25 m-0"
                        onChange={(e) => {
                            if (myGames && myGames.length > 0) {
                                if (e.target.value == "")
                                    setFilterGames(myGames);

                                else
                                    setFilterGames(myGames.filter(x => x.id_category == e.target.value));
                            }
                        }}>
                        <option value="">כל הקטגוריות</option>
                        {myCategories.map((category, i) => (
                            <option key={category._id} value={category._id}>{category.name}</option>
                        ))}
                    </select>
                </div>

                <div className="container d-flex flex-wrap justify-content-center gap-5 py-3 margin">
                    {filterGames.map((item, i) => (
                        <div
                            className="card shadow-lg rounded-3 border-0"
                            style={{ width: "12rem", transition: "transform 0.2s" }}
                        >
                            <div
                                className="card-img-top rounded-top"
                                style={{
                                    height: "180px",
                                    padding: "20px", 
                                    backgroundColor: "#f8f9fa", 
                                }}
                            >
                                <img
                                    src={`http://localhost:8080/${item.img}`}
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                        objectFit: "cover",
                                        borderRadius: "5px",
                                    }}
                                />
                            </div>
                            <div className="card-body text-center">
                                <h4 className="card-title text-dark">{item.name}</h4>
                                <button href="#" className="btn btn-primary w-100" onClick={() => { addToCart(item); alert("המשחק נוסף לעגלה") }}>
                                    הוסף לעגלה
                                </button>
                                <Link
                                    to={`/details/${item._id}`}
                                    className="btn w-100"
                                    style={{
                                        backgroundColor: "transparent",
                                        fontSize: "0.9rem",
                                        color: "#007bff",
                                    }}
                                >
                                    פרטים נוספים
                                </Link>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </>
    );
};
