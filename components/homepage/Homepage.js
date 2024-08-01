import classes from './Homepage.module.css'
import SearchBar from './SearchBar'
import Posts from './posts/Posts'

export default function Homepage(){
    return(
        <div className={classes.Container}>
            <SearchBar/>
            {/* <Posts/> */}
        </div>
    )
}

