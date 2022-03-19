/// <reference types="react-scripts" />
interface DataInput{
    name: string,
}

type propsEnterWindow = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}