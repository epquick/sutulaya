import GridView from "./views/GridView/GridView";
import LayoutView from "./views/Layout/Layout";
import {useEffect, useState} from "react";
import PatternStore from "./models/PatternStore/PatternStore";
import {observer} from "mobx-react-lite";
import PatternView from "./views/PatternView/PatternView";

const App = observer(() => {
    const [patternStore] = useState(new PatternStore())

    useEffect(() => {
        patternStore.loadLastPattern()
    }, [])

    return (
        <LayoutView>
            <PatternView patternStore={patternStore} />
        </LayoutView>
    );
})

export default App