import CategoryItem from "../category-item/category-item-component";
import "./directory.styles.scss"
const Directory = ({ categories }) => {
    return(
    <div className='directories-container'>
        {categories.map(({ title, id, imageUrl }) => (
            <CategoryItem key={id} imageUrl={imageUrl} title={title} />
        ))}
    </div>
    )
}
export default Directory;