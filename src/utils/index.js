import products from '../products.json'

const KEY = 'M_PRODUCT_DATA'

export const getById = (arr, id) => arr.filter((a) => a.productId === id)

export const getProducts = () => {
    let p = products
    const LOCAL_STORE = localStorage.getItem(KEY)
    if (LOCAL_STORE) {
        const modifiedData = JSON.parse(LOCAL_STORE)
        p = p.map((product) => {
            const modProduct = getById(modifiedData, product.productId)[0]
            if (modProduct) {
                return {
                    ...product,
                    ...modProduct,
                }
            }
            return product
        })
    }
    return p
}

export const updateProduct = (id, product) => {
    const LOCAL_STORE = localStorage.getItem(KEY)
    let data = []
    if (LOCAL_STORE) {
        data = JSON.parse(LOCAL_STORE)
        if (getById(data, id).length) {
            data = data.map((d) => {
                if (d.productId === id) {
                    return {
                        ...d,
                        ...product,
                    }
                }
                return d
            })
        } else {
            data.push({
                ...product,
                productId: id,
            })
        }
    } else {
        data.push({
            ...product,
            productId: id,
        })
    }
    localStorage.setItem(KEY, JSON.stringify(data))
}

export const isFormUpdated = (prevObj, newObj) => (Object.keys(newObj).filter((key) => newObj[key] !== prevObj[key]).length > 0 ? true : false)
