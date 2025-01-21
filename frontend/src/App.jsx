import { Route, Routes } from "react-router-dom"
import Search from "./Search.jsx";
import Survey from "./Survey/Survey.jsx";
//import { BookList } from "./BookList"

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Search />} />
            <Route path="search" element={<Search />} />
            <Route path="survey" element={<Survey />} />
        </Routes>
    )
}