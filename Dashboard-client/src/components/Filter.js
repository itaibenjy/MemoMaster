import { MDBDropdown, MDBDropdownMenu, MDBCheckbox, MDBDropdownToggle, MDBDropdownItem, MDBBtn} from 'mdb-react-ui-kit';

// The Filter component takes in props for colors and types, as well as functions to add or remove colors and types
export default function Filter({colors, addColor, removeColor, types, addType ,removeType}) {
    // An array of color names to be used in the checkboxes
    const colorsVar = ['primary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];
    // An array of color labels to be used in the checkboxes
    const colorsLabels = ['Blue', 'Green', 'Red', 'Yellow', 'Cyan', 'White', 'Black'];

    // Function to handle when a color checkbox is clicked
    function colorClicked(color) {
        if (colors.has(color)){
            removeColor(color);
        } else {
            addColor(color);
        }
    }

    // Function to handle when a type checkbox is clicked
    function typeClicked(type) {
        if (types.has(type)){
            removeType(type);
        } else {
            addType(type);
        }
    }

    // The Filter component returns a dropdown menu with checkboxes for colors and types, as well as a Clear button
    return (
        <MDBDropdown group>
            <MDBDropdownToggle color="link">Filter</MDBDropdownToggle>
            <MDBDropdownMenu className='p-4 text-muted' style={{ maxWidth: '200px' }}>
                {/* Checkbox for notes */}
                <MDBCheckbox checked={types.has("note")} onChange={() => (typeClicked("note"))} label="Note" />
                {/* Checkbox for to-dos */}
                <MDBCheckbox checked={types.has("todo")} onChange={() => (typeClicked("todo"))} label="To Do" />
                {/* Divider between types and colors */}
                <MDBDropdownItem divider />
                {/* Map over the colors array to create checkboxes for each color */}
                {colorsVar.map((color, index) => (
                <MDBCheckbox key={index} checked={colors.has(color)} onChange={() => colorClicked(color)}  className={`custom-check-input ${color}`} color={color} label={colorsLabels[index]} />
                ))}
                {/* Clear button to remove all filters */}
                <MDBBtn color="danger" size="sm" rounded className="mt-2 mx-auto"onClick={() => {colorsVar.map((color) => removeColor(color)); removeType("note"); removeType("todo")}}>Clear</MDBBtn>

            </MDBDropdownMenu>
        </MDBDropdown>
    )
}