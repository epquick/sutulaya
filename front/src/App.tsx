import GridView from "./views/GridView/GridView";
import LayoutView from "./views/Layout/Layout";

export default function App() {
    return (
        <LayoutView>
            <GridView
                width={30}
                height={30}
                cellWidth={25}
                cellHeight={25}
            />
        </LayoutView>
    );
}
