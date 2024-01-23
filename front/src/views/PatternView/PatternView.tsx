import {observer} from "mobx-react-lite";
import PatternStore from "../../models/PatternStore/PatternStore";
import GridView from "../GridView/GridView";
import gridStyles from "../GridView/GridView.module.scss";
import GridViewCanvas from "../GridViewCanvas/GridViewCanvas";

interface PatternViewProps {
    patternStore: PatternStore
}

const PatternView = observer((props:PatternViewProps) => {
    const crosses = props.patternStore.pattern.crosses
    const crossTypes = props.patternStore.pattern.crossTypes

    const cellRenderer = (i, j, left, top, width, height, ctx) => {
        const cross = crosses?.[i]?.[j]
        const color = cross && crossTypes?.[cross?.[2]]?.color
        const symbol = cross && crossTypes?.[cross?.[2]]?.symbol

        ctx.fillStyle = `#${color}`
        ctx.fillRect(left, top, width, height)

        // const onClick = () => {
        //     if (cross) {
        //         cross[1] = !cross[1]
        //     }
        // }
        //
        // const classNames = [className, cross?.[1] && gridStyles.cellDone]
        //
        // return (
        //     <div
        //         key={id}
        //         className={classNames.filter(cn => !!cn).join(' ')}
        //         style={cssValues}
        //         onClick={onClick}
        //     >{symbol}</div>
        // )
    }

    return (
        <GridViewCanvas
            width={props.patternStore.pattern.width}
            height={props.patternStore.pattern.height}
            cellWidth={20}
            cellHeight={20}
            cellRenderer={cellRenderer}
            iteration={props.patternStore.iteration}
        />
    )
})

export default PatternView
