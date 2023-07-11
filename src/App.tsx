import { SeasonsFC } from './seasons'
import { Loader } from './utils/Loader'

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
