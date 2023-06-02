
import { MDBDropdown, MDBDropdownMenu, MDBCheckbox, MDBDropdownToggle, MDBDropdownItem, MDBBtn} from 'mdb-react-ui-kit';


export default function Filter({colors, addColor, removeColor, types, addType ,removeType}) {
    const colorsVar = ['primary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];
    const colorsLabels = ['Blue', 'Green', 'Red', 'Yellow', 'Cyan', 'White', 'Black'];

    function colorClicked(color) {
        if (colors.has(color)){
            removeColor(color);
        } else {
            addColor(color);
        }
    }

    function typeClicked(type) {
        if (types.has(type)){
            removeType(type);
        } else {
            addType(type);
        }
    }

    return (
        <MDBDropdown group>
            <MDBDropdownToggle color="link">Filter</MDBDropdownToggle>
            <MDBDropdownMenu className='p-4 text-muted' style={{ maxWidth: '200px' }}>
                <MDBCheckbox checked={types.has("note")} onChange={() => (typeClicked("note"))} label="Note" />
                <MDBCheckbox checked={types.has("todo")} onChange={() => (typeClicked("todo"))} label="To Do" />
                <MDBDropdownItem divider />
                {colorsVar.map((color, index) => (
                <MDBCheckbox key={index} checked={colors.has(color)} onChange={() => colorClicked(color)}  className={`custom-check-input ${color}`} color={color} label={colorsLabels[index]} />
                ))}
                <MDBBtn color="danger" size="sm" rounded className="mt-2 mx-auto"onClick={() => {colorsVar.map((color) => removeColor(color)); removeType("note"); removeType("todo")}}>Clear</MDBBtn>

            </MDBDropdownMenu>
        </MDBDropdown>
    )
}