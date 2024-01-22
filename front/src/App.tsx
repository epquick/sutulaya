import GridView from "./views/GridView/GridView";
import LayoutView from "./views/Layout/Layout";

export default function App() {
    return (
        <LayoutView>
            <GridView
                width={120}
                height={70}
                cellWidth={30}
                cellHeight={30}
            />
        </LayoutView>
    );
}
