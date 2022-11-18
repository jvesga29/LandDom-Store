import { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { usePostProductMutation } from "./productsApiSlice"
import { useNavigate } from "react-router-dom"
import useTitle from "../../hooks/useTitle"

const PostUserForm = ({ users }) => {
    useTitle('LandDom: New Product')

    const [addNewProduct, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = usePostProductMutation()

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [stock, setStock] = useState('')
    const [userId, setUserId] = useState(users[0].id)

    useEffect(() => {
        if (isSuccess) {
            setName('')
            setPrice('')
            setDescription('')
            setStock('')
            setUserId('')
            navigate('/dash/products')
        }
    }, [isSuccess, navigate])


    const onNameChanged = e => setName(e.target.value)
    const onPriceChanged = e => setPrice(e.target.value)
    const onDescriptionChanged = e => setDescription(e.target.value)
    const onStockChanged = e => setStock(e.target.value)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [name, price, description, stock, userId].every(Boolean) && !isLoading

    const onSaveProductClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewProduct({ user: userId, name, price, description, stock })
        }
    }

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}
            > {user.username}</option >
        )
    })

    const errClass = isError ? "errmsg" : "offscreen"
    const validNameClass = !name ? "form__input--incomplete" : ''
    const validPriceClass = !price ? "form__input--incomplete" : ''
    const validDescriptionClass = !description ? "form__input--incomplete" : ''
    const validStockClass = !stock ? "form__input--incomplete" : ''


    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveNoteClicked}>
                <div className="form__title-row">
                    <h2>New Note</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="title">
                    Title:</label>
                <input
                    className={`form__input ${validNameClass}`}
                    id="title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={name}
                    onChange={onNameChanged}
                />

                <label className="form__label" htmlFor="text">
                    Text:</label>
                <textarea
                    className={`form__input form__input--text ${validTextClass}`}
                    id="text"
                    name="text"
                    value={text}
                    onChange={onNameChanged}
                />

                <label className="form__label form__checkbox-container" htmlFor="username">
                    ASSIGNED TO:</label>
                <select
                    id="username"
                    name="username"
                    className="form__select"
                    value={userId}
                    onChange={onUserIdChanged}
                >
                    {options}
                </select>

            </form>
        </>
    )

    return content
}
export default PostUserForm