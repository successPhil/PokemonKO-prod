import {expect, test} from "vitest"
import ResponsiveAppBar from "../../src/features/AppBar/AppBar";

test("App Bar renders without crashing", ()=> {
    const component = <ResponsiveAppBar />;
    expect(component).toMatchSnapshot();
})