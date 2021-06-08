import {useEffect, useState} from 'preact/hooks'


export const Cell = (props: { fn: (a: number, b: number) => void, col: number, row: number, life: boolean }) => {
    //   const [lifeOrDead, setCell] = useState(false);

    const clickHandler = () => {
        props.fn(props.row, props.col)

    }


    return (<td onClick={clickHandler} id={props.row.toString() + '_' + props.col.toString()}
                class={props.life ? 'live' : 'dead'}></td>)


}


