import './App.css';
import Barchart from './components/Barchart';
import regions from './regions.csv';
import regions_percentage from './regions_percentage.csv';
function App() {
    return (
        <div className="App">
            <h1>Region Data</h1>
            <Barchart data={regions_percentage} title={'Regions'} />
        </div>
    );
}

export default App;
