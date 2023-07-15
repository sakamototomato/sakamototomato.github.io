import { SeasonsFC } from './seasons'
import { Loader } from './seasons/components/Loader'

function App() {
    return (
        <>
            <Loader />

            <canvas className="seasons"></canvas>
            <SeasonsFC />
        </>
    )
}

export default App
