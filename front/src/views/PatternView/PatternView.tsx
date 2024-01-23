import {observer} from "mobx-react-lite";
import PatternStore from "../../models/PatternStore/PatternStore";
import GridView from "../GridView/GridView";
import styles from "../GridView/GridView.module.scss";

interface PatternViewProps {
    patternStore: PatternStore
}

const PatternView = observer((props:PatternViewProps) => {
    const crosses = props.patternStore.pattern.crosses
    const crossTypes = props.patternStore.pattern.crossTypes

    const cellRenderer = (i, j, id, className, cssValues) => {
        const cross = crosses?.[i]?.[j]
        const color = cross && crossTypes?.[cross?.[2]]?.color
        const symbol = cross && crossTypes?.[cross?.[2]]?.symbol

        cssValues['backgroundColor'] = `#${color}`

        return (
            <div
                id={id}
                className={className}
                style={cssValues}
            >{symbol}</div>
        )
    }

    return (
        <GridView
            width={props.patternStore.pattern.width}
            height={props.patternStore.pattern.height}
            cellWidth={20}
            cellHeight={20}
            cellRenderer={cellRenderer}
        />
    )
})

export default PatternView
