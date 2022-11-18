import { useNavigate } from 'react-router-dom'
import { useGetProductsQuery } from './productsApiSlice'
import { memo } from 'react'
import useTitle from '../../hooks/useTitle'

const Product = ({ productId }) => {
    useTitle('Product')

    const { product } = useGetProductsQuery("productsList", {
        selectFromResult: ({ data }) => ({
            product: data?.entities[productId]
        }),
    })

    const navigate = useNavigate()

    if (product) {
        const handleEdit = () => navigate(`/dash/products/${productId}`)

        const productRolesString = product.roles.toString().replaceAll(',', ', ')

        const cellStatus = product.active ? '' : 'table__cell--inactive'

        return (
            <tr className="table__row product">
                <td className={`table__cell ${cellStatus}`}>{product.user}</td>
                <td className={`table__cell ${cellStatus}`}>{productRolesString}</td>
                <td className={`table__cell ${cellStatus}`}>{product.email}</td>
                <td className={`table__cell ${cellStatus}`}>
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        Button
                    </button>
                </td>
            </tr>
        )

    } else return null
}

const memoizedProduct = memo(Product)

export default memoizedProduct