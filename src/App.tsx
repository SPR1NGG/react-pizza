import './assets/scss/app.scss';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import {Route, Routes} from 'react-router-dom';
import Cart from './pages/Cart';
import Pizza from "./pages/Pizza";
import MainLayout from "./layouts/MainLayout";

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout/>}>
                <Route index element={<Home/>}/>
                <Route path="pizzas/:id" element={<Pizza/>}/>
                <Route path="*" element={<NotFound/>}/>
                <Route path="cart" element={<Cart/>}/>
            </Route>
        </Routes>
    );
}

export default App;
