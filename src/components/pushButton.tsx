interface Props {
    clickFn: () => void,
    label: string
}

export const PushButton = (props: Props) => (
    <button onClick={props.clickFn}>{props.label}</button>
)

