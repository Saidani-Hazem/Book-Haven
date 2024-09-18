import './App.css';
import MobileDrawer from './MuiComponents/MobileDrawer';



function App() {
  return (
    <div className="App">
      
      <MobileDrawer/>
    </div>
  );
}

export default App;


  /*useEffect(() => {
    axios
      .get("https://gutendex.com/books/?page=1")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);
  console.log(books.results)*/