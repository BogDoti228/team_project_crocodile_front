/// <reference types="react-scripts" />
interface DataInput{
    name: string,
}

type propsEnterWindow = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setDataInput: React.Dispatch<React.SetStateAction<DataInput>>;
}

declare interface ProfileProps {
    name : string
}