import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

const Dropdown = ({options, value, changedValue}) => {
    return (
<FormGroup>
<Label for="select">Color</Label>
<Input type="select" name="select" id="select" value={value} onChange={changedValue}>
<option value="">None</option>{options.map(({ value, label }, index) => <option key={index} value={value} >{label}</option>)}
</Input>
</FormGroup>
    );
};

export default Dropdown;