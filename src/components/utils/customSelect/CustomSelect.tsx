import React, {LegacyRef, useRef} from "react";
import styles from "./customSelect.module.scss"

interface CustomSelectProps {
    options: Array<string>,
    name : string,
    onChangeValue? : (e : React.ChangeEvent<HTMLSelectElement>) => void,
    isSelected: (value: string) => boolean,
}

const CustomSelect : React.FC<CustomSelectProps> = ({options, name, onChangeValue, isSelected}) => {
    const selectRef = useRef<HTMLSelectElement>(null);

    const onChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
        if (onChangeValue) {
            onChangeValue(e)
        }
    }
    
    const onClick = () => {
      if (selectRef.current){
          selectRef.current.focus()
      }
    }

    return (
        <div className={styles.selectWrap} onClick={onClick}>
            <select ref={selectRef} className={styles.select} name={name} id={name} onChange={(event => onChange(event))}>
                {options.map((x) => {
                    return isSelected(x)
                        ? <option className={styles.option} selected={true} key={x} value={x}>{x}</option>
                        : <option className={styles.option} key={x} value={x}>{x}</option>;
                })}
            </select>
        </div>

    )
}

export default CustomSelect;