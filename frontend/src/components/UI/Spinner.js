import { Fragment } from "react";
import classes from './Spinner.module.css';

const Spinner = props => {
    return (
        <Fragment>
            <div className={classes['lds-ring']}><div></div><div></div><div></div><div></div></div>
        </Fragment>
    );
}

export default Spinner;