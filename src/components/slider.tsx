interface props {
    value:number
    min:string
    max:string
    step:string
    clickFn: (e:Event)=>void
    label:string
}

export const Slider=(props:props)=>
    (
        <div>
            <label>{props.label}</label>
            <input type='range'
                   min={props.min}
                   max={props.max}
                   step={props.step}
                   value={props.value.toString()}
                   onInput={props.clickFn}

            />
        </div>

    )
