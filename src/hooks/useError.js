import { useState } from "react";

const useError = () => {

    let [errors, setErrors] = useState([])

    const errorExist = (pathName) => {
        if (errors.length > 0) {
            return errors.find(value => value.path === pathName)
        }
    }

    return [setErrors, errorExist]

}

export default useError