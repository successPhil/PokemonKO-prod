import ProgressBar from "../../src/features/ProgressBar/ProgressBar";
import { expect, test } from 'vitest'

test("Progress Bar renders without crashing", ()=>{
    const progressBar = <ProgressBar />
    expect(progressBar).toMatchSnapshot()
})