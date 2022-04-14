import React from "react";
import styles from "./customSelect.module.scss"

interface CustomSelectProps {
    options: Array<string>,
    name : string,
    onChangeValue? : (e : React.ChangeEvent<HTMLSelectElement>) => void
}

const CustomSelect : React.FC<CustomSelectProps> = ({options, name, onChangeValue}) => {

    const onChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
        if (onChangeValue) {
            onChangeValue(e)
        }
    }

    return (
        <div className={styles.selectWrap}>
            <select className={styles.select} name={name} id={name} onChange={(event => onChange(event))}>
                {options.map((x) => <option value={x}>{x}</option>)}
            </select>
        </div>

    )
}

export default CustomSelect;