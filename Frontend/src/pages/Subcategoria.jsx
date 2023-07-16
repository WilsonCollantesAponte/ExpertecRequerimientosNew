import { useParams } from "react-router-dom";
import ListPost from "../components/ListPost";
const Subcategoria = () => {
    const { subcategoria } = useParams();
    return <ListPost url={`/posts?subcategoria=${subcategoria}`} />;
};

export default Subcategoria;
