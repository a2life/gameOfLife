import {useEffect, useState} from "preact/hooks";
import {PushButton} from "./components/pushButton";
import {Cell} from "./components/llifecell";
import {GameOfLife} from "./components/rules";

export const ROWMAX = 50
export const COLMAX = 50

const rows: number[] = [];
for (let x = 0; x < ROWMAX; x++) {
    rows[x] = x;
}
const columns: number[] = [];
for (let x = 0; x < COLMAX; x++) {
    columns[x] = x;
}
const initialGrid = () => rows.map(() => (columns.map(() => false)))
const player = new GameOfLife(initialGrid())
const densitySetter = 'densitySetter'
const speedSetter = 'speedSetter'
let timer: any;

export function App() {
    const [randomizeDensity, setRandomizedDensity] = useState(5)
    const [reproductionTime, setReproductionTime] = useState(500)
    const [playing, setPlaying] = useState(false)
    const [startLabel, setStartLabel] = useState("start");
    const [gridState, setGridState] = useState(initialGrid())
    const randomizeGrid = () => rows.map(() => (columns.map(() => (Math.random() < randomizeDensity / 10))))
    const cellClickHandler = (row: number, col: number) => {
        let tempGrid = gridState;
        tempGrid[row][col] = !gridState[row][col];
        setGridState([...tempGrid]); //needed to make preact aware that array value has changed

    }

    //   console.log(gridState)
    const startButtonHandler = () => {
        if (playing) {
            setPlaying(false)
            setStartLabel('continue');
            clearTimeout(timer)
        } else {
            setPlaying(true);
            setStartLabel('stop');
        }
    }
    const clearButtonHandler = () => {
        console.log('clear the board, stop playing and clear the grid')
        setGridState(initialGrid());
        setStartLabel('start');
        setPlaying(false);
    }
    const randomButtonHandler = () => {
        setStartLabel('start');
        setPlaying(false);
        setGridState(randomizeGrid());
    }


    const timerSliderHandler = () => {
        const domTarget = document.getElementById(speedSetter) as HTMLInputElement;
        setReproductionTime(parseInt(domTarget.value));
    }
    const densitySliderHandler = () => {
        const domTarget = document.getElementById(densitySetter) as HTMLInputElement;
        setRandomizedDensity(parseInt(domTarget.value));
    }
    useEffect(() => {
        if (playing) {  //if playing, this will cause the while true loop as gridState will change after each timer call back.
            timer = setTimeout(() => {
                const nextGrid = player.computeNextGrid((gridState));
                setGridState(JSON.parse(JSON.stringify(nextGrid)))
                console.log('play called')
            }, reproductionTime)
        }
        return () => clearTimeout(timer)
    }, [playing, gridState]);

    return (
        <>
            <h2>Game of Life</h2>

            <div id="gridContainer">
                <table>
                    {
                        rows.map((row: number) => (
                                <tr>
                                    {columns.map((col: number) => (
                                            <Cell fn={cellClickHandler}
                                                  col={col}
                                                  row={row}
                                                  life={gridState[row][col]}/>
                                        )
                                    )}
                                </tr>
                            )
                        )
                    }
                </table>
            </div>
            <PushButton clickFn={startButtonHandler} label={startLabel}/>
            <PushButton clickFn={clearButtonHandler} label="clear"/>
            <PushButton clickFn={randomButtonHandler} label="Randomize"/>
            <div>
                <label>Randomize Density</label>
                <input type='range'
                       min="0" max="10" step="1"
                       value={randomizeDensity}

                       onInput={densitySliderHandler}
                       id={densitySetter}
                />
            </div>
            <div>
                <label>ReProduction Speed</label>
                <input type='range'
                       min="100" max="1000" step="100"
                       value={reproductionTime}

                       onInput={timerSliderHandler}
                       id={speedSetter}
                />
            </div>
        </>
    )
}

