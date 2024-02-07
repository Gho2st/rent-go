import classes from './Homepage.module.css'
import Header from '../UI/header/Header'
import SearchBar from './SearchBar'

export default function Homepage(){
    return(
        <div className={classes.Container}>
            <Header/>
            <SearchBar/>
        </div>
    )
}

