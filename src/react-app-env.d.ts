/// <reference types="react-scripts" />
interface DataInput{
    name: string,
}

type propsEnterWindow = {
    setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

declare interface ProfileProps {
    name : string
}

type choiceRoomWindowProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}