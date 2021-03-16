import React from 'react';

function PersonTypeList(props) {
    console.log(props.type)
    return <div className="Person__Type__List flex-row center">
        <PersonTypeBox />
        <PersonTypeBox />
        <PersonTypeBox />
        <PersonTypeBox />
    </div>
}

function PersonTypeBox() {
    return (
    <div className="Person__Type__Box flex-column flex center">
        <PersonType />
        <PersonNumber />
        <PersonChange />
    </div>
    )
}

function PersonType() {
    return <div className="Person__Type flex-row flex">
        확진자
    </div>
}

function PersonNumber() {
    return <div className="Person__Number flex-row flex">
        96380
    </div>
}

function PersonChange() {
    return <div className="Person__Change flex-row flex">
        363
    </div>
}



export default PersonTypeList;