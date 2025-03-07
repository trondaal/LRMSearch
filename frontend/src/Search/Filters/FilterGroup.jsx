import React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { intersection } from 'lodash';
import Filter from './Filter.jsx';
import "./FilterGroup.css";

export default function FilterGroup(props) {

    // for open close collapsible
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (<div className={"filtergroup"}>
                <ListItemButton onClick={handleClick}>
                    <ListItemText primary={props.header} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" dense>
                        {props.filters.map((entry) => <Filter key={entry.key} entry={entry} checked={props.checked} handleToggle={props.handleToggle} getAvailable={props.getAvailable} category={props.category}/>
                        )}
                    </List>
                </Collapse>
            </div>
    );
}

