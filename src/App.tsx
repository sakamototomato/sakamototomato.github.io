import { Loader } from './utils/Loader'
import { SeasonsFC } from './seasons'

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
