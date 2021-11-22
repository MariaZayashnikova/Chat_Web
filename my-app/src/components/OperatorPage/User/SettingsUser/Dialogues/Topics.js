import React, { useState } from 'react'
import { Fade, ListGroup, ListGroupItem } from 'reactstrap'
import { connect } from 'react-redux'
import './SettingsUserDialogue.css'

function Topics({ topics, }) {
    const [fadeIn, setFadeIn] = useState(true)
    const [subtopics, setSubtopics] = useState(Object.values(topics)[0])
    const [currentIndex, setCurrentIndex] = useState(0)

    const toggle = (topic, i) => {
        if (i === currentIndex) {
            setFadeIn(false)
        } else {
            setFadeIn(true)
            setCurrentIndex(i)
            for (let elem in topics) {
                if (elem === topic) {
                    let newSubtopics = topics[elem]
                    setSubtopics(newSubtopics)
                }
            }
        }
    }

    const ViewTopics = () => {
        let arrTopics = Object.keys(topics)
        return arrTopics.map((elem, i) => {
            return (
                <ListGroup key={i}>
                    <ListGroupItem
                        active={i === currentIndex ? true : false}
                        tag="button"
                        action
                        onClick={() => toggle(elem, i)}
                    >
                        {elem}
                    </ListGroupItem>
                </ListGroup>
            )
        })
    }

    const ViewSubtopics = () => {
        return subtopics.map((elem, i) => {
            return (
                <div key={i}>
                    <Fade in={fadeIn} tag="div" className="mt-3">
                        {elem}
                    </Fade>
                </div>
            )
        })
    }

    return (
        <div className="settingsDialogue__block">
            <div>
                <h4>Список тем</h4>
                <div className="settingsDialogue__containerTopics">
                    <ViewTopics />
                </div>
            </div>
            <div>
                <h4>Список подтем</h4>
                <div className="settingsDialogue__containerTopics">
                    <ViewSubtopics />
                </div>
            </div>
        </div>

    )
}

const mapStateToProps = ({ topics }) => ({ topics })

export default connect(mapStateToProps)(Topics)
