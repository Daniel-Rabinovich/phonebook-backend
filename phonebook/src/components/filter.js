const Filter = ({ change }) => {

    return (
        <div>
            <form>
                filter showen with:
                <input onChange={change} />
            </form>
        </div>
    )
}

export default Filter
