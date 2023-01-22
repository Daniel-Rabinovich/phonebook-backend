
const Person = ({person, removeP}) => {

  const removePerson = () => removeP(person)

  return (
    <li>
      {person.name} {person.number}
      <button onClick={removePerson}>delete</button>
    </li>
  )
}

const Persons = ({persons, search, removeP}) => {

    // return only persons that include search string
    const handleDisplay = () => {

      if (search === '')
        return persons

      const s = search.toLowerCase()
      return persons.filter(p => {
        const pName = p.name.toLowerCase()
        if (pName.includes(s))
          return p
      })
    }

    return (
        <ul>
            {handleDisplay().map(p =>
                <Person
                  key={p.id.toString()}
                  person={p}
                  removeP={removeP}
                />
            )}
        </ul>
    )
}

export default Persons
