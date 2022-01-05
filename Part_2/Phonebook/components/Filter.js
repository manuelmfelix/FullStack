
const Filter = ({filterNames,handlefilterNames}) => {

    return(
        <div>
        filter shown with: <input
        value={filterNames}
        onChange={handlefilterNames}
        />
      </div>
    )
}

export default Filter