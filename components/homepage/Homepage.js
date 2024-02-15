import classes from './Homepage.module.css'
import SearchBar from './SearchBar'

export default function Homepage(){
    return(
        <div className={classes.Container}>
            <SearchBar/>
        </div>
    )
}

